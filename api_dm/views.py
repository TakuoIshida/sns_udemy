from rest_framework import authentication, permissions
from ..api_dm import serializers
from ..core.models import Message
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response


class MessageViewSet(viewsets.ModelViewSet):

    queryset = Message.objects.all()
    serializer_class = serializers.MessageSrializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(sender=self.request.user)

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

    def destroy(self, request, *args, **kwargs):
        response = {'messages': 'Delete DM is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        response = {'messages': 'Update DM is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        response = {'messages': 'PATCH DM is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

# 練習もかねて、ReadOnlyの処理を書く
# direct messageのうち自分あてのもののみを受け取るクラス
class InboxListView(viewsets.ReadOnlyModelViewSet):

    queryset = Message.objects.all()
    serializer_class = serializers.MessageSrializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(reciever=self.request.user)

