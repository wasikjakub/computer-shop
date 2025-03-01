from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .serializers import BasketSerializer, OrderSerializer
from .models import Basket, Item, Order

# Create your views here.
class BasketViewSet(viewsets.ModelViewSet):
    serializer_class = BasketSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Basket.objects.filter(user=self.request.user)
    
    def retrieve(self, request, *args, **kwargs):
        instance = Basket.objects.get(user=request.user)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def current(self, request):
        basket, created = Basket.objects.get_or_create(user=request.user)
        serializer = self.get_serializer(basket)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def add_item(self, request):
        basket, created = Basket.objects.get_or_create(user=request.user)
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity')
        
        # Ensure both product_id and quantity are provided
        if not product_id or not quantity:
            return Response(
                {"error": "Product ID and quantity are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        try:
            from products.models import Product
            product = Product.objects.get(id=product_id)
            basket.add_item(product=product, quantity=int(quantity))
            return Response(
                {"message": "Item added successfully."},
                status=status.HTTP_201_CREATED,
            )
        except Product.DoesNotExist:
            return Response(
                {"error": "Product does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )

    @action(detail=False, methods=["post"])
    def remove_item(self, request):
        basket, created = Basket.objects.get_or_create(user=request.user)
        item_id = request.data.get("item_id")
        quantity = request.data.get("quantity", 1)  # Default to 1 if no quantity provided

        if not item_id:
            return Response({"error": "itemId is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            quantity = int(quantity)
            if quantity <= 0:
                return Response({"error": "Quantity must be greater than 0"}, status=status.HTTP_400_BAD_REQUEST)
            
            basket.remove_item(item_id, quantity)
            return Response({"success": f"{quantity} unit(s) of item {item_id} removed successfully"})
        except ValueError:
            return Response({"error": "Invalid quantity"}, status=status.HTTP_400_BAD_REQUEST)
        except Item.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)



    @action(detail=False, methods=["post"])
    def clear(self, request):
        basket, created = Basket.objects.get_or_create(user=request.user)
        basket.clear_basket()
        return Response({"success": "Basket cleared successfully"})
    

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def get_orders(self, request):
        orders, created = Order.objects.get_or_create(user=request.user)
        serializer = self.get_serializer(orders)
        return Response(serializer.data)


class CreateOrderView(APIView):
    def post(self, request):
        user = request.user

        try:
            # Retrieve the user's basket
            basket = Basket.objects.get(user=user)

            # Check if the basket has items
            if not basket.items.exists():
                return Response({"error": "Koszyk jest pusty."}, status=status.HTTP_400_BAD_REQUEST)

            # Serialize basket items into JSON-compatible format
            items = [
                {
                    'product_id': item.product.id,
                    'product_name': item.product.name,
                    'product_price': float(item.product.price),  # Convert Decimal to float
                    'quantity': item.quantity,
                    'total_price': float(item.total_price()),  # Convert Decimal to float
                }
                for item in basket.items.all()
            ]

            # Create the order
            order = Order.objects.create(
                user=user,
                total_cost=basket.total_cost(),
                items=items,
            )

            # Clear the basket
            basket.clear_basket()

            return Response({"message": "Zamówienie utworzone pomyślnie.", "order_id": order.id}, status=status.HTTP_201_CREATED)

        except Basket.DoesNotExist:
            return Response({"error": "Koszyk nie istnieje."}, status=status.HTTP_404_NOT_FOUND)