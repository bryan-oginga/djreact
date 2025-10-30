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
        
        print(f"Login attempt - Email: {email}")  # Debug
        
        # Check if user exists
        try:
            user_exists = User.objects.filter(email=email).exists()
            print(f"User exists: {user_exists}")  # Debug
        except Exception as e:
            print(f"Error checking user: {e}")  # Debug
        
        # Authenticate
        user = authenticate(request=self.context.get('request'), email=email, password=password)
        
        print(f"Authentication result: {user}")  # Debug
        
        if user is None:
            # Try to get the user to check password manually
            try:
                db_user = User.objects.get(email=email)
                password_valid = db_user.check_password(password)
                print(f"Manual password check: {password_valid}")  # Debug
                print(f"User is_active: {db_user.is_active}")  # Debug
            except User.DoesNotExist:
                print("User does not exist in database")  # Debug
            
            raise serializers.ValidationError({
                "non_field_errors": ["Invalid email or password"]
            })
        
        if not user.is_active:
            raise serializers.ValidationError({
                "non_field_errors": ["User account is disabled"]
            })

        # Generate tokens
        refresh = RefreshToken.for_user(user)
        
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data
        }
