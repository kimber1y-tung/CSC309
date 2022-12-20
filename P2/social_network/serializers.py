from rest_framework import serializers
import social_network.models

class BlogSerializer(serializers.ModelSerializer):
    class Meta():
        model = social_network.models.RestaurantBlogs
        fields = ['date', 'title', 'content', 'likes_num', 'dislikes_num',
                  'poster', 'restaurant']

class FollowingSerializer(serializers.ModelSerializer):
    class Meta():
        model = social_network.models.Following
        fields = ['follow_status', 'like_status', 'restaurant', 'user']

class CommentSerializer(serializers.ModelSerializer):
    class Meta():
        model = social_network.models.Comments
        fields = ['date', 'score', 'content', 'likes_num', 'dislikes_num', 'poster', 'restaurant']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta():
        model = social_network.models.Notification
        fields = ['from_user', 'to_user', 'time', 'target_url', 'message']