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
        os_db = pd.read_csv("D:/semestr_9/zarzadzanie_projektami/SdKiZSK/csv/new/os.csv")
        os_db_cleaned = os_db.dropna(subset=['price']) #usuwam wszystkie braki wartosci w kolumnie cena

        category_name = "OS" 
        category_description = "An operating system (OS) is essential software that manages a computer's hardware and software resources. It provides an interface for users to interact with the system, run applications, and access files. Key functions of an OS include managing memory, processing tasks, handling input/output devices, and ensuring security. Popular operating systems include Windows, macOS, Linux, and Android, each offering different features and capabilities. The OS ensures that different programs can run concurrently without interfering with each other, making it a critical component for system functionality and user experience."
        category, _ = Category.objects.get_or_create(name=category_name, description=category_description)

        for _, row in os_db_cleaned.iterrows():
            attributes_prod = {
                key: value for key, value in row.items()
                if key not in ['name', 'price']
            }

            producer_prod = row["name"].split()[0] #zakladamy ze producent sie sygnuje w pierwszym slowie nazwy 
            availability_prod = 40 #zakladam losowo 
            
            attributes_prod = json.dumps(attributes_prod)

            Product.objects.create(
            name=row["name"],
            producer=producer_prod,
            availability=availability_prod,
            price=row["price"],
            category=category,  
            attributes=attributes_prod)

        self.stdout.write(self.style.SUCCESS(f"Products imported successfully under '{category_name}'!"))
