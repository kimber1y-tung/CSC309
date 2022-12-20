from django.db.models import QuerySet
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, get_object_or_404

# Create your views here.
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView

import social_network.models
from accounts.models import UserAccount
from restaurants.models import *
import copy
import random
from social_network.models import *
from rest_framework import serializers, permissions
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, RetrieveAPIView, DestroyAPIView, \
    RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated

import restaurants.models
from restaurants.serializers import RestaurantCreateSerializer, RestaurantListSerializer, RestaurantUpdateSerializer, \
    RestaurantDeleteSerializer, RestaurantMenuSerializer, RestaurantMenuUpdateSerializer, RestaurantMenuDeleteSerializer
from social_network.models import Following, Notification
from social_network.serializers import BlogSerializer, CommentSerializer


class CheckRestaurantNotExist(permissions.BasePermission):
    message = 'you already have one restaurant'

    def has_permission(self, request, view):
        all = restaurants.models.Restaurants.objects.filter(owner=request.user.id)
        return len(all) == 0


class CheckRestaurantExist(permissions.BasePermission):
    message = 'restaurant does not exist'

    def has_permission(self, request, view):
        all = restaurants.models.Restaurants.objects.filter(owner=request.user.id)
        return len(all) != 0


class CheckMenuUpdate(permissions.BasePermission):
    message = 'menu does not exist'

    def has_permission(self, request, view):
        # case one : has such menu

        restaurant = restaurants.models.Restaurants.objects.filter(owner=request.user.id)[0]
        all = restaurants.models.RestaurantMenus.objects.filter(name=request.data['name'], restaurant=restaurant.id)
        if len(all) == 0:
            return False
        # case two
        if 'new_name' in request.data.keys() and request.data['new_name'] != request.data['name']:
            all = restaurants.models.RestaurantMenus.objects.filter(name=request.data['new_name'],
                                                                    restaurant=restaurant.id)
            self.message = '[{}] is already exist'.format(request.data['new_name'])
            return len(all) == 0
        else:
            return True


class CheckMenuExist(permissions.BasePermission):
    message = 'menu does not exist'

    def has_permission(self, request, view):
        # case one : has such menu

        restaurant = restaurants.models.Restaurants.objects.filter(owner=request.user.id)[0]
        all = restaurants.models.RestaurantMenus.objects.filter(name=request.data['name'], restaurant=restaurant.id)
        return len(all) != 0


class CheckMenuNotExist(permissions.BasePermission):
    message = 'menu already exist'

    def has_permission(self, request, view):
        restaurant = restaurants.models.Restaurants.objects.filter(owner=request.user.id)[0]
        print(request.data)
        all = restaurants.models.RestaurantMenus.objects.filter(name=request.data['name'], restaurant=restaurant.id)
        return len(all) == 0


class RestaurantsGetAPI(RetrieveAPIView):
    serializer_class = RestaurantListSerializer

    # permission_classes = [IsAuthenticated]

    def get_object(self):
        all = restaurants.models.Restaurants.objects.all()
        target = None
        print(self.kwargs)
        for each in all:
            if each.id == self.kwargs['id']:
                target = each
                break
        return target


class RestaurantsCreateAPI(CreateAPIView):
    serializer_class = RestaurantCreateSerializer

    permission_classes = [IsAuthenticated, CheckRestaurantNotExist]

    def create(self, request, *args, **kwargs):
        print(request.data)
        request.data._mutable = True
        request.data['owner'] = self.request.user.id
        print(request.data)
        return super().create(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        print(self.request.user)
        return super().post(request, *args, **kwargs)


class RestaurantListAPI(ListAPIView):
    serializer_class = RestaurantListSerializer

    def get_queryset(self):
        return restaurants.models.Restaurants.objects.all()


class RestaurantUpdateAPI(UpdateAPIView):
    serializer_class = RestaurantUpdateSerializer

    permission_classes = [IsAuthenticated, CheckRestaurantExist]

    def get_object(self):
        print("here is the input")
        print(self.request.data)
        all = restaurants.models.Restaurants.objects.filter(owner=self.request.user.id)
        if len(all):
            print(all)
            return all[0]
        else:
            return None


class RestaurantDeleteAPI(DestroyAPIView):
    serializer_class = RestaurantDeleteSerializer

    permission_classes = [IsAuthenticated, CheckRestaurantExist]

    def get_object(self):
        all = restaurants.models.Restaurants.objects.filter(owner=self.request.user.id)
        if len(all):
            return all[0]
        else:
            return None


class RestaurantMenusGetAPI(ListAPIView):
    serializer_class = RestaurantMenuSerializer

    def get_queryset(self):
        return restaurants.models.RestaurantMenus.objects.filter(restaurant=self.kwargs['restaurant_id'])


class MyBlogSerializer(serializers.ModelSerializer):
    poster_name = serializers.CharField(source='poster.get_username')
    poster_avatar = serializers.CharField(source='poster.get_avatar')

    class Meta:
        model = social_network.models.RestaurantBlogs
        fields = ['date', 'title', 'content', 'likes_num', 'dislikes_num',
                  'poster', 'restaurant', 'poster_name', 'poster_avatar']


class MyCommentSerializer(serializers.ModelSerializer):
    poster_name = serializers.CharField(source='poster.get_username')
    poster_avatar = serializers.CharField(source='poster.get_avatar')

    class Meta:
        model = social_network.models.Comments
        fields = ['date', 'score', 'content', 'likes_num', 'dislikes_num', 'poster', 'restaurant', 'poster_name',
                  'poster_avatar']


class RestaurantMenusGetBlogs(ListAPIView):
    serializer_class = MyBlogSerializer

    def get_queryset(self):
        a = social_network.models.RestaurantBlogs.objects.filter(restaurant=self.kwargs['restaurant_id'])
        data = copy.deepcopy(a)
        return data


class RestaurantMenusGetComments(ListAPIView):
    serializer_class = MyCommentSerializer

    def get_queryset(self):
        a = social_network.models.Comments.objects.filter(restaurant=self.kwargs['restaurant_id'])
        data = copy.deepcopy(a)
        for each in data:
            each.date = str(each.date).split("T")[0].split(" ")[0]
        return data


class RestaurantMenusCreateAPI(CreateAPIView):
    serializer_class = RestaurantMenuSerializer

    permission_classes = [IsAuthenticated, CheckRestaurantExist, CheckMenuNotExist]

    def create(self, request, *args, **kwargs):
        restaurant = restaurants.models.Restaurants.objects.filter(owner=self.request.user.id)[0]
        request.data['restaurant'] = restaurant.id
        return super().create(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        print(self.request.user)
        return super().post(request, *args, **kwargs)


class RestaurantMenusUpdateAPI(UpdateAPIView):
    serializer_class = RestaurantMenuUpdateSerializer

    permission_classes = [IsAuthenticated, CheckRestaurantExist, CheckMenuUpdate]

    def get_object(self):
        restaurant = restaurants.models.Restaurants.objects.filter(owner=self.request.user.id)[0]
        menu = restaurants.models.RestaurantMenus.objects.get(name=self.request.data['name'], restaurant=restaurant.id)

        if 'new_name' in self.request.data.keys() and len(self.request.data['new_name']) != 0 and \
                self.request.data['new_name'] != self.request.data['name']:
            self.request.data._mutable = True
            self.request.data['name'] = self.request.data['new_name']
            lst = Following.objects.filter(restaurant=restaurant, follow_status=True)
            for r in lst:
                Notification.objects.create(from_user=self.request.user, to_user=r.user,
                                            message=restaurant.name + ' updated their menu.')
        return menu


class RestaurantMenusDeleteAPI(DestroyAPIView):
    serializer_class = RestaurantMenuDeleteSerializer

    def get_object(self):
        print(self.request.data)
        restaurant = restaurants.models.Restaurants.objects.filter(id=self.request.data['restaurant_id'])[0]
        menu = restaurants.models.RestaurantMenus.objects.get(name=self.request.data['name'], restaurant=restaurant.id)
        return menu


def http_response(request):
    accounts.models.UserAccount.objects.all().delete()
    foodName = open("accounts/src/food_list.txt").readlines()
    foodImg = open("accounts/src/food_image_url.txt").readlines()
    restaurantName = open("accounts/src/restaurant_name.txt").readlines()
    restaurantImg = open("accounts/src/restaurant_img.txt").readlines()
    restaurantCommentsRaw = open("accounts/src/restaurant_comment.txt").read().split("---flag---")
    restaurantComments = []
    for each in restaurantCommentsRaw:
        if len(each.strip()) > 10:
            restaurantComments.append(each.strip())
    profileUrl = open("accounts/src/profile_url.txt").readlines()
    profileName = open("accounts/src/profile_name.txt").readlines()
    users = get_user(profileName, profileUrl)
    restaurants = get_restaurants(restaurantName, restaurantImg, users)
    menus = get_restaurants_menu(restaurants, foodName, foodImg)
    blogs = get_restaurants_blog(restaurants, users, restaurantComments)
    comments = get_comments(restaurants, users, restaurantComments)
    print(users)
    print(restaurants)
    print(menus)
    print(blogs)
    print(comments)

    return HttpResponse("Fake data created !")


def get_user(usernames, profiles, num=50):
    # return a list of random user
    users = []
    username_list = []
    for i in range(num):
        username = usernames[random.randint(0, len(usernames) - 1)].replace("\n", "")
        if username in username_list:
            continue
        username_list.append(username)
        profile = profiles[random.randint(0, len(profiles) - 1)].replace("\n", "")
        phone_num = "({}){}-{}".format(random.randint(100, 999), random.randint(100, 999), random.randint(1000, 9999))
        password = "12345678"
        user = accounts.models.UserAccount.objects.create_user(username=username,
                                                               password=password,
                                                               phone_num=phone_num,
                                                               avatar=profile)
        users.append(user)
    return users


def get_restaurants(restaurant_names, restaurant_img, owners):
    # return a list of restaurants
    Restaurants.objects.all().delete()
    restaurants = []
    restaurant_list = []
    for owner in owners:
        name = restaurant_names[random.randint(0, len(restaurant_names) - 1)].replace("\n", "")
        if name in restaurant_list:
            continue
        restaurant_list.append(name)
        profile = restaurant_img[random.randint(0, len(restaurant_img) - 1)].replace("\n", "")
        phone_num = "({}){}-{}".format(random.randint(100, 999), random.randint(100, 999), random.randint(1000, 9999))
        address = "Somewhere in Canada"
        postal_code = random.randint(100000, 999999).__str__()
        a = Restaurants.objects.create(name=name,
                                       address=address,
                                       logo=profile,
                                       postal_code=postal_code,
                                       phone_num=phone_num,
                                       owner=owner)
        restaurants.append(a)
    return restaurants


def get_restaurants_menu(restaurants, food_name, food_img, num=20):
    # return a list of restaurants menu for all the restaurants
    RestaurantMenus.objects.all().delete()
    restaurants_menu = []
    for restaurant in restaurants:
        menu_name_list = []
        for i in range(num):
            name = food_name[random.randint(0, len(food_name) - 1)].replace("\n", "")
            if name in menu_name_list:
                continue
            menu_name_list.append(name)
            profile = food_img[random.randint(0, len(food_img) - 1)].replace("\n", "")
            price = random.randint(0, 100)
            a = RestaurantMenus.objects.create(name=name,
                                               img=profile,
                                               price=price,
                                               restaurant=restaurant)
            restaurants_menu.append(a)

    return restaurants_menu


def get_restaurants_blog(restaurants, authors, contents):
    RestaurantBlogs.objects.all().delete()

    restaurants_blog = []
    blog_num = 3
    feelings = ['awful', 'suck', 'great', 'wonderful', 'excellent']
    for restaurant in restaurants:
        for i in range(blog_num):
            author = authors[random.randint(0, len(authors) - 1)]
            content = contents[random.randint(0, len(contents) - 1)]
            feeling = feelings[random.randint(0, len(feelings) - 1)]
            title = "My {} experience in {}".format(feeling, restaurant.name)
            a = RestaurantBlogs.objects.create(title=title,
                                               content=content,
                                               poster=author,
                                               restaurant=restaurant)
            restaurants_blog.append(a)
    return restaurants_blog


def get_comments(restaurants, authors, contents):
    Comments.objects.all().delete()
    restaurant_comments = []
    comments_num = 10
    for restaurant in restaurants:
        for i in range(comments_num):
            author = authors[random.randint(0, len(authors) - 1)]
            content = contents[random.randint(0, len(contents) - 1)]
            score = random.randint(1, 5)
            a = Comments.objects.create(score=score,
                                        content=content,
                                        poster=author,
                                        restaurant=restaurant)
            restaurant_comments.append(a)
    return restaurant_comments


def get_rest_from_user(request, *args, **kwargs):
    rest = get_object_or_404(restaurants.models.Restaurants, owner_id=kwargs['id'])
    dict = {
        'id': rest.id,
        'name': rest.name,
        'address': rest.address,
        'logo': rest.logo,
        'postal_code': rest.postal_code,
        'phone_num': rest.phone_num,
        'owner': rest.owner.id
    }
    return JsonResponse(dict)


# extra

class MyFollowingSerializer(serializers.ModelSerializer):
    follower = serializers.IntegerField()

    class Meta:
        model = social_network.models.Following
        fields = ['follow_status', 'like_status', 'follower']


def index(request):
    print(request.headers)
    return JsonResponse({'text': 'Just rendering some JSON :)'})


def RestaurantFollower(request, restaurant_id):
    follower_num = len(social_network.models.Following.objects.filter(restaurant=restaurant_id, follow_status=True))
    like_num = len(social_network.models.Following.objects.filter(restaurant=restaurant_id, like_status=1))
    dislike_num = len(social_network.models.Following.objects.filter(restaurant=restaurant_id, like_status=2))
    data = {"follower": follower_num, "like_num": like_num, "dislike_num": dislike_num}
    return JsonResponse(data)


def get_my_restaurant(request):
    print(request.user)
    data = {"restaurant": request.user.id}
    return JsonResponse(data)


class RestaurantFollower2(TemplateView):
    def get(self, request, *args, **kwargs):
        print(request.user)
        return HttpResponse('result')


class MyRestaurantListSerializer(serializers.ModelSerializer):
    class Meta:
        model = restaurants.models.Restaurants
        fields = ['id']


class RestaurantsGetOwner(RetrieveAPIView):
    serializer_class = MyRestaurantListSerializer

    permission_classes = [IsAuthenticated]

    def get_object(self):
        print(self.request.user)
        target = restaurants.models.Restaurants.objects.first()
        a = copy.deepcopy(target)
        a.owner = self.request.user
        return a


# class MyRestaurantListSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = restaurants.models.Restaurants
#         fields = ['name', 'address', 'logo', 'postal_code', 'phone_num', 'owner', 'id']


class RestaurantsMy(RetrieveAPIView):
    serializer_class = MyRestaurantListSerializer

    # permission_classes = [IsAuthenticated]

    def get_object(self):
        all = restaurants.models.Restaurants.objects.all()
        target = None
        print(self.kwargs)
        for each in all:
            if each.owner == self.request.user:
                target = each
                break
        return target


class RestaurantGetMenu(RetrieveAPIView):
    serializer_class = RestaurantMenuSerializer

    def get_object(self):
        print(self.request.user)
        return restaurants.models.RestaurantMenus.objects.get(id=self.kwargs['id'])


def search_rest(request, *args, **kwargs):
    rest = get_object_or_404(restaurants.models.Restaurants, owner_id=kwargs['id'])
    dict = {
        'id': rest.id,
        'name': rest.name,
        'address': rest.address,
        'logo': rest.logo,
        'postal_code': rest.postal_code,
        'phone_num': rest.phone_num,
        'owner': rest.owner.id
    }
    return JsonResponse(dict)


@csrf_exempt
def SearchRequest(request):
    if request.method == 'POST':
        name = request.POST['name']
        restaurants_all = Restaurants.objects.all()
        ls = []
        for each in restaurants_all:
            if name in each.name:
                ls.append(each)
        return HttpResponse("nmsl")


class RestaurantSearchAPI(ListAPIView):
    serializer_class = RestaurantListSerializer

    def get_queryset(self):
        name = self.kwargs['name']
        name = name.replace("%20", "")
        restaurants_all = Restaurants.objects.filter(name__regex=name)
        print(restaurants_all)
        return restaurants_all
