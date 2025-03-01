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
        speaker_db = pd.read_csv("D:/semestr_9/zarzadzanie_projektami/SdKiZSK/csv/new/speakers.csv")
        speaker_db_cleaned = speaker_db.dropna(subset=['price']) #usuwam wszystkie braki wartosci w kolumnie cena

        category_name = "Speakers" 
        category_description = "Speakers are output devices that produce sound from a computer or audio system. They convert electrical signals into audible sound by vibrating air through cones or diaphragms. In a PC setup, speakers can vary from compact desktop models to larger, high-fidelity systems. They may come with features such as built-in amplifiers, Bluetooth connectivity, or surround sound capabilities. Audio quality is often influenced by factors like speaker size, frequency response, and power handling. Whether for gaming, music, or video editing, a good set of speakers enhances the listening experience, offering clear, rich sound for all types of media."
        category, _ = Category.objects.get_or_create(name=category_name, description=category_description)

        for _, row in speaker_db_cleaned.iterrows():
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
