from django.contrib import admin

# Register your models here.


from accounts.models import *
from restaurants.models import *
from social_network.models import *

admin.site.register(UserAccount)

admin.site.register(Restaurants)

admin.site.register(RestaurantMenus)

admin.site.register(RestaurantBlogs)

admin.site.register(RestaurantBlogsImg)

admin.site.register(Comments)

admin.site.register(Reply)
