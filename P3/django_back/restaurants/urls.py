from django.contrib import admin
from django.urls import path

from restaurants.views import *

app_name = 'restaurants'

urlpatterns = [
    path('test/', RestaurantListAPI.as_view()),
    path('create_restaurants/',RestaurantsCreateAPI.as_view()),
    path('get_restaurants/<int:id>', RestaurantsGetAPI.as_view()),
    path('update_restaurants/', RestaurantUpdateAPI.as_view()),
    path('delete_restaurants/', RestaurantDeleteAPI.as_view()),
    path('get_restaurant_menu/<int:restaurant_id>', RestaurantMenusGetAPI.as_view()),
    path('create_restaurant_menu/', RestaurantMenusCreateAPI.as_view()),
    path('update_restaurant_menu/', RestaurantMenusUpdateAPI.as_view()),
    path('delete_restaurant_menu/',RestaurantMenusDeleteAPI.as_view()),
    path('fakedata', http_response),
    path('get_comments/<int:restaurant_id>', RestaurantMenusGetComments.as_view()),
    path('get_blogs/<int:restaurant_id>', RestaurantMenusGetBlogs.as_view()),
    path('get-user-rest/<int:id>', get_rest_from_user),
    path('get_followed/<int:restaurant_id>', RestaurantFollower),
    path('get_my_love/<int:id>', RestaurantsGetOwner.as_view()),
    path('get_my_restaurant', RestaurantsMy.as_view()),
    path('get_menu/<int:id>', RestaurantGetMenu.as_view()),
    path('search/<str:name>', RestaurantSearchAPI.as_view()),


]
