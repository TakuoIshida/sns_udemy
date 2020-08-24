from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from ..core.models import Profile, FriendRequest

class User(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = '__all__'
        extra_kwargs={'password': {'write_only': True}}

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

class ProfileSerializer(serializers.ModelSerializer):
    # user_pro = serializers.ReadOnlyField(source='user.username')
    created_on = serializers.DateTimeField(format="%Y-%m%d", read_only=True)
    class Meta:
        model=Profile
        fields = '__all__'
        extra_kwrgs = {'user_pro': {'read_only': True}}

class FriendRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = FriendRequest
        fields = ('id', 'ask_from', 'ask_to', 'approved')
        extra_kwargs = {'ask_from': {'read_only': True}}