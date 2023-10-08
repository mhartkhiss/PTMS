# forms.py
from django import forms
from .models import Task

class TaskEditForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ['title', 'description', 'status', 'category', 'priority', 'due_date']
