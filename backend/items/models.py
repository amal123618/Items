
from django.db import models

class Item(models.Model):
    ITEM_TYPES = [
        ('shirt', 'Shirt'),
        ('pant', 'Pant'),
        ('shoes', 'Shoes'),
        ('sports', 'Sports Gear'),
    ]

    name = models.CharField(max_length=100)
    item_type = models.CharField(max_length=20, choices=ITEM_TYPES)
    description = models.TextField()
    cover_image = models.ImageField(upload_to='cover_images/')

class ItemImage(models.Model):
    item = models.ForeignKey(Item, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='item_images/')

