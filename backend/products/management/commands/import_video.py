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
        gpu_db = pd.read_csv("D:/semestr_9/zarzadzanie_projektami/SdKiZSK/csv/new/video_card_cleared.csv")
        gpu_db_cleaned = gpu_db.dropna(subset=['price']) #usuwam wszystkie braki wartosci w kolumnie cena

        category_name = "GPU" 
        category_description = "A video card, or GPU (Graphics Processing Unit), is a hardware component that renders images, videos, and animations for display on a computer screen. It offloads graphics processing from the CPU, enhancing performance in tasks like gaming, video editing, and 3D rendering. Modern GPUs feature dedicated memory (VRAM) for faster data access and parallel processing capabilities, improving efficiency. GPUs are crucial for high-quality graphics, gaming, machine learning, and scientific simulations. Performance depends on factors like clock speed, core count, VRAM, and memory bandwidth."
        category, _ = Category.objects.get_or_create(name=category_name, description=category_description)

        for _, row in gpu_db_cleaned.iterrows():
            attributes_prod = {
                key: value for key, value in row.items()
                if key not in ['name', 'price', 'color']
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
