from email import message
from unittest import TestCase

from django.dispatch import receiver

from .models import Employee, Organization,Chat
from django.contrib.auth.models import User
# Project create test
class ProjectTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="aslamkhan",password="1gg14ec008")
        self.orgnization = Organization.objects.create(user=self.user,organization="aslamkhan",name="aslamkhan")
        self.user1=User.objects.create_user(username="testUser",password="1gg14ec008")
        self.user2=User.objects.create_user(username="testUser2",password="1gg14ec008")
        self.emp1 = Employee.objects.create(user=self.user1,employee_name="testUser")
        self.emp2 = Employee.objects.create(user=self.user2,employee_name="testUser2")
        self.chat1= Chat.objects.create(org=self.orgnization,sender=self.emp1,reciver=self.emp2,message="Hello")
        self.chat2= Chat.objects.create(org=self.orgnization,sender=self.emp2,reciver=self.emp1,message="Hai")
    def test_employee(self):
        self.assertEqual(self.emp1.employee_name,'testUser')
        self.assertEqual(self.emp2.employee_name,"testUser2")
    def test_chat(self):
        self.assertEqual(self.chat1.message,"Hello")
        self.assertEqual(self.chat2.message,"Hai")
    def tearDown(self):
        self.user.delete()
        self.orgnization.delete()
        self.user1.delete()
        self.user2.delete()
        self.emp1.delete()
        self.emp2.delete()
        self.chat1.delete()
        self.chat2.delete()

