from rest_framework import serializers
from accounts.models import UserAccount
from restaurants.models import Restaurants
from social_network.models import Following


class UserSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta():
        model = UserAccount
        fields = ['id', 'username', 'first_name', 'last_name', 'email',
                  'avatar', 'phone_num']


class RegisterSerializer(serializers.ModelSerializer):

    id = serializers.ReadOnlyField()
    username = serializers.CharField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    email = serializers.CharField(required=True)
    password1 = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)
    phone_num = serializers.IntegerField(required=True)

    class Meta:
        model = UserAccount
        fields = ['id', 'username', 'first_name', 'last_name', 'email',
                  'password1', 'password2', 'avatar', 'phone_num']

    def validate(self, attrs):
        # check pw length
        if len(attrs['password1']) < 8:
            raise serializers.ValidationError({"password": "passwords should be 8 characters long"})

        # pw needs to match
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError({"password": "passwords doesn't match"})

        # email needs to be unique
        if UserAccount.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "this email already has an account"})

        return attrs

    def create(self, validated_data):
        user = UserAccount.objects.create_user(username=validated_data['username'],
                                               first_name=validated_data['first_name'],
                                               last_name=validated_data['last_name'],
                                               email=validated_data['email'],
                                               phone_num=validated_data['phone_num'],
                                               avatar=validated_data['avatar'])
        user.set_password(validated_data['password1'])
        user.save()
        restaurants = Restaurants.objects.all()
        for r in restaurants:
            Following.objects.create(user=user, restaurant=r)
        return user


# class LoginSerializer(serializers.ModelSerializer):
#
#     username = serializers.CharField(required=True)
#     password = serializers.CharField(write_only=True, required=True)
#
#     class Meta:
#         model = UserAccount
#         fields = ['username', 'password']
#
#     def validate(self, attrs):
#
#         # username does not exist
#         # if not UserAccount.objects.filter(username=attrs['username']).exists():
#         #     raise serializers.ValidationError({"username": "this username does not exist"})
#         #
#         # # check pw
#         # user = UserAccount.objects.get(username=attrs['username'])
#         # if user.check_password(attrs['password']):
#         #     return attrs
#
#         user = authenticate(username=attrs['username'], paswword=attrs['password'])
#         if user:
#             return attrs
#         raise serializers.ValidationError({"password": "password incorrect",
#                                            "username": "username incorrect"})



