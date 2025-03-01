from rest_framework import serializers
from .models import Basket, Item, Order
from django.db import models


class ItemSerializer(serializers.ModelSerializer):

    product = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    product_name = serializers.CharField(source='product.name')
    product_price = serializers.DecimalField(
        source='product.price', max_digits=10, decimal_places=2
    )
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = ['id', 'product_name', 'product_price', 'quantity', 'total_price', 'product']

    def get_total_price(self, obj):
        return obj.total_price()
    
class BasketSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True, source='items_list')
    total_cost = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Basket
        fields = ['id', 'items', 'total_cost']
        
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'user', 'created_at', 'total_cost', 'items']