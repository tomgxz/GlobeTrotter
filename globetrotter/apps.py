from django.apps import AppConfig

from .localsettings import APP_NAME

class globetrotterConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = APP_NAME
