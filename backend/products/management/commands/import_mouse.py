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
        mouse_db = pd.read_csv("D:/semestr_9/zarzadzanie_projektami/SdKiZSK/csv/new/mouse.csv")
        mouse_db_cleaned = mouse_db.dropna(subset=['price']) #usuwam wszystkie braki wartosci w kolumnie cena

        category_name = "Mouse" 
        category_description = "A mouse is a pointing device used to interact with a computer's graphical user interface. It typically features two buttons (left and right) and a scroll wheel for navigation. Mice can be wired or wireless, with wired versions using a USB connection and wireless models utilizing Bluetooth or radio frequency (RF) technology. Ergonomic designs are available for comfort, especially during long usage. Some mice are designed for specific uses, such as gaming, offering high precision, customizable buttons, and adjustable DPI settings. A mouse is essential for selecting, dragging, and interacting with on-screen elements, making it a fundamental input device for most computing tasks."
        category, _ = Category.objects.get_or_create(name=category_name, description=category_description)

        for _, row in mouse_db_cleaned.iterrows():
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
