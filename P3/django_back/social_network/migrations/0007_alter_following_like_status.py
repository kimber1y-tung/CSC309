# Generated by Django 4.0 on 2022-04-18 11:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social_network', '0006_alter_restaurantblogsimg_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='following',
            name='like_status',
            field=models.IntegerField(default=0),
        ),
    ]