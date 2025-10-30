from django.urls import path
from accounts.api.views.login import  LoginView
from accounts.api.views.register import RegisterView
from accounts.api.views.profile import  ProfileView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),
]
