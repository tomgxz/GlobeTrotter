from django.db import models
#from django.contrib.auth.models import User

class Location(models.Model):

    title = models.CharField("Title of the Location (usually the local name)",max_length=60)
    subtitle = models.CharField("Subtitle of the Location (usually the location)",max_length=60)
    urlname = models.CharField("The unique URL for the location",max_length=100,unique=True)

    coverimage = models.CharField("Static URL of the cover image",max_length=250)

    hidden = models.BooleanField("Hidden",default=False)

    created = models.DateTimeField(auto_now_add=True,editable=False)
    updated = models.DateTimeField(auto_now=True,editable=False)

    def __str__(self): return f"{self.title}"
