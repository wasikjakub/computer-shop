# Generated by Django 5.0.3 on 2024-11-10 10:06

import jsonfield.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='specification',
            field=jsonfield.fields.JSONField(blank=True, null=True),
        ),
    ]
