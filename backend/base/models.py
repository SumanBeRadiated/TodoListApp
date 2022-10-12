from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null = True)
    cat_title = models.CharField(max_length=1000, null = True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True, null = True, blank=True)
    date_updated= models.DateTimeField(auto_now=True, null = True, blank=True)

    def __str__(self):
        return self.cat_title

class TodoItem(models.Model):
    
    todo_title = models.CharField(max_length=1000, null = True, blank=True)
    todo_completion = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True, null = True, blank=True)
    date_updated= models.DateTimeField(auto_now=True, null = True, blank=True)
    cat = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="category", null=True)

    def catTitle(self):
        return self.cat.cat_title

    def __str__(self):
        return self.todo_title


