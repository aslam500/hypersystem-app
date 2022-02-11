from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import ListViewSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication,TokenAuthentication

# Create your views here.
class UserLogin(APIView):
    

    def post(self, request):
        print(request.data)
        username = request.data['email']
        password = request.data['password']

        user = authenticate(username=username, password=password)
        print(user)
        return Response('data coming',status=status.HTTP_200_OK)

class SendMessage(APIView):
    authentication_classes=(TokenAuthentication,SessionAuthentication,)
    permission_classes=(IsAuthenticated,)
   
    def post(self,request):
        sender = request.data['sender']
        reciver = request.data['reciver']
        message=request.data['message']
        print(request.data)
        return Response({'status':'success'})        

class ListMessage(APIView):
    def get(self,request):
        messages = Chat.objects.all()
        print(messages)
        serializer = ListViewSerializer(messages,many=True)

        return Response(serializer.data,status=status.HTTP_200_OK)
class ForwardMessage(APIView):
    def post(self,request):
        fm = request.data['from']
        to = request.data['to']
        message = request.data['message']
        print(request.data)
        return Response({'status':'success'})