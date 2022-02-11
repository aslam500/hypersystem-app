from django.db import models
from django.contrib.auth.models import User
class Organization(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='organization')
    organization = models.CharField(max_length=200, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    

    class Meta:
        ordering=("organization",)
    def __str__(self):
        return self.organization


class Employee(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,null=True,blank=True)
    employee_name= models.CharField(max_length=100,null=True)

    def __str__(self):
        return self.employee_name    

class Chat(models.Model):
    org=models.ForeignKey(Organization,on_delete=models.CASCADE)
    sender = models.ForeignKey(Employee,on_delete=models.CASCADE,related_name="sender")
    reciver = models.ForeignKey(Employee,on_delete=models.CASCADE,related_name="reciver")
    message = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.sender.employee_name
        