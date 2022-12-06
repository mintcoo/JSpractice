# Generated by Django 3.2.13 on 2022-10-16 10:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0002_comment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='movie',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comment', to='movies.movie'),
        ),
    ]