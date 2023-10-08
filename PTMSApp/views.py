from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import UserList
from .models import Task
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
import json

    
    
def login_view(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        
       
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            print("User authenticated:", user.username)  
            return redirect('userprofile') 
        else:
            login_message = "Invalid username or password. Try again."
            return render(request, 'PTMSApp/login.html', {'login_message': login_message})

    return render(request, 'PTMSApp/login.html')


def register_view(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        email = request.POST['email']
        
        # Create a new user with a hashed password
        user = User.objects.create_user(username=username, password=password, email=email)
        
        # add other user-related fields here if needed
        # user.first_name = "First Name"
        # user.last_name = "Last Name"
        # user.save()

        return redirect('login')  
    return render(request, 'PTMSApp/register.html')


def userprofile_view(request):
    if request.user.is_authenticated:
        user = request.user
        tasks = Task.objects.filter(user=user)  # Retrieve tasks for the current user

        if request.method == 'POST':
            task_id = request.POST.get('task_id')
            new_status = request.POST.get('new_status')
            task = Task.objects.get(id=task_id)
            task.status = new_status
            task.save()

        # Create a variable to indicate whether there are tasks or not
        has_tasks = len(tasks) > 0

        return render(request, 'PTMSApp/userprofile.html', {'user': user, 'tasks': tasks, 'has_tasks': has_tasks})
    else:
        return redirect('login')


def index_view(request):
    return render(request, 'PTMSApp/index.html')

def add_task(request):
    if request.method == 'POST':
        title = request.POST.get('taskTitle')
        description = request.POST.get('taskDescription')
        priority = request.POST.get('taskPriority')
        due_date = request.POST.get('taskDueDate')
        category = request.POST.get('taskCategory')
        
        # Get the currently logged-in user
        user = request.user

        # Create a new Task object associated with the user and save it to the database
        task = Task(user=user, title=title, description=description, priority=priority, due_date=due_date, category=category)  
        task.save()

        task_data = {
            'title': task.title,
            'description': task.description,
            'priority': task.priority,
            'due_date': task.due_date,
            'category': task.category, 
        }
        return JsonResponse(task_data)
    
    return JsonResponse({'message': 'Invalid request method'}, status=405)

def update_task_status(request, task_id):
    if request.method == 'POST':
        try:
            task = get_object_or_404(Task, id=task_id)
            data = json.loads(request.body.decode('utf-8'))
            new_status = data.get('newStatus')
            task.status = new_status
            task.save()
            
            return JsonResponse({'message': 'Status updated successfully'})
        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=400)


def update_task(request, task_id):
    if request.method == 'POST':
        task = get_object_or_404(Task, id=task_id)
        task.title = request.POST.get('title')
        task.description = request.POST.get('description')
        task.status = request.POST.get('status')
        task.priority = request.POST.get('priority')
        task.due_date = request.POST.get('due_date')
        task.category = request.POST.get('category')
        task.save()

        return JsonResponse({'message': 'Task updated successfully'})
    return JsonResponse({'error': 'Invalid request method'}, status=400)

def delete_task(request, task_id):
    if request.method == 'DELETE':
        task = get_object_or_404(Task, id=task_id)
        task.delete()
        return JsonResponse({'message': 'Task deleted successfully'})
    return JsonResponse({'error': 'Invalid request method'}, status=400)