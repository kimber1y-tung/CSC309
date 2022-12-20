from django import forms
from django.contrib.auth.models import User


class RegisterForm(forms.Form):
    # model = User

    # fields = ["username", "password1", "password2", "email",
    #           "first_name", "last_name"]

    # widgets = {"username": forms.TextInput,
    #            "password1": forms.TextInput,
    #            "password2": forms.TextInput,
    #            "email": forms.TextInput,
    #            "first_name": forms.TextInput,
    #            "last_name": forms.TextInput,}

    username = forms.CharField(widget=forms.TextInput)
    password1 = forms.CharField(widget=forms.PasswordInput)
    password2 = forms.CharField(widget=forms.PasswordInput)
    email = forms.CharField(widget=forms.EmailInput)
    first_name = forms.CharField(widget=forms.TextInput)
    last_name = forms.CharField(widget=forms.TextInput)


class LoginForm(forms.ModelForm):

    class Meta:
        model = User
        fields = ["username", "password"]

        widgets = {"username": forms.TextInput,
                   "password": forms.PasswordInput}


class EditForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "email"]

        widgets = {"first_name": forms.TextInput,
                   "last_name": forms.TextInput,
                   "email": forms.EmailInput,
                   }
