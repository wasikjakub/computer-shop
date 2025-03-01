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
        mb_db = pd.read_csv("D:/semestr_9/zarzadzanie_projektami/SdKiZSK/csv/new/motherboard_cleared.csv")
        mb_db_cleaned = mb_db.dropna(subset=['price']) #usuwam wszystkie braki wartosci w kolumnie cena

        category_name = "Motherboard" 
        category_description = "A motherboard is the main circuit board of a computer, connecting all components and allowing communication between them. It houses the CPU, memory, and expansion slots, and connects to storage devices, power supply, and peripherals. Motherboards come in various form factors like ATX, microATX, and mini-ITX, affecting size and expansion options. They include a chipset that controls data flow, and offer ports such as USB, Ethernet, and audio jacks. Key features to consider are CPU socket compatibility, RAM slots, and PCIe lanes for graphics cards or other expansion cards. The motherboard plays a crucial role in system stability and performance."
        category, _ = Category.objects.get_or_create(name=category_name, description=category_description)

        for _, row in mb_db_cleaned.iterrows():
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
