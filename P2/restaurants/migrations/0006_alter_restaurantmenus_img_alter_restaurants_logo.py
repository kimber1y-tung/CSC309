# Generated by Django 4.0 on 2022-04-14 12:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0005_remove_restaurants_dislikes_remove_restaurants_likes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='restaurantmenus',
            name='img',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='restaurants',
            name='logo',
            field=models.CharField(max_length=200),
        ),
    ]