# Generated by Django 3.1.1 on 2020-10-12 12:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gis', '0005_auto_20201012_1539'),
    ]

    operations = [
        migrations.AlterField(
            model_name='favouriteplaces',
            name='lat',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='favouriteplaces',
            name='lng',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='favouritetypes',
            name='placeType',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
