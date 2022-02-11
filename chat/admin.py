from django.contrib import admin
from .models import *
# Register your models here.
@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ("organization","name",)

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ("employee_name",)

@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display=("org","sender","reciver","message","date",)
