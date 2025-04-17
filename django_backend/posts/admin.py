from django.contrib import admin
from .models import Post, Comment, Emoji

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at')
    list_filter = ('created_at', 'author')
    search_fields = ('title', 'content')
    date_hierarchy = 'created_at'

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('post', 'author', 'created_at')
    list_filter = ('created_at', 'author')
    search_fields = ('content',)
    date_hierarchy = 'created_at'

@admin.register(Emoji)
class EmojiAdmin(admin.ModelAdmin):
    list_display = ('post', 'emoji_type', 'user')
    list_filter = ('emoji_type', 'user')
    search_fields = ('post__title',) 