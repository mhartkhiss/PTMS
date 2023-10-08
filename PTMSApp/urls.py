# Import necessary modules
from django.urls import path
from . import views

urlpatterns = [
     path('', views.index_view, name='index'),  
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'), 
    path('tasks/', views.userprofile_view, name='userprofile'),
    path('add_task/', views.add_task, name='add_task'),
    path('update_task_status/<int:task_id>/', views.update_task_status, name='update_task_status'),
    path('update_task/<int:task_id>/', views.update_task, name='update_task'),
    path('delete_task/<int:task_id>/', views.delete_task, name='delete_task'),
]
