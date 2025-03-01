from rest_framework import serializers
from .models import ContactForm, TechnicalSupport

class ContactFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactForm
        fields = ['id', 'name', 'email_address', 'message']
        
class TechnicalSupportSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechnicalSupport
        fields = ['id', 'name', 'email_address', 'problem_type', 'problem_description']