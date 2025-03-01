from django.db import models
from django.contrib.auth.models import User

class Basket(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='basket')

    def items_list(self):
        return self.items.all()

    def total_cost(self):
        return sum(item.total_price() for item in self.items.all())

    def add_item(self, product, quantity):
        item, created = Item.objects.get_or_create(
            basket=self,
            product=product,
            defaults={'quantity': quantity},
        )
        if not created:
            item.quantity += quantity
            item.save()
        return item

    def remove_item(self, item_id, quantity):
        item = self.items.filter(id=item_id).first()
        if not item:
            raise Item.DoesNotExist(f"Item with id {item_id} not found in basket.")
        
        if item.quantity > quantity:
            item.quantity -= quantity
            item.save()
        else:
            item.delete()

    def clear_basket(self):
        self.items.all().delete()

    def __str__(self):
        return f"Basket for {self.user.username} with {self.total_cost()} total cost"


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    created_at = models.DateTimeField(auto_now_add=True)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    items = models.JSONField()  # To save a serialized list of items

    def __str__(self):
        return f"Order {self.id} by {self.user.username} on {self.created_at}"

class Item(models.Model):
    product = models.ForeignKey(
       'products.product', on_delete=models.CASCADE
    )
    quantity = models.IntegerField()
    basket = models.ForeignKey(
        'Basket', on_delete=models.CASCADE, related_name='items'
    )
    
    def total_price(self):
        return self.quantity * self.product.price
    
    def __str__(self):
        return f"{str(self.product)} of {self.quantity} quantity with a price of {self.product.price}"
