from django.contrib.auth.models import User, AbstractUser
from django.db import models

# Create your models here.
from django.db.models import SET_NULL


class UserAccount(AbstractUser):
    avatar = models.CharField(max_length=100, null=True)
    phone_num = models.CharField(max_length=20, null=False)

    def get_avatar(self):
        return self.avatar





