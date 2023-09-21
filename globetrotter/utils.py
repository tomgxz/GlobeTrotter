from django.shortcuts import render as _render
from django.shortcuts import redirect as _redirect

def getReferrer(request):
    try: return request.session["referrer"]
    except KeyError: return None

def setReferrer(request,referrer):
    request.session["referrer"] = referrer

def render(request,path,options={},*a,referrer="",**k):
    if referrer not in [None,""]: setReferrer(request,referrer)
    return _render(request,path,options,*a,*k)

def redirect(request,to,*a,referrer="",**k):
    if referrer not in [None,""]: setReferrer(request,referrer)
    return _redirect(to,*a,*k)