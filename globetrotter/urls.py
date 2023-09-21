from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from django.views.static import serve 

from . import views
from .localsettings import APP_NAME as app_name

urlpatterns = [
    path("", views.index, name="index"),
    path("get/locations/", views.getlocations, name="getlocations")
]