# Generated by Django 3.0.5 on 2020-11-14 10:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0002_notifications_movietitle'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notifications',
            name='fromUsername',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AlterField(
            model_name='notifications',
            name='movieTitle',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AlterField(
            model_name='notifications',
            name='toUsername',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AlterField(
            model_name='notifications',
            name='type',
            field=models.CharField(blank=True, max_length=30),
        ),
    ]