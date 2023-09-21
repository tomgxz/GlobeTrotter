from django.contrib import admin

from .models import Location

class IDView(admin.ModelAdmin): readonly_fields=["id"]

admin.site.register(Location,IDView)