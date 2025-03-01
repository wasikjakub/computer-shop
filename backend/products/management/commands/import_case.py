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
        case_db = pd.read_csv("D:/semestr_9/zarzadzanie_projektami/SdKiZSK/csv/new/case_cleared.csv")
        case_db_cleaned = case_db.dropna(subset=['price']) #usuwam wszystkie braki wartosci w kolumnie cena

        category_name = "Case" 
        category_description = "A PC case, also known as a chassis, is the enclosure that houses the internal components of a computer, including the motherboard, CPU, GPU, storage devices, and power supply. It provides structural support, protects components from dust and physical damage, and facilitates cooling through airflow and fan placement. PC cases come in various sizes (ATX, Micro-ATX, Mini-ITX) to accommodate different motherboard sizes and offer features like cable management, expansion slots, and front-panel connectivity. A well-designed case ensures optimal cooling and organization for efficient system performance."
        category, _ = Category.objects.get_or_create(name=category_name, description=category_description)

        for _, row in case_db_cleaned.iterrows():
            attributes_prod = {
                key: value for key, value in row.items()
                if key not in ['name', 'price', 'internal_35_bays']
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
