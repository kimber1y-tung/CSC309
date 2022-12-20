from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView

from accounts.views import CreateUserView, \
    UpdateUserView, \
    UserViews, UserView

app_name = 'accounts'

urlpatterns = [
    path('users/', UserViews.as_view(), name='users'),
    path('user/<int:id>/', UserView.as_view(), name='user'),
    path('user/edit/', UpdateUserView.as_view(), name='edit'),
    path('user/signup/', CreateUserView.as_view(), name='signup'),
    path('user/login/', TokenObtainPairView.as_view(), name='login'),
    # path('user/logout/', Logout.as_view(), name='logout'),
]
