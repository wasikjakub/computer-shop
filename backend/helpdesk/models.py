from django.db import models

# Create your models here.
class TechnicalSupport(models.Model):
    name = models.CharField(max_length=50)
    email_address = models.EmailField()
    
    class ProblemType(models.TextChoices):
        SPRZET = 'Sprzęt', 'Sprzęt'
        OPROGRAMOWANIE = 'Oprogramowanie', 'Oprogramowanie'
        KOMPATYBILNOSC = 'Kompatybilność', 'Kompatybilność'
        INNY = 'Inny', 'Inny'

    problem_type = models.CharField(
        max_length=20,
        choices=ProblemType.choices,
    )
    problem_description = models.TextField(max_length=1000)
    
    
class ContactForm(models.Model):
    name = models.CharField(max_length=50)
    email_address = models.EmailField()
    message = models.TextField(max_length=1000)