# Generated by Django 4.0 on 2022-03-12 13:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('restaurants', '0001_initial'),
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('score', models.FloatField()),
                ('content', models.CharField(max_length=5000)),
                ('likes_num', models.IntegerField(default=0)),
                ('dislikes_num', models.IntegerField(default=0)),
                ('poster', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='accounts.useraccount')),
            ],
        ),
        migrations.CreateModel(
            name='RestaurantBlogs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField(max_length=50)),
                ('content', models.CharField(max_length=5000)),
                ('likes_num', models.IntegerField(default=0)),
                ('dislikes_num', models.IntegerField(default=0)),
                ('poster', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='accounts.useraccount')),
                ('restaurant', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='restaurants.restaurants')),
            ],
        ),
        migrations.CreateModel(
            name='RestaurantBlogsImg',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img', models.ImageField(blank=True, null=True, upload_to='blog_img/')),
                ('blog', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='social_network.restaurantblogs')),
            ],
        ),
        migrations.CreateModel(
            name='Reply',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('comment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='social_network.comments')),
                ('poster', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.useraccount')),
            ],
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField()),
                ('target_url', models.URLField()),
                ('message', models.CharField(max_length=100)),
                ('from_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='from_user', to='accounts.useraccount')),
                ('to_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='to_user', to='accounts.useraccount')),
            ],
        ),
        migrations.CreateModel(
            name='Following',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('follow_status', models.BooleanField()),
                ('like_status', models.BooleanField()),
                ('restaurant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restaurants.restaurants')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.useraccount')),
            ],
        ),
        migrations.AddField(
            model_name='comments',
            name='restaurants',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='social_network.restaurantblogs'),
        ),
    ]
