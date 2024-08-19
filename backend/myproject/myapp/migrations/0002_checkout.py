# Generated by Django 5.0.4 on 2024-05-03 06:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='checkout',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.CharField(max_length=100)),
                ('product_quantity', models.IntegerField()),
                ('product_total', models.IntegerField()),
                ('shipingaddress', models.CharField(max_length=200)),
            ],
        ),
    ]
