from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
import os

dir_path = os.path.dirname(os.path.realpath(__file__))


def home(request):
    #return HttpResponse(dir_path)
    return render(request, "fate.html")
