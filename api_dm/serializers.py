from rest_framework import serializers
from core.models import Message, User, Profile, FriendRequest
from django.db.models import Q


class FriendsFileter(serializers.PrimaryKeyRelatedField):

    def get_queryset(self):
        print(self.context)
        request = self.context['request']
        friends = FriendRequest.objects.filter(ask_to=request.user, approved=True)

        list_friend = []
        for friend in friends:
            list_friend.append(friend.ask_from.id)

        query = User.objects.filter(id__in=list_friend)
        return query


class MessageSrializer(serializers.ModelSerializer):

    reciever = FriendFilter()
    class Meta:
        model = Message
        fields = ('id', 'sender', 'reciever', 'message')
        extra_kwargs = {'sender': {'read_only': True}}