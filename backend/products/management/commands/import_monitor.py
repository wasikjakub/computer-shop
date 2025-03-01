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
        monitor_db = pd.read_csv("D:/semestr_9/zarzadzanie_projektami/SdKiZSK/csv/new/monitor.csv")
        monitor_db_cleaned = monitor_db.dropna(subset=['price']) #usuwam wszystkie braki wartosci w kolumnie cena

        category_name = "Monitor" 
        category_description = "A monitor is an essential output device that displays visual information from a computer. It converts digital signals from the GPU into images, text, and video. Monitors come in various sizes, resolutions, and panel types (such as IPS, TN, or OLED), affecting color accuracy, refresh rate, and response time. Common resolutions include Full HD (1920x1080), 4K (3840x2160), and higher. Refresh rate, measured in Hz, determines how many frames per second the monitor can display, with higher rates benefiting gaming and smooth motion. Monitors may also feature connectivity options like HDMI, DisplayPort, and USB-C, as well as ergonomic adjustments for improved comfort."
        category, _ = Category.objects.get_or_create(name=category_name, description=category_description)

        for _, row in monitor_db_cleaned.iterrows():
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
