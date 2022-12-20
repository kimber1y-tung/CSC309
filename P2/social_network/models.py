from accounts.models import *
from restaurants.models import *
from django.core.validators import MaxValueValidator


class RestaurantBlogs(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=50, null=False)
    content = models.CharField(max_length=5000, null=False)
    likes_num = models.IntegerField(default=0)
    dislikes_num = models.IntegerField(default=0)
    poster = models.ForeignKey(to=UserAccount, on_delete=models.CASCADE, null=True)
    restaurant = models.ForeignKey(to=Restaurants, on_delete=models.CASCADE, null=True)


class RestaurantBlogsImg(models.Model):
    img = models.CharField(max_length=50, null=False)
    blog = models.ForeignKey(to=RestaurantBlogs, on_delete=models.CASCADE, null=True)


class Comments(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    score = models.IntegerField(validators=[MaxValueValidator(5)])
    content = models.CharField(max_length=5000, null=False)
    likes_num = models.IntegerField(default=0)
    dislikes_num = models.IntegerField(default=0)
    poster = models.ForeignKey(to=UserAccount, on_delete=models.CASCADE, null=True)
    restaurant = models.ForeignKey(to=Restaurants, on_delete=models.CASCADE, null=True)


class Reply(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    poster = models.ForeignKey(to=UserAccount, on_delete=models.CASCADE)
    comment = models.ForeignKey(to=Comments, on_delete=models.CASCADE)


class Notification(models.Model):
    from_user = models.ForeignKey(to=UserAccount, on_delete=models.CASCADE, related_name="from_user")
    to_user = models.ForeignKey(to=UserAccount, on_delete=models.CASCADE, related_name="to_user")
    time = models.DateTimeField(auto_now_add=True)
    target_url = models.URLField(null=True)
    message = models.CharField(max_length=100)


class Following(models.Model):
    follow_status = models.BooleanField(default=False)
    like_status = models.BooleanField(default=False)
    user = models.ForeignKey(to=UserAccount, on_delete=models.CASCADE)
    restaurant = models.ForeignKey(to=Restaurants, on_delete=models.CASCADE)


class Rated(models.Model):
    blog = models.ForeignKey(to=RestaurantBlogs, on_delete=models.CASCADE)
    users = models.ManyToManyField(to=UserAccount, related_name="rated_users", blank=True)
