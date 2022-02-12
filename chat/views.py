from email import message
from urllib import request
from django.dispatch import receiver
from django.http import HttpResponse
from django.shortcuts import redirect, render
from rest_framework.views import APIView
from django.contrib.auth import authenticate,login,logout
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import ListViewSerializer,EmployeeSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication,TokenAuthentication
from .models import Employee



# Create your views here.
class UserLogin(APIView):
    

    def post(self, request):
        if request.user.is_authenticated:
            return HttpResponse('ok')
        username = request.data['username']
        password = request.data['password']
        try:
            auth = User.objects.get(username=username)
        except User.DoesNotExist as e:
            auth=None
        if auth is None:
            data ={'status':'not logged in','status_code':403}
            return Response(data)
        user = authenticate(username=username, password=password)
        if user:
            login(request,user)
            print('userloggedin')
            return Response({'status':'sueccess','status_code':200})
        return Response('data coming',status=status.HTTP_200_OK)

class SendMessage(APIView):
    authentication_classes=(TokenAuthentication,SessionAuthentication,)
    permission_classes=(IsAuthenticated,)
   
    def post(self,request):
        print(request.data)
        org=Organization.objects.all()[0]
        user=User.objects.get(id=request.user.id)
        emp = Employee.objects.get(user=user)
        reciver = Employee.objects.get(employee_name=request.data['reciver'])
        if receiver:
            chat = Chat.objects.create(org=org,sender=emp,reciver=reciver,message=request.data['message'])
            print('message created')
            return Response({'status':'success','status_code':200})
        return Response({'status':'success'})        

class ListMessage(APIView):
    authentication_classes=(TokenAuthentication,SessionAuthentication,)
    permission_classes=(IsAuthenticated,)
   
    def get(self,request,pk):
        chat = Chat.objects.filter(reciver__id=pk).all()
        serializer = ListViewSerializer(chat,many=True)
        
        return Response(serializer.data,status=status.HTTP_200_OK)
class ForwardMessage(APIView):
    authentication_classes=(TokenAuthentication,SessionAuthentication,)
    permission_classes=(IsAuthenticated,)
    
    def post(self,request):
        
        message = request.data['message']
        to= request.data['to']
        sender = User.objects.get(id=request.user.id)
        print(request.data)
        emp = Employee.objects.get(user=sender)
        to=Employee.objects.get(id=to)
        print(to)
    
        org = Organization.objects.all()[0]
        print(org)
        if message and to:
            chat = Chat.objects.create(org=org,sender=emp,reciver=to,message=message)
            return Response({'status':'success','status_code':200})
        return Response({'status':'success'})

class getAllEmployees(APIView):
    authentication_classes=(TokenAuthentication,SessionAuthentication,)
    permission_classes=(IsAuthenticated,)
   
    def get(self,request):
        
        emp = Employee.objects.exclude(user=request.user).all()
        serializer = EmployeeSerializer(emp,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

