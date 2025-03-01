from rest_framework import serializers
from .models import Category, Product
import json

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        
class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    
    class Meta:
        model = Product
        fields = '__all__'
    
    # # Include full category details on read
    # def to_representation(self, instance):
    #     representation = super().to_representation(instance) 
    #     representation['category'] = CategorySerializer(instance.category).data
    #     return representation
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        attributes = representation.get('attributes', {})
        
        # Zastępujemy NaN na null w attributes
        if attributes:
            try:
                attributes = json.loads(attributes)
                # Zmieniamy NaN na None w JSON
                for key, value in attributes.items():
                    if isinstance(value, float) and value != value:  # Sprawdzamy NaN
                        attributes[key] = None
                representation['attributes'] = json.dumps(attributes)  # Zwracamy poprawnie zmodyfikowany JSON
            except json.JSONDecodeError:
                pass
        return representation
    