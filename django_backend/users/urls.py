from django.urls import path
from .views import UserCreateView, UserDetailView, UserRetrieveView

urlpatterns = [
    path('', UserCreateView.as_view(), name='user-create'),
    path('me/', UserDetailView.as_view(), name='user-detail'),
    path('<int:pk>/', UserRetrieveView.as_view(), name='user-retrieve'),
] 