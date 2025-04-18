from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Les champs is_staff et is_superuser sont déjà inclus dans AbstractUser
    pass

    def __str__(self):
        return self.username 