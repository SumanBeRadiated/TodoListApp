from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from rest_framework_simplejwt.views import TokenBlacklistView

from . import views


urlpatterns = [
    path('lists/', views.getToDoList),
   
    path('category/', views.getCategory),
    path('',views.home),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/signup/', views.signupUser, name='signup_user'),
    path('user/profile/', views.get_profile, name='user_profile'),
    path('token/blacklist/', views.logout_user, name='token_blacklist'),
]