from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import ProductSerializer, CategorySerializer
from .models import Product, Category

from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Q

# Create your views here.
# class ProductViewSet(viewsets.ModelViewSet):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
#     permission_classes = [AllowAny]
    
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

class ProductPagination(PageNumberPagination):
    page_size = 10  # Liczba produktów na stronę
    page_size_query_param = 'page_size'
    max_page_size = 100

@api_view(['GET'])
@permission_classes([AllowAny])
def get_product(request, id): 
    try:
        product = Product.objects.get(id=id)
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=200)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)


@api_view(['GET'])
@permission_classes([AllowAny])  # Umożliwienie dostępu bez logowania
def get_products(request):
    category_id = request.query_params.get('category', None)  # ID kategorii
    min_price = request.query_params.get('min_price', None)  # Minimalna cena
    max_price = request.query_params.get('max_price', None)  # Maksymalna cena
    producer = request.query_params.get('producer', None)  # Producent
    availability = request.query_params.get('availability', None)  # Dostępność (np. >0)
    product_name = request.query_params.get('name', None)

    # Pobranie produktów
    products = Product.objects.all()

    # Filtrowanie po kategorii
    if category_id:
        products = products.filter(category_id=category_id)

    # Filtrowanie po cenie
    if min_price:
        products = products.filter(price__gte=min_price)
    if max_price:
        products = products.filter(price__lte=max_price)

    # Filtrowanie po producencie
    if producer:
        products = products.filter(producer__icontains=producer)  # Case-insensitive

    # Filtrowanie po dostępności
    if availability is not None:
        if availability == "1":  # Tylko dostępne produkty
            products = products.filter(availability__gt=0)
        elif availability == "0":  # Wszystkie produkty, w tym niedostępne
            products = products.filter(availability__lte=0)
    if product_name:
        products = products.filter(name__icontains=product_name)

    # Paginacja
    paginator = ProductPagination()
    paginated_products = paginator.paginate_queryset(products, request)
    serializer = ProductSerializer(paginated_products, many=True)

    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])  # Umożliwienie dostępu bez autoryzacji
def get_producers(request):
    category_id = request.query_params.get('category', None)  # ID kategorii (opcjonalne)

    # Pobranie unikalnych producentów, z opcjonalnym filtrem kategorii
    if category_id:
        producers = Product.objects.filter(category_id=category_id).values_list('producer', flat=True).distinct()
    else:
        producers = Product.objects.values_list('producer', flat=True).distinct()

    return Response(list(producers))