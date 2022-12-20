# Generated by Django 4.0.2 on 2022-03-15 20:32

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social_network', '0002_remove_comments_restaurants_comments_restaurant_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comments',
            name='score',
            field=models.IntegerField(validators=[django.core.validators.MaxValueValidator(5)]),
        ),
    ]