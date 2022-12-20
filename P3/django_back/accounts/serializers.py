from django.contrib.auth.password_validation import validate_password
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
    password1 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    phone_num = serializers.IntegerField(required=True)

    class Meta:
        model = UserAccount
        fields = ['id', 'username', 'first_name', 'last_name', 'email',
                  'password1', 'password2', 'phone_num']

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
                                            #    avatar=validated_data['avatar']
                                               )
        user.set_password(validated_data['password1'])
        user.save()
        restaurants = Restaurants.objects.all()
        for r in restaurants:
            Following.objects.create(user=user, restaurant=r)
        return user


# fixed from phase2 idea from: https://medium.com/django-rest/django-rest-framework-change-password-and-update-profile-1db0c144c0a3
class UpdateUserSerializer(serializers.ModelSerializer):
    # password1 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    # password2 = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(required=True)
    id = serializers.ReadOnlyField()

    class Meta:
        model = UserAccount
        fields = ['id','username', 'first_name', 'last_name', 'email',
                  'avatar', 'phone_num']

        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            # 'password1': {'required': True},
            # 'password2': {'required': True},
            # 'email': {'required': True}
        }

    def validate(self, attrs):

        user = self.context['request'].user

        # # check pw length
        # if len(attrs['password1']) < 8:
        #     raise serializers.ValidationError({"password": "passwords should be 8 characters long"})

        # # pw needs to match
        # if attrs['password1'] != attrs['password2']:
        #     raise serializers.ValidationError({"password": "passwords doesn't match"})

        # email needs to be unique
        if UserAccount.objects.exclude(pk=user.pk).filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "This email is already in use."})

        # username needs to be unique
        if UserAccount.objects.exclude(pk=user.pk).filter(username=attrs['username']).exists():
            raise serializers.ValidationError({"username": "Txh"
                                                           "is username is already in use."})
        return attrs


    def update(self, instance, validated_data):
        user = self.context['request'].user

        if user.pk != instance.pk:
            raise serializers.ValidationError({"authorize": "You can only edit your profile."})

        instance.username = validated_data['username']
        instance.first_name = validated_data['first_name']
        instance.last_name = validated_data['last_name']
        instance.email = validated_data['email']
        if 'avatar' in validated_data:
            instance.avatar = validated_data['avatar']
        # instance.set_password(validated_data['password1'])
        instance.phone_num = validated_data['phone_num']

        instance.save()

        return instance
