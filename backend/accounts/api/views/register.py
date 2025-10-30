from rest_framework import generics, status
from rest_framework.response import Response
from accounts.api.serializers.register import RegisterSerializer
from django.contrib.auth import get_user_model
from rest_framework import permissions

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


