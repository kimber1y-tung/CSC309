from rest_framework import serializers

import restaurants.models


class RestaurantCreateSerializer(serializers.ModelSerializer):
    # owner = serializers.ReadOnlyField()

    class Meta:
        model = restaurants.models.Restaurants
        fields = ['name', 'address', 'logo', 'postal_code', 'phone_num', 'owner']


class RestaurantListSerializer(serializers.ModelSerializer):
    class Meta:
        model = restaurants.models.Restaurants
        fields = ['name', 'address', 'logo', 'postal_code', 'phone_num', 'owner']


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
        fields = ['name', 'img', 'price', 'restaurant']


class RestaurantMenuUpdateSerializer(serializers.ModelSerializer):
    new_name = serializers.CharField(required=False)

    class Meta:
        model = restaurants.models.RestaurantMenus
        fields = ['name', 'img', 'price', 'new_name']


class RestaurantMenuDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = restaurants.models.RestaurantMenus
        fields = ['name']
