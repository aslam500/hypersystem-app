from .models import *
from rest_framework import serializers
class ListViewSerializer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField()
    reciver = serializers.StringRelatedField()
    org = serializers.StringRelatedField()
    class Meta:
        model=Chat
        fields="__all__"

class EmployeeSerializer(serializers.ModelSerializer):
    user= serializers.StringRelatedField()
    class Meta:
        model=Employee
        fields="__all__"