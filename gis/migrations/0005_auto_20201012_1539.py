# Generated by Django 3.1.1 on 2020-10-12 12:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gis', '0004_auto_20201009_2012'),
    ]

    operations = [
        migrations.CreateModel(
            name='favouritePlaces',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('email', models.CharField(max_length=200)),
                ('place_id', models.CharField(max_length=200)),
                ('formatted_address', models.CharField(blank=True, max_length=200)),
                ('rating', models.CharField(blank=True, max_length=200)),
                ('business_status', models.CharField(blank=True, max_length=200)),
                ('lat', models.CharField(blank=True, max_length=200)),
                ('lng', models.CharField(blank=True, max_length=200)),
            ],
        ),
        migrations.AlterField(
            model_name='keys',
            name='apiKey',
            field=models.CharField(max_length=200, verbose_name='api key'),
        ),
        migrations.CreateModel(
            name='favouriteTypes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('placeType', models.CharField(max_length=200)),
                ('place', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gis.favouriteplaces')),
            ],
        ),
    ]
