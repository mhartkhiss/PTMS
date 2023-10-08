from django.contrib.auth.backends import BaseBackend
from .models import UserList  # Import your custom user model

class CustomAuthBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = UserList.objects.get(username=username)
            if user.check_password(password):
                return user
        except UserList.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return UserList.objects.get(pk=user_id)
        except UserList.DoesNotExist:
            return None
