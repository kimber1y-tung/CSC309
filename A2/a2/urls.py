"""a2 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.auth.views import LogoutView
from django.urls import path
from banks.views import add_bank_pg, add_branch_pg
import accounts.views
import banks


urlpatterns = [
    path('admin/', admin.site.urls),

    path('accounts/register/', accounts.views.register_pg),
    path('accounts/login/', accounts.views.login_pg),
    # path('accounts/logout/', accounts.views.logout_pg),
    path("accounts/logout/", LogoutView.as_view(), name="logout"),

    path('accounts/profile/view/', accounts.views.profile_pg),
    path('accounts/profile/edit/', accounts.views.edit_pg),

    path('banks/add/', add_bank_pg.as_view()),
    path('banks/<bank_id>/branches/add/', add_branch_pg.as_view()),

    path('banks/branch/<branch_id>/details/', banks.views.branch_det, name="branch_det"),
    path('banks/<bank_id>/branches/all/', banks.views.all_branch),

    path('banks/all/', banks.views.all_bank.as_view()),
    path('banks/<bank_id>/details/', banks.views.bank_det.as_view(), name="bank_det"),

    path('banks/branch/<branch_id>/edit/', banks.views.edit_branch.as_view()),
]
