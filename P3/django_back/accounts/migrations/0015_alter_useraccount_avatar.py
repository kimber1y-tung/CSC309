# Generated by Django 4.0.2 on 2022-04-20 00:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0014_alter_useraccount_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='avatar',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
