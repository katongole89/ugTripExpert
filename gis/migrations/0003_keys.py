# Generated by Django 3.1.1 on 2020-10-09 17:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gis', '0002_places'),
    ]

    operations = [
        migrations.CreateModel(
            name='keys',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('apiKey', models.CharField(default=False, max_length=200)),
            ],
        ),
    ]
