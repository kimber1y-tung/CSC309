# Create your views here.
import random

from django.http import HttpResponse
from rest_framework.generics import CreateAPIView, ListAPIView, \
    RetrieveAPIView, UpdateAPIView, get_object_or_404
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated

import accounts
from accounts.serializers import RegisterSerializer, \
    UserSerializer


# views a user with given id (only admin can do so)
class UserView(RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def get_object(self):
        return get_object_or_404(UserAccount, id=self.kwargs['id'])


# views all users (only admin can do that)
class UserViews(ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return UserAccount.objects.all()


# edit profile
class UpdateUserView(RetrieveAPIView, UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


# signup profile
class CreateUserView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


# logout -- not needed for this phase



