from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('main/', views.main, name='main'),
    path('end/', views.end, name='end'),
    path('<str:query>/results/', views.handle, name='handle'),

]