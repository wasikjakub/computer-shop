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
        thermal_db = pd.read_csv("D:/semestr_9/zarzadzanie_projektami/SdKiZSK/csv/new/thermal-paste.csv")
        thermal_db_cleaned = thermal_db.dropna(subset=['price']) #usuwam wszystkie braki wartosci w kolumnie cena

        category_name = "Thermal Paste" 
        category_description = "Thermal paste, also known as thermal compound or thermal grease, is a substance applied between a CPU or GPU and its cooler to improve heat transfer. It fills microscopic gaps and imperfections on the surfaces, ensuring efficient conduction of heat from the processor to the cooler. This helps maintain optimal operating temperatures, preventing overheating and improving the longevity and performance of the components. Thermal paste is essential for high-performance systems, especially in overclocked PCs or those used for heavy tasks like gaming or rendering. Proper application is crucial to avoid air pockets, which can reduce thermal conductivity."
        category, _ = Category.objects.get_or_create(name=category_name, description=category_description)

        for _, row in thermal_db_cleaned.iterrows():
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
