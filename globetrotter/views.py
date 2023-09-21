from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth import login as _login
from django.contrib.auth import logout as _logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core.files.storage import FileSystemStorage
from django.http import Http404,HttpResponse
from django.shortcuts import get_object_or_404,redirect
from django.templatetags.static import static

import json

from .localsettings import APP_NAME
from .models import Location
from .utils import render,redirect

def index(request):
    return render(request,"index.html",{},referrer=f"{APP_NAME}:index")

def getlocations(request):
    pages = []

    for loc in Location.objects.filter(hidden=False):
        pages.append({
            "id":loc.urlname,
            "title":loc.title,
            "subtitle":loc.subtitle,
            "image":static(loc.coverimage)
        })

    return HttpResponse(json.dumps({"pages":pages}))



