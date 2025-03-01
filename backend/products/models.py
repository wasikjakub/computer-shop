from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=1000, unique=False)

    def __str__(self):
        return self.name
    class Meta:
        app_label = 'products'
        verbose_name_plural = "Categories"


class Product(models.Model):
    name = models.CharField(max_length=200)
    producer = models.CharField(max_length=100)
    availability = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name="products")
    attributes = models.JSONField(default=dict) #w postaci słownika

    def get_atribute(self, key):
        return self.attributes.get(key, None)
    
    def has_atribute(self, key):
        return key in self.attributes

    def __str__(self):
        return self.name
    
    class Meta:
        app_label = 'products'