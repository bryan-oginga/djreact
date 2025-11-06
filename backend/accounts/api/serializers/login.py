from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.api.serializers.profile import UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    def validate(self, data):
        email = data.get('email', '').strip().lower()
        password = data.get('password')
        
        try:
            user_exists = User.objects.filter(email=email).exists()
            print(f"User exists: {user_exists}")  
        except Exception as e:
            print(f"Error checking user: {e}") 
        
        user = authenticate(request=self.context.get('request'), email=email, password=password)

        refresh = RefreshToken.for_user(user)
        
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data
        }
