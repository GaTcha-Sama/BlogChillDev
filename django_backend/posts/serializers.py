from rest_framework import serializers
from .models import Post, Comment, Emoji
from django.db.models import Count
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_admin']

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
    comments = CommentSerializer(many=True, read_only=True)
    emoji_counts = serializers.SerializerMethodField()
    user_reactions = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'created_at', 'author', 'comments', 'emoji_counts', 'user_reactions']
    
    def get_emoji_counts(self, obj):
        emoji_counts = Emoji.objects.filter(post=obj).values('emoji_type').annotate(count=Count('emoji_type'))
        return EmojiCountSerializer(emoji_counts, many=True).data
    
    def get_user_reactions(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            user_emojis = Emoji.objects.filter(post=obj, user=request.user).values_list('emoji_type', flat=True)
            return list(user_emojis)
        return [] 