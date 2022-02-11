from django.urls import path
from .views import *
appname="chat"
urlpatterns=[
    path('send-message/',SendMessage.as_view(),name="send"),
    path('list-messages/',ListMessage.as_view(),name="list"),
    path('forward-message/',ForwardMessage.as_view(),name='forward')

]