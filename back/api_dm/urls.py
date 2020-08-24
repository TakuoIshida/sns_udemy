from django.urls import path, include
from rest_framework.routers import DefaultRouter
from ..api_dm import views

app_name = 'dm'

router = DefaultRouter()
# 同じシリアライザーMessageSerializerを参照しているため、basenameで識別させる
# →シリアライザーを分けるべき
router.register('message', views.MessageViewSet, basename="message")
router.register('inbox', views.InboxListView, basename="inbox")
urlpatterns = [
    path(''), include(router.urls)
]
