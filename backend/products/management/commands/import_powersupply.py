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
        psu_db = pd.read_csv("D:/semestr_9/zarzadzanie_projektami/SdKiZSK/csv/new/psu_cleared.csv")
        psu_db_cleaned = psu_db.dropna(subset=['price']) #usuwam wszystkie braki wartosci w kolumnie cena

        category_name = "Power Supply" 
        category_description = "A power supply unit (PSU) is a crucial component that provides electrical power to a computer by converting alternating current (AC) from a wall outlet into direct current (DC) used by the system's internal components. It ensures stable and reliable power delivery to the motherboard, CPU, GPU, storage devices, and other peripherals. Power supplies come in various wattages, typically ranging from 300W to over 1000W, depending on the system's power needs. A high-quality PSU with features like overvoltage protection, efficiency certification (such as 80 Plus), and modular cables helps ensure the longevity and stability of the entire system."
        category, _ = Category.objects.get_or_create(name=category_name, description=category_description)

        for _, row in psu_db_cleaned.iterrows():
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
