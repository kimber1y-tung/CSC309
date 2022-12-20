from django.db import models

# Create your models here.
import accounts.models


class Restaurants(models.Model):
    name = models.CharField(max_length=200, null=False)
    address = models.CharField(max_length=200, null=False)
    logo = models.CharField(max_length=200, null=False)
    postal_code = models.CharField(max_length=200, null=False)
    phone_num = models.CharField(max_length=200, null=False)
    owner = models.OneToOneField(accounts.models.UserAccount, on_delete=models.CASCADE, null=True)


class RestaurantMenus(models.Model):
    name = models.CharField(max_length=200, null=False)
    img = models.CharField(max_length=200, null=False)
    price = models.FloatField(null=False)
    restaurant = models.ForeignKey(to=Restaurants, on_delete=models.CASCADE, null=True)

