from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from posts.views import PostViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.views.generic import RedirectView

router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    # Redirection de la racine vers l'API
    path('', RedirectView.as_view(url='/api/', permanent=False)),
    
    # Administration Django
    path('admin/', admin.site.urls),
    
    # API endpoints
    path('api/', include(router.urls)),
    path('api/users/', include('users.urls')),
    
    # Authentification
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-auth/', include('rest_framework.urls')),
] 