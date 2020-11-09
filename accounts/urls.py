from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

app_name= 'accounts'

urlpatterns = [
    path('registerAuth/', views.registerAuth.as_view(), name = 'registerAuth'),
    path('social/signup/', views.alreadyExist, name = 'alreadyExist'),
    ]
urlpatterns= format_suffix_patterns(urlpatterns)