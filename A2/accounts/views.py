import json

from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect, render
from accounts.forms import EditForm, LoginForm, RegisterForm
import re
from django.contrib.auth import authenticate, login, logout, get_user


# Create your views here.

def register_pg(request):
    if request.method == "GET":
        form = RegisterForm()
        return render(request, 'register.html', {'form': form})

    # print(request.POST)

    # request.method == 'POST'
    username = request.POST.get('username')
    password1 = request.POST.get('password1')
    password2 = request.POST.get('password2')
    email = request.POST.get('email')
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')

    # check if all the fields are filled out
    if username and password1 and password2 and email and first_name and last_name:

        # check if username is unique
        if not User.objects.filter(username=username).exists():

            # check if passwords align
            if password1 == password2:

                # check length of pw
                if len(password1) >= 8:

                    # check the form of the email
                    email_regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
                    if re.fullmatch(email_regex, email):

                        # add user
                        User.objects.create_user(username=username, email=email,
                                                 password=password1,
                                                 last_name=last_name,
                                                 first_name=first_name)
                        # print(request.POST)
                        return redirect('/accounts/login/')
                    else:
                        form = RegisterForm(data=request.POST)
                        form.add_error(None, "Enter a valid email address")
                        # print("wrong email")
                else:
                    form = RegisterForm(data=request.POST)
                    form.add_error(None, "This password is too short. It must contain at least 8 characters")
            else:
                form = RegisterForm(data=request.POST)
                form.add_error(None, "The two password fields didn't match")
        else:
            form = RegisterForm(data=request.POST)
            form.add_error(None, "This Username is already taken")
    else:
        form = RegisterForm(data=request.POST)
        form.add_error(None, "This field is required.")

    # print("wrong!!!")
    return render(request, 'register.html', {'form': form})


def login_pg(request):
    if request.method == "GET":
        form = LoginForm()
        # print("went through here")
        return render(request, 'login.html', {'form': form})

    user = authenticate(username=request.POST.get('username'),
                        password=request.POST.get('password'))
    # form = LoginForm(request.POST)
    # username = request.POST.get('username')
    # password1 = request.POST.get('password1')

    if user:
        login(request, user)
        return redirect('/accounts/profile/view/')

    form = LoginForm(data=request.POST)
    return render(request, 'login.html', {'form': form})


# def logout_pg(request):
#     logout(request)
#     return redirect('/accounts/login/')


def profile_pg(request):

    user = get_user(request)

    # if user is valid
    if user.id:
        data = {"id": user.id, "username": user.username, "email": user.email,
                "first_name": user.first_name, "last_name": user.last_name}
        return HttpResponse(json.dumps(data))

    return HttpResponse('UNAUTHORIZED', status=401)


def edit_pg(request):
    if request.method == "GET":
        user = get_user(request)

        if not user.id:
            return HttpResponse('UNAUTHORIZED', status=401)
        form = EditForm(instance=user)
        return render(request, 'edit.html', {'form': form})


    # POST
    password1 = request.POST.get('password1')
    password2 = request.POST.get('password2')
    email = request.POST.get('email')
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')

    user = get_user(request)

    # check password
    if password1 == password2:
        if len(password1) >= 8:
            # check email
            email_regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
            if re.fullmatch(email_regex, email):
                user.first_name = first_name
                user.last_name = last_name
                user.email = email
                user.set_password(password1)
                user.save()
                return redirect("/accounts/profile/view/")
            else:
                form = EditForm(data=request.POST)
                form.add_error("email", "Enter a valid email address")
        else:
            form = EditForm(data=request.POST)
            form.add_error("email", "This password is too short. It must contain at least 8 characters")
    else:
        form = EditForm(data=request.POST)
        form.add_error("email", "The two password fields didn't match")

    # failed
    return render(request, 'edit.html', {'form': form})
