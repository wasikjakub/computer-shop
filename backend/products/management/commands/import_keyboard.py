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
        keyboard_db = pd.read_csv("D:/semestr_9/zarzadzanie_projektami/SdKiZSK/csv/new/keyboard.csv")
        keyboard_db_cleaned = keyboard_db.dropna(subset=['price']) #usuwam wszystkie braki wartosci w kolumnie cena

        category_name = "Keyboard" 
        category_description = "A keyboard is an input device used to type text, numbers, and commands into a computer. It consists of a set of keys, including letters, numbers, function keys, and control keys. Keyboards are typically connected to a computer via USB, Bluetooth, or wireless connections. They come in various designs, such as mechanical, membrane, and chiclet, offering different typing experiences. Mechanical keyboards are known for their tactile feedback and durability, while membrane keyboards are quieter and more affordable. Keyboards may also include additional features like backlighting, programmable keys, and ergonomic designs for enhanced comfort during extended use."
        category, _ = Category.objects.get_or_create(name=category_name, description=category_description)

        for _, row in keyboard_db_cleaned.iterrows():
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
