from rest_framework import serializers
from rest_framework.fields import CharField, FloatField

import restaurants.models
from social_network.models import Following
from restaurants.models import Restaurants


class RestaurantCreateSerializer(serializers.ModelSerializer):
    # owner = serializers.ReadOnlyField()

    class Meta:
        model = restaurants.models.Restaurants
        fields = ['name', 'address','logo','postal_code', 'phone_num', 'owner']


class RestaurantListSerializer(serializers.ModelSerializer):
    class Meta:
        model = restaurants.models.Restaurants
        fields = ['name', 'address', 'logo', 'postal_code', 'phone_num', 'owner','id']


class RestaurantUpdateSerializer(serializers.ModelSerializer):
    # owner = serializers.ReadOnlyField()

    class Meta:
        model = restaurants.models.Restaurants
        fields = ['name', 'address', 'logo', 'postal_code', 'phone_num']


class RestaurantDeleteSerializer(serializers.ModelSerializer):
    # owner = serializers.ReadOnlyField()

    class Meta:
        model = restaurants.models.Restaurants
        fields = ['name', 'address', 'logo', 'postal_code', 'phone_num', 'owner']


class RestaurantMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = restaurants.models.RestaurantMenus
        fields = ['name', 'img', 'price', 'restaurant','id']


class RestaurantMenuUpdateSerializer(serializers.ModelSerializer):
    new_name = serializers.CharField(required=False)

    class Meta:
        model = restaurants.models.RestaurantMenus
        fields = ['name', 'img', 'price', 'new_name']


class RestaurantMenuDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = restaurants.models.RestaurantMenus
        fields = ['name', 'restaurant_id']
