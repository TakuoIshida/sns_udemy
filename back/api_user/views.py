from rest_framework import generics, authentication, permissions
from ..api_user import serializers
from ..core.models import Profile, FriendRequest
from django.db.models import Q
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework import status
from rest_framework.response import Response
from ..core import custompermissions
# from rest_framework.decorators import api_view
# TODO import ↓内容を復習

class CreateUserView(generics.CreateAPIView):
    serializer_class = serializers.UserSerializer
# SOLID原則に従い、リクエストメソッドに応じて書き分けれる（単一責任）
# @api_view(['GET'])
# @api_view(['POST'])
# def friendrequest(request, format=None)
class FriendRequestViewSet(viewsets.ModelViewSet):
    queryset = FriendRequest.objects.all()
    serializer_class = serializers.FriendRequestSerializer
    authentication = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(Q(ask_to=self.request.user) | Q(ask_from=self.queryset.user))

    def perform_create(self, serializer):
        try:
            serializer.save(ask_from=self.request.user)
        except:
            raise ValidationError('User can have only unique request')

    def destroy(self, request, *args, **kwwargs):
        response = {'message': 'Delete is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwwargs):
        response = {'message': 'Patch is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    authentication = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated, custompermissions.ProfilePermission)

    # 新規ユーザー登録時に、プロフィール情報をuserから割り当てなくて済むようになる
    def perform_create(self, serializer):
        serializer.save(user_pro=self.request.user)

class MyProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated)

    def get_queryset(self):
        return self.queryset.filter(user_pro=self.request.user)