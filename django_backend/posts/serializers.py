from rest_framework import serializers
from .models import Post, Comment, Emoji
from django.db.models import Count
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff']

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'content', 'created_at']
        read_only_fields = ['post', 'author']

class EmojiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Emoji
        fields = ['id', 'post', 'emoji_type', 'user']
        read_only_fields = ['user']

class EmojiCountSerializer(serializers.Serializer):
    emoji_type = serializers.CharField()
    count = serializers.IntegerField()

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    comments = serializers.SerializerMethodField()
    emoji_counts = serializers.SerializerMethodField()
    user_reactions = serializers.SerializerMethodField()
    total_comments = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'created_at', 'author', 'comments', 'emoji_counts', 'user_reactions', 'total_comments']
    
    def get_comments(self, obj):
        request = self.context.get('request')
        comments = obj.comments.all().order_by('-created_at')
        
        # Si on est sur la page d'accueil (liste), on limite à 10 commentaires
        if request and request.resolver_match and request.resolver_match.url_name == 'post-list':
            comments = comments[:10]
        return CommentSerializer(comments, many=True).data
    
    def get_total_comments(self, obj):
        return obj.comments.count()
    
    def get_emoji_counts(self, obj):
        emoji_counts = Emoji.objects.filter(post=obj).values('emoji_type').annotate(count=Count('emoji_type'))
        return EmojiCountSerializer(emoji_counts, many=True).data
    
    def get_user_reactions(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            user_emojis = Emoji.objects.filter(post=obj, user=request.user).values_list('emoji_type', flat=True)
            return list(user_emojis)
        return [] 