from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Bank(models.Model):
    name = models.CharField(name="name", max_length=200)
    swift_code = models.CharField(name="swift_code", max_length=200)
    inst_num = models.CharField(name="inst_num", max_length=200)
    description = models.CharField(name="description", max_length=200)

    owner = models.ForeignKey(to=User, on_delete=models.CASCADE)


class Branch(models.Model):
    name = models.CharField(name="name", max_length=200)
    address = models.CharField(name="address", max_length=200)
    transit_num = models.CharField(name="transit_num", max_length=200)
    email = models.CharField(name="email", max_length=200, default="admin@utoronto.ca")
    capacity = models.PositiveIntegerField(name="capacity")
    last_modified = models.DateTimeField(name="last_modified")

    bank = models.ForeignKey(to="Bank", on_delete=models.CASCADE)
