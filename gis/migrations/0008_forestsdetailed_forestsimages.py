# Generated by Django 3.1.1 on 2020-10-26 04:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gis', '0007_attractions_placetype'),
    ]

    operations = [
        migrations.CreateModel(
            name='forestsDetailed',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('contactInfo', models.TextField(blank=True)),
                ('areaCoverage', models.TextField(blank=True)),
                ('attractions', models.TextField(blank=True)),
                ('accomodation', models.TextField(blank=True)),
                ('accessibility', models.TextField(blank=True)),
                ('activities', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='forestsImages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='', verbose_name='forest image')),
                ('forest', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gis.forestsdetailed')),
            ],
        ),
    ]
