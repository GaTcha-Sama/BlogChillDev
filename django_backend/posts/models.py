from django.db import models
from django.conf import settings
from .text_correction import TextCorrectionService

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.pk:  
            correction_service = TextCorrectionService()
            self.content = correction_service.correct_text(self.content)
        super().save(*args, **kwargs)

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Comment by {self.author.username} on {self.post.title}"

class Emoji(models.Model):
    EMOJI_CHOICES = [
        ('like', '👍'),
        ('love', '❤️'),
        ('laugh', '😂'),
        ('wow', '😮'),
        ('sad', '😢'),
        ('angry', '😡'),
    ]
    
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='emojis')
    emoji_type = models.CharField(max_length=10, choices=EMOJI_CHOICES)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ('post', 'user', 'emoji_type')
    
    def __str__(self):
        return f"{self.user.username} reacted with {self.get_emoji_type_display()} on {self.post.title}" 