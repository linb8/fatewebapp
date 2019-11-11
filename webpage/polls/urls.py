from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path("demographics/", views.demographics, name="demographics"),
    path('main/', views.main, name='main'),
    path('main/end/<str:num>', views.end, name='end'),
    path('<str:query>/results/', views.handle, name='handle'),

]
