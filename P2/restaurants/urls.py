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
    path('fakedata', http_response)
]
