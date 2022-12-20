# Create your views here.
import random

from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from rest_framework.generics import CreateAPIView, ListAPIView, \
    RetrieveAPIView, UpdateAPIView, get_object_or_404
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated

from accounts.models import UserAccount
from accounts.serializers import RegisterSerializer, \
    UpdateUserSerializer, UserSerializer
from social_network.models import Following
from restaurants.models import Restaurants


# views a user with given id (only admin can do so)
class UserView(RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = []

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
    serializer_class = UpdateUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)



# signup profile
class CreateUserView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

# auth profile
class AuthUserView(RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        return self.request.user

def relate(request):
    users = UserAccount.objects.all()
    rests = Restaurants.objects.all()
    for user in users:
        for r in rests:
            Following.objects.update_or_create(user=user, restaurant=r)
    return HttpResponse('done')
        
# logout -- not needed for this phase



