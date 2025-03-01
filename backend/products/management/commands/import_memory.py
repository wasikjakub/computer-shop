import os
import sys
import django
import json 

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "SDKIZSK.settings")

django.setup()

from products.models import Category, Product
from django.core.management.base import BaseCommand
import pandas as pd

class Command(BaseCommand):
    help = "Import products from CSV"

    def handle(self, *args, **kwargs):
        memory_db = pd.read_csv("D:/semestr_9/zarzadzanie_projektami/SdKiZSK/csv/new/memory_cleared.csv")
        memory_db_cleaned = memory_db.dropna(subset=['price']) #usuwam wszystkie braki wartosci w kolumnie cena

        category_name = "Memory" 
        category_description = "Memory, or RAM (Random Access Memory), is a critical component of a computer that temporarily stores data and instructions for the CPU to access quickly. It enables smooth and fast operation of applications and multitasking by providing quick read and write access. Memory is volatile, meaning it loses all stored data when the power is turned off. There are different types of memory, including DDR (Double Data Rate), with DDR4 and DDR5 being the most common in modern computers. Higher capacity and faster memory improve system performance, especially in tasks like gaming, video editing, and data processing. Memory modules come in various sizes, speeds, and configurations to meet different system requirements."
        category, _ = Category.objects.get_or_create(name=category_name, description=category_description)

        for _, row in memory_db_cleaned.iterrows():
            attributes_prod = {
                key: value for key, value in row.items()
                if key not in ['name', 'price']
            }

            producer_prod = row["name"].split()[0] #zakladamy ze producent sie sygnuje w pierwszym slowie nazwy 
            availability_prod = 20 #zakladam losowo 
            
            attributes_prod = json.dumps(attributes_prod)

            Product.objects.create(
            name=row["name"],
            producer=producer_prod,
            availability=availability_prod,
            price=row["price"],
            category=category,  
            attributes=attributes_prod)

        self.stdout.write(self.style.SUCCESS(f"Products imported successfully under '{category_name}'!"))
