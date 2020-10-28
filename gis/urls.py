"""ugTripExpert URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
#from django.contrib import admin
from django.urls import path, re_path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

app_name= 'gis'

urlpatterns = [
    #path('admin/', admin.site.urls),
    path('addPlaces/', views.addPlaces.as_view(), name = 'addPlaces'),
    path('touristAttractions/', views.touristAttractions, name = 'touristAttractions'),
    path('login/', views.login, name = 'login'),
    path('logout/', views._logout, name = 'logout'),
    path('register/', views.register, name = 'register'),
    path('loginAuth/', views.loginAuth, name = 'loginAuth'),
    path('touristPlaces/', views.touristPlaces.as_view(), name = 'touristPlaces'),
    path('allPlacesInDb/', views.allPlacesInDb.as_view(), name = 'allPlacesInDb'),
    path('makeFavourite/<slug:placeId>/', views.makeFavourite.as_view(), name = 'makeFavourite'),
    path('fetchKey/', views.fetchKey.as_view(), name = 'fetchKey'),
    path('placesAround/<slug:placeId>/',views.placesAround, name='placesAround'),
    path('nearByPlaces/<slug:placeId>/',views.nearByPlaces.as_view(), name='nearByPlaces'),
    path('favourites/<slug:id>/', views.favourites, name = 'favourites'),
    path('fetchFavourite/<slug:id>/',views.fetchFavourite.as_view(), name='fetchFavourite'),
    path('removeFav/<slug:id>/',views.removeFav.as_view(), name='removeFav'),
    path('home/', views.home, name = 'home'),
    path('allForests/',views.allForests.as_view(), name='allForests'),
    re_path(r'^reserveDetailed/(?P<id>[0-9]+)/$', views.reserveDetailed, name='reserveDetailed' ),
    

]
urlpatterns= format_suffix_patterns(urlpatterns)
