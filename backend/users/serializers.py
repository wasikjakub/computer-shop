from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "password", "email"]
        extra_kwargs = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        if "username" not in validated_data:
            validated_data["username"] = validated_data["email"]
        
        first_name = validated_data.pop("first_name", "")
        last_name = validated_data.pop("last_name", "")

        user = User.objects.create_user(**validated_data)

        user.first_name = first_name
        user.last_name = last_name
        user.save()

        return user
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        print(token)
        return token