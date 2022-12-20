# Generated by Django 4.0 on 2022-03-12 13:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Restaurants',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('address', models.CharField(max_length=200)),
                ('logo', models.ImageField(blank=True, null=True, upload_to='restaurant_logo/')),
                ('postal_code', models.CharField(max_length=200)),
                ('phone_num', models.CharField(max_length=200)),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='accounts.useraccount')),
            ],
        ),
        migrations.CreateModel(
            name='RestaurantMenus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('img', models.ImageField(blank=True, null=True, upload_to='food_img/')),
                ('price', models.FloatField()),
                ('restaurant', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='restaurants.restaurants')),
            ],
        ),
    ]
