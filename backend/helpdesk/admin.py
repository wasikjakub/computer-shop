from django.contrib import admin
from .models import TechnicalSupport, ContactForm

# Register your models here.
admin.site.register(TechnicalSupport)
admin.site.register(ContactForm)