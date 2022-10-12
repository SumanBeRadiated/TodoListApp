from rest_framework import serializers
from .models import TodoItem, Category
from django.contrib.auth.models import User

class categorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class todoItemSerializer(serializers.ModelSerializer):
    catTitle = serializers.ReadOnlyField()

    class Meta:
        model = TodoItem
        fields = '__all__'

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']