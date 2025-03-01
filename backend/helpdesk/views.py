from django.shortcuts import render
from rest_framework import viewsets
from .models import ContactForm, TechnicalSupport
from .serializers import ContactFormSerializer, TechnicalSupportSerializer

# Create your views here.
class ContactFormViewSet(viewsets.ModelViewSet):
    queryset = ContactForm.objects.all()
    serializer_class = ContactFormSerializer

class TechnicalSupportViewSet(viewsets.ModelViewSet):
    queryset = TechnicalSupport.objects.all()
    serializer_class = TechnicalSupportSerializer