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
        cpu_cooler_db = pd.read_csv("D:/semestr_9/zarzadzanie_projektami/SdKiZSK/csv/new/cpu-cooler.csv")
        cpu_cooler_db_cleaned = cpu_cooler_db.dropna(subset=['price']) #usuwam wszystkie braki wartosci w kolumnie cena

        category_name = "CPU cooler" 
        category_description = "A CPU cooler is a device used to dissipate heat from the central processing unit (CPU) to maintain optimal operating temperatures. It typically consists of a heatsink and a fan, with the heatsink drawing heat away from the CPU and the fan enhancing airflow to expel the heat. CPU coolers come in two main types: air coolers (using a heatsink and fan) and liquid coolers (using a closed-loop liquid system with a radiator). Effective cooling ensures system stability, prevents overheating, and enhances the lifespan and performance of the CPU."
        category, _ = Category.objects.get_or_create(name=category_name, description=category_description)

        for _, row in cpu_cooler_db_cleaned.iterrows():
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
