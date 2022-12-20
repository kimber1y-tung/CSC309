
from django.shortcuts import render

from rest_framework import serializers, permissions
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, \
    get_object_or_404, UpdateAPIView, DestroyAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from accounts.models import UserAccount
from restaurants.models import Restaurants
import social_network.models
from rest_framework.exceptions import PermissionDenied
from social_network.serializers import *

class OwnerPerm(permissions.BasePermission):
    def has_object_permission(self, request, restaurant):
        try:
            if restaurant != request.user.restaurants:
                raise PermissionDenied({"message":"You do not have permission: you are not a owner"})
            return True
        except:
                raise PermissionDenied({"message":"You do not have permission: you are not a owner"})
        

class GetBlogView(RetrieveAPIView):
    serializer_class = BlogSerializer
    
    def get_object(self):
        return get_object_or_404(social_network.models.RestaurantBlogs, id=self.kwargs['id'])

class CreateBlogView(CreateAPIView):
    # need to provide <content>, <title>, restaurant id <restaurant>

    serializer_class = BlogSerializer
    permission_classes = (IsAuthenticated, OwnerPerm)

    def post(self, request, *args, **kwargs):
        # check user is owner
        restaurant = get_object_or_404(Restaurants, id=request.data['restaurant'])
        if OwnerPerm.has_object_permission(self, request, restaurant):
            request.data._mutable = True
            request.data['poster'] = self.request.user.id
            request.data['restaurant'] = restaurant.id
            lst = social_network.models.Following.objects.filter(restaurant=restaurant, follow_status=True)
            for r in lst:
                social_network.models.Notification.objects.create(from_user=self.request.user, to_user=r.user, message=restaurant.name + ' made a new blog post.')
            return self.create(request, *args, **kwargs)
    def perform_create(self, serializer):
        blog = serializer.save()
        social_network.models.Rated.objects.create(blog=blog)
        

class DeleteBlogView(DestroyAPIView):
    # need to provide blog id <id>

    serializer_class = BlogSerializer
    permission_classes = (IsAuthenticated, OwnerPerm)
    def get_queryset(self):
        return social_network.models.RestaurantBlogs.objects.all()
    def get_object(self):
        return get_object_or_404(social_network.models.RestaurantBlogs, id=self.request.data['id'])
    def perform_destroy(self, request):
        blog = self.get_object()
        restaurant = blog.restaurant
        if OwnerPerm.has_object_permission(self, self.request, restaurant):
            blog.delete()

class FollowRestaurantView(RetrieveUpdateAPIView):

    serializer_class = FollowingSerializer
    permission_classes = (IsAuthenticated,)
    def get_object(self):
        restaurant = get_object_or_404(social_network.models.Restaurants, id=self.request.data['restaurant'])
        self.request.data._mutable = True
        self.request.data['user'] = self.request.user.id
        record = social_network.models.Following.objects.get(user=self.request.user.id, restaurant=restaurant.id)
        if record.follow_status:
            PermissionDenied({"message":"You already followed this restaurant"})
        social_network.models.Notification.objects.create(from_user=self.request.user, to_user=restaurant.owner, message=self.request.user.username + ' started to follow your restaurant.')
        return record
    def perform_update(self, serializer):
        serializer.validated_data['follow_status'] = True
        serializer.save()

class UnfollowRestaurantView(RetrieveUpdateAPIView):

    serializer_class = FollowingSerializer
    permission_classes = (IsAuthenticated,)
    def get_object(self):
        restaurant = get_object_or_404(social_network.models.Restaurants, id=self.request.data['restaurant'])
        self.request.data._mutable = True
        self.request.data['user'] = self.request.user.id
        record = social_network.models.Following.objects.get(user=self.request.user.id, restaurant=restaurant.id)
        if not record.follow_status:
            PermissionDenied({"message":"You already unfollowed this restaurant"})
        return record
    def perform_update(self, serializer):
        serializer.validated_data['follow_status'] = False
        serializer.save()

class LikeRestaurantView(RetrieveUpdateAPIView):

    serializer_class = FollowingSerializer
    permission_classes = (IsAuthenticated,)
    def get_object(self):
        restaurant = get_object_or_404(social_network.models.Restaurants, id=self.request.data['restaurant'])
        self.request.data._mutable = True
        self.request.data['user'] = self.request.user.id
        record = social_network.models.Following.objects.get(user=self.request.user.id, restaurant=restaurant.id)
        if record.like_status:
            PermissionDenied({"message":"You already liked the restaurant"})
        social_network.models.Notification.objects.create(from_user=self.request.user, to_user=restaurant.owner, message=self.request.user.username + ' liked your restaurant.')
        return record
    def perform_update(self, serializer):
        serializer.validated_data['like_status'] = True
        serializer.save()

class UnlikeRestaurantView(RetrieveUpdateAPIView):

    serializer_class = FollowingSerializer
    permission_classes = (IsAuthenticated,)
    def get_object(self):
        restaurant = get_object_or_404(social_network.models.Restaurants, id=self.request.data['restaurant'])
        self.request.data._mutable = True
        self.request.data['user'] = self.request.user.id
        record = social_network.models.Following.objects.get(user=self.request.user.id, restaurant=restaurant.id)
        if not record.like_status:
            PermissionDenied({"message":"You already disliked the restaurant"})
        return record
    def perform_update(self, serializer):
        serializer.validated_data['like_status'] = False
        serializer.save()

class LikeBlogView(RetrieveUpdateAPIView):
    # need to provide blog id <id>
    serializer_class = BlogSerializer
    permission_classes = (IsAuthenticated,)
    def get_object(self):
        self.request.data._mutable = True
        blog = get_object_or_404(social_network.models.RestaurantBlogs, id=self.request.data['id'])
        self.request.data['title'] = blog.title
        self.request.data['content'] = blog.content
        self.request.data['likes_num'] = blog.likes_num
        if self.request.user in social_network.models.Rated.objects.get(blog=blog.id).users.all():
            raise PermissionDenied({"message":"You already rated"})
        social_network.models.Rated.objects.get(blog=blog.id).users.add(self.request.user)
        social_network.models.Notification.objects.create(from_user=self.request.user, to_user=blog.poster, message=self.request.user.username + ' liked your blog \"'+ blog.title +'\"')
        return blog
    def perform_update(self, serializer):
        serializer.validated_data['likes_num'] += 1
        serializer.save()

class UnlikeBlogView(RetrieveUpdateAPIView):
    # need to provide blog id <id>
    serializer_class = BlogSerializer
    permission_classes = (IsAuthenticated,)
    def get_object(self):
        self.request.data._mutable = True
        blog = get_object_or_404(social_network.models.RestaurantBlogs, id=self.request.data['id'])
        self.request.data['title'] = blog.title
        self.request.data['content'] = blog.content
        self.request.data['dislikes_num'] = blog.dislikes_num
        if self.request.user in social_network.models.Rated.objects.get(blog=blog.id).users.all():
            raise PermissionDenied({"message":"You already rated"})
        social_network.models.Rated.objects.get(blog=blog.id).users.add(self.request.user)
        return blog
    def perform_update(self, serializer):
        serializer.validated_data['dislikes_num'] += 1
        serializer.save()
    
class GetFeedView(ListAPIView):
    # page number pagination is used. url should contain query string ...?page=n where n is int representing current page
    serializer_class = BlogSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        following = social_network.models.Following.objects.filter(user=self.request.user.id, follow_status=True)
        restaurants = []
        for item in following:
            restaurants.append(item.restaurant)
        allblogs = social_network.models.RestaurantBlogs.objects.filter(restaurant__in=restaurants).order_by('-date')
        return allblogs

class CreateCommentView(CreateAPIView):
    # need to provide restaurant id <restaurant> in addition to all required fields of a comment
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        
        restaurant = get_object_or_404(Restaurants, id=request.data['restaurant'])
        
        request.data._mutable = True
        request.data['poster'] = self.request.user.id
        request.data['restaurant'] = restaurant.id
        social_network.models.Notification.objects.create(from_user=self.request.user, to_user=restaurant.owner, message=self.request.user.username + ' posted a comment.')
        return self.create(request, *args, **kwargs)
