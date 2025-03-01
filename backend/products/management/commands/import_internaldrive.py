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
        drive_db = pd.read_csv("D:/semestr_9/zarzadzanie_projektami/SdKiZSK/csv/new/internal_drive_cleared.csv")
        drive_db_cleaned = drive_db.dropna(subset=['price']) #usuwam wszystkie braki wartosci w kolumnie cena

        category_name = "Internal Hard Drive" 
        category_description = "An internal hard drive (HDD) is a data storage device installed inside a computer or laptop. It uses spinning disks (platters) coated with magnetic material to read and write data. Internal hard drives are typically used for storing the operating system, software, and large files like documents, videos, and games. They come in various storage capacities, commonly ranging from 500GB to several terabytes. HDDs are known for their affordability and large storage space, although they are slower than solid-state drives (SSDs). Internal hard drives are connected to the motherboard via SATA or other interfaces, ensuring efficient data access and storage."
        category, _ = Category.objects.get_or_create(name=category_name, description=category_description)

        for _, row in drive_db_cleaned.iterrows():
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
