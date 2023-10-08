# Generated by Django 4.2.5 on 2023-10-04 17:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PTMSApp', '0011_alter_task_priority'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='priority',
            field=models.IntegerField(choices=[(1, 'Low'), (2, 'Medium'), (3, 'High')]),
        ),
    ]