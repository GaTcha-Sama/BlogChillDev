from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import Post, Comment, Emoji
from .serializers import PostSerializer, CommentSerializer, EmojiSerializer
from django.db import models
from .text_correction import TextCorrectionService

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.is_staff

class PostPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 10

class CommentPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = PostPagination
    text_correction_service = TextCorrectionService()
    
    def get_queryset(self):
        queryset = Post.objects.all()
        comment_page = self.request.query_params.get('comment_page', 1)
        
        try:
            comment_page = int(comment_page)
        except (TypeError, ValueError):
            comment_page = 1

        return queryset.prefetch_related(
            models.Prefetch(
                'comments',
                queryset=Comment.objects.order_by('-created_at')[:10],
                to_attr='prefetched_comments'
            )
        )
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def add_comment(self, request, pk=None):
        post = self.get_object()
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(post=post, author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['get'])
    def comments(self, request, pk=None):
        post = self.get_object()
        paginator = CommentPagination()
        comments = Comment.objects.filter(post=post).order_by('-created_at')
        result_page = paginator.paginate_queryset(comments, request)
        serializer = CommentSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    
    @action(detail=True, methods=['post', 'delete'], permission_classes=[permissions.IsAuthenticated])
    def toggle_emoji(self, request, pk=None):
        post = self.get_object()
        emoji_type = request.data.get('emoji_type')
        
        if not emoji_type:
            return Response({"error": "emoji_type is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        existing_emoji = Emoji.objects.filter(post=post, user=request.user, emoji_type=emoji_type).first()
        
        if request.method == 'DELETE' or existing_emoji:
            if existing_emoji:
                existing_emoji.delete()
                post_serializer = PostSerializer(post, context={'request': request})
                return Response(post_serializer.data, status=status.HTTP_200_OK)
            return Response({"error": "Emoji not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = EmojiSerializer(data={'emoji_type': emoji_type, 'post': post.id})
        if serializer.is_valid():
            serializer.save(user=request.user, post=post)
            post_serializer = PostSerializer(post, context={'request': request})
            return Response(post_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 