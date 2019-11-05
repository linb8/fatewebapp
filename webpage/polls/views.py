from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from django.http import JsonResponse
import os
import json

import sys
sys.path.insert(0, '../src')
from extraction import *

dir_path = os.path.dirname(os.path.realpath(__file__))

# List of algorithms
listOfStrings = ['0g', '0gf', '0gfp', '01g', '01gf', '01gfp','05g', '05gf', '05gfp', '09g', '09gf',
                 '09gfp','p','pp','r','rp','t','tp']


def home(request):
    #return HttpResponse(dir_path)
    return render(request, "home.html")

def main(request):
    return render(request, "fate.html")

def end(request):
    return render(request,"end.html")

def handle(request, query):
    if query in listOfStrings:
        result = extractFromFile(query + ".txt", 5)
    else:
        result = {}
    return JsonResponse(result)
