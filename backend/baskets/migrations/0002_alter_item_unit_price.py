# Generated by Django 5.0.3 on 2024-11-10 13:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('baskets', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='unit_price',
            field=models.FloatField(),
        ),
    ]
