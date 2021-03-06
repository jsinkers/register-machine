from django import forms
from django.contrib.auth.forms import UserCreationForm
from backend.register_machine.models import User


class UserSignUpForm(UserCreationForm):
    email = forms.EmailField(max_length=100, help_text='Required')

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')
