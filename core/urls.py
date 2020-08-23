from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken import views
from django.conf import settings
from django.conf.urls.static import static
# from rest_framework.urlpatterns import format_suffix_patterns
urlpatterns = [
    path('admin/', admin.site.urls),
    path('authen/', views.obtain_auth_token),
    path('api/user/', include('api_user,urls')),
    # path('api/user/<int:pk>', include('api_user.detail,urls')),
    path('api/dm', include('api_dm,urls')),
]
# urlpatterns = format_suffix_patterns(urlpatterns)
urlpatterns += static(settings.MEDIA_URL, document=settings.MEDIA_ROOT)