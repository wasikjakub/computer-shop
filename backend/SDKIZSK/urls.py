"""
URL configuration for SDKIZSK project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from products.views import CategoryViewSet
from users.views import CreateUserView, CustomTokenObtainPairView
from products.views import get_products, get_producers, get_product
from rest_framework_simplejwt.views import TokenRefreshView
from baskets.views import BasketViewSet, CreateOrderView, OrderViewSet
from helpdesk.views import TechnicalSupportViewSet, ContactFormViewSet

router = routers.DefaultRouter()
# router.register(r'products', ProductViewSet, basename='product')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'basket', BasketViewSet, basename='basket')
router.register(r'technical-support', TechnicalSupportViewSet, basename='technical-support')
router.register(r'contact-form', ContactFormViewSet, basename='contact-form')
router.register(r'orders', OrderViewSet, basename='orders')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/user/register/', CreateUserView.as_view(), name='register'),
    path('api/user/token/', CustomTokenObtainPairView.as_view(), name='get_token'),
    path('api/user/token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('user-auth/', include('rest_framework.urls')),
    path('api/producers/', get_producers, name='get_producers'),
    path('api/products/', get_products, name='get_products'),
    path('api/products/<int:id>/', get_product, name='product-detail'),
    path('api/create-order/', CreateOrderView.as_view(), name='create-order')
]
