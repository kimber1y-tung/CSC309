from django.contrib import admin
from django.urls import path
from social_network.views import *

app_name = 'social_network'

urlpatterns = [
    path('create_blog/', CreateBlogView.as_view()),
    path('get_blog/<int:id>', GetBlogView.as_view()),
    path('delete_blog/', DeleteBlogView.as_view()),
    path('follow/', FollowRestaurantView.as_view()),
    path('unfollow/', UnfollowRestaurantView.as_view()),
    path('like_restaurant/', LikeRestaurantView.as_view()),
    path('unlike_restaurant/', UnlikeRestaurantView.as_view()),
    path('like_blog/', LikeBlogView.as_view()),
    path('unlike_blog/', UnlikeBlogView.as_view()),
    path('getfeed/', GetFeedView.as_view()),
    path('create_comment/', CreateCommentView.as_view()),

    path('like_comment/', LikeRestaurantView.as_view()),
    path('unlike_comment/', UnlikeRestaurantView.as_view()),

    path('all_blogs/', GetAllBlogs.as_view()),


]
