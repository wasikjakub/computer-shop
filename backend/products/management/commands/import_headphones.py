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
        headphones_db = pd.read_csv("D:/semestr_9/zarzadzanie_projektami/SdKiZSK/csv/new/headphones.csv")
        headphones_db_cleaned = headphones_db.dropna(subset=['price']) #usuwam wszystkie braki wartosci w kolumnie cena

        category_name = "Headphones" 
        category_description = "Headphones are audio devices worn over or in the ears to listen to sound from a computer, phone, or other media players. They consist of speakers, ear cups or ear tips, and a headband or other support for comfort. Headphones are available in different types, including over-ear, on-ear, and in-ear designs. They can be wired or wireless, with wireless models using Bluetooth technology. High-quality headphones provide clear sound, enhanced bass, and noise isolation or cancellation features, offering an immersive listening experience for music, gaming, or calls."
        category, _ = Category.objects.get_or_create(name=category_name, description=category_description)

        for _, row in headphones_db_cleaned.iterrows():
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
