from django.contrib import admin
from .models import attractions, places, keys,favouritePlaces, favouriteTypes

# Register your models here.
admin.site.register(attractions)
admin.site.register(places)
admin.site.register(keys)
admin.site.register(favouriteTypes)
admin.site.register(favouritePlaces)
