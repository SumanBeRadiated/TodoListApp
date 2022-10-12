from posixpath import isabs
from unicodedata import category
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from .serializers import todoItemSerializer, categorySerializer, userSerializer
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import TodoItem, Category
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.

def home(request):

    return HttpResponse('<h1>Ttest</h1>')


@api_view(['GET','POST','PUT'])
@permission_classes([IsAuthenticated])
def getToDoList(request):
    

    user = request.user
    
    
    if request.method == "GET":
       
        
        todo_lists = TodoItem.objects.filter(cat__user=user.id)
        serializer = todoItemSerializer(todo_lists, many=True)
    
        
        return Response(serializer.data)
    elif request.method == "POST":
        # print("Cats: ", Category.objects.filter(id=0))
        cat = Category.objects.get(id=int(request.data["cat"]))
        
        todo = TodoItem.objects.create(todo_title=request.data['todo_title'], cat = cat)
        if todo:
            todo.save()
        serializer = todoItemSerializer(todo)
            
        return Response(serializer.data)
    elif request.method == "PUT":
        print(request.data)
        #request.data is Query Dictionary 
        updated_data = TodoItem.objects.filter(id = request.data["id"]).delete()
        #here updated_data is model type

        
        serializer = todoItemSerializer(updated_data)

        return Response(serializer.data)

@api_view(['POST'])
def signupUser(request):
    class username_email_exists(Exception):
        def __init__(self, message):
            
            super().__init__(message)
            self.message = message
        
        def __str__(self):
            return self.message
            
    try:
        data = request.data

        if User.objects.filter(username=data["username"]).exists():
            raise username_email_exists("Username exists.")
        if  User.objects.filter(email=data["email"]).exists():
            raise username_email_exists("Email Exists.")
        User.objects.create(username=data["username"], email=data["email"],password=make_password(data["password"]))
        return Response("User successfully created.") 
    except username_email_exists as e:      
        return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
    
    except username_email_exists as e:        
        return Response(str(e))
    except Exception:
        return Response("User failted to create.") 
    


        


@api_view(['GET', 'POST', 'PUT'])
@permission_classes([IsAuthenticated])
def getCategory(request):
    # Category.objects.all().delete()
    
    if request.method == 'GET':
        user = request.user

        categories = Category.objects.filter(user=user.id)
        
        
        serializer = categorySerializer(categories, many=True)


        return Response(serializer.data)
    elif request.method == 'POST':
        
        new_category = Category.objects.create(user=request.user, cat_title=request.data['categoryTitle'])
        if new_category:
            new_category.save()
        categories = Category.objects.filter(user=request.user)
        

        
        
        serializer = categorySerializer(new_category)
        # print(serializer.data)
        return Response(serializer.data)
    elif request.method == 'PUT':
        
        Category.objects.filter(id = request.data).delete()
        categorys = Category.objects.all()
        serializer = categorySerializer(categorys)

        return Response(serializer.data)


        
 


    
@api_view(['GET','POST','PUT'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    user = request.user

    if request.method == "GET":
        
        user_data = User.objects.get(id=user.id)

        serializer = userSerializer(user_data)
        return Response(serializer.data)
    elif request.method == "PUT":
        class username_email_exists(Exception):
            def __init__(self, message):
                
                super().__init__(message)
                self.message = message
            
            def __str__(self):
                return self.message
        try:
            # print(request.data)
            user_data = User.objects.get(id=user.id)
            if request.data['username']:
                if User.objects.filter(username=request.data["username"]).exists():
                    raise username_email_exists("Username exists.")
                
                user_data.username = request.data["username"]
                user_data.save()
            if request.data['email']:
                if  User.objects.filter(email=request.data["email"]).exists():
                    raise username_email_exists("Email Exists.")
                user_data.email = request.data["email"]
                user_data.save()
            
            
            
            user_data = User.objects.get(id=user.id)
            serializer= userSerializer(user_data)
        
            return Response(serializer.data)
        except username_email_exists as e:      
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
    
        except username_email_exists as e:        
            return Response(str(e))
        except Exception:
            return Response("User failted to create.") 
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):

    try: 
        token = RefreshToken(request.data["refresh"])
        token.blacklist()
        return Response('User Logout')
    except Exception:
        return Response(status=status.HTTP_400_BAD_REQUEST)