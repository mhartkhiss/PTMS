from django.db import models
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.models import User  # Import the User model from django.contrib.auth

class UserList(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    email = models.CharField(max_length=255)

class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(null=True)
    priority = models.CharField(max_length=10)
    due_date = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=(
        ('todo', 'To Do'),
        ('inprogress', 'In Progress'),
        ('completed', 'Completed'),
    ), default='todo')
    
    category = models.CharField(max_length=255, null=True)
    
    def __str__(self):
        return self.title
    
    
