from sns_udemy.api_user.views import CreateUserView
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from ..api_user import views
app_name = 'user'

# routerにURLを登録する
router = DefaultRouter()
router.register('profile', views.ProfileViewSet)
router.register('approval', views.FriendRequestViewSet)

urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name='create'),
    path('myprofile/', views.MyProfileListView.as_view(), name='myprofile'),
    path(''), include(router.urls)
]
