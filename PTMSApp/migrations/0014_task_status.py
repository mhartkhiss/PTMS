# Generated by Django 4.2.6 on 2023-10-04 20:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PTMSApp', '0013_alter_task_priority'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='status',
            field=models.CharField(choices=[('todo', 'To Do'), ('inprogress', 'In Progress'), ('completed', 'Completed')], default='todo', max_length=20),
        ),
    ]
