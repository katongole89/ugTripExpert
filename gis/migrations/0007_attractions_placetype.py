# Generated by Django 3.1.1 on 2020-10-23 00:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gis', '0006_auto_20201012_1541'),
    ]

    operations = [
        migrations.AddField(
            model_name='attractions',
            name='placeType',
            field=models.CharField(default='', max_length=200),
        ),
    ]
