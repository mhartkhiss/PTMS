# Generated by Django 4.2.6 on 2023-10-05 21:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PTMSApp', '0016_alter_task_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='title',
            field=models.CharField(max_length=255, null=True),
        ),
    ]