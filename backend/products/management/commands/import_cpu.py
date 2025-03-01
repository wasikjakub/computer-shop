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
        cpu_db = pd.read_csv("D:/semestr_9/zarzadzanie_projektami/SdKiZSK/csv/new/cpu_cleared.csv")
        cpu_db_cleaned = cpu_db.dropna(subset=['price']) #usuwam wszystkie braki wartosci w kolumnie cena

        category_name = "Processors" 
        category_description = "The CPU (Central Processing Unit) is the brain of a computer, responsible for executing instructions and performing calculations. It processes data, runs applications, and coordinates with hardware. Performance depends on factors like clock speed, cores, and cache size."
        category, _ = Category.objects.get_or_create(name=category_name, description=category_description)

        for _, row in cpu_db_cleaned.iterrows():
            attributes_prod = {
                key: value for key, value in row.items()
                if key not in ['name', 'price', 'smt']
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

    