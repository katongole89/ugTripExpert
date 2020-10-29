from django.shortcuts import render, redirect
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework import status
from .models import attractions, places, keys, favouritePlaces, favouriteTypes,forestsImages, forestsDetailed
from .serializers import placesSerializer
#from rest_framework.authtoken.models import Token
#from rest_framework.authentication import TokenAuthentication
#from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import json
import requests
from django.conf import settings

from django.contrib.auth import authenticate, login as dj_login, logout, update_session_auth_hash
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from accounts.models import customUser
from django.contrib.auth.decorators import login_required
import time

# Create your views here.

class addPlaces(APIView):
    def get(self, request):
        #get all attractions
        getTouristAttractions = attractions.objects.all()

        getApiKey = keys.objects.filter(is_active = True)
        if not getApiKey:
            apiKey ="AIzaSyAXwPg_sSDRooMUKf21QjRnQR5f8sw8fpY"
        for k in getApiKey:
            apiKey = k.apiKey

        for tourTerm in getTouristAttractions:
            nameTerm = tourTerm.name
            if " " in nameTerm:
                nameTerm = nameTerm.replace(" ", "+")
            
            
            url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+ nameTerm +"+in+uganda&key="+ apiKey

            r = requests.get(url)

            placesData = r.json()
            #next page token
            #nextPageToken = placesData['next_page_token']
            allPlaces = []
            dataToAppend = {
                'placeType': tourTerm.placeType,
                'placeList': placesData['results']
            }
            allPlaces.append(dataToAppend)
            if 'next_page_token' in placesData:
                nextPageToken = placesData['next_page_token']
                time.sleep(5)
            else:
                nextPageToken = None
            count = 0
            while nextPageToken != None:
                url = "https://maps.googleapis.com/maps/api/place/textsearch/json?key="+apiKey+"&pagetoken="+ nextPageToken
                print(url)

                r = requests.get(url)
                placesData = r.json()
                #placesData = json.loads(placesData)
                print(placesData)
                dataToAppend = {
                    'placeType': tourTerm.placeType,
                    'placeList': placesData['results']
                    }
                
                #placesData = json.loads(placesData)
                allPlaces.append(dataToAppend)

                if 'next_page_token' in placesData:
                    nextPageToken = placesData['next_page_token']
                    time.sleep(5)
                    
                else:
                    nextPageToken = None
                    print(nextPageToken)
                count+=1
                print("--count--")
                print(nameTerm)
                print(count)
            

            
            #before saving
            #eliminate tours and travels
            #eliminate same name
            for resultBatch in allPlaces:
                placeType= resultBatch['placeType']
                for place in resultBatch['placeList']:
                    name =  place['name']
                    if "tours and travels" in name or 'ltd' in name :
                        continue
                    #check existance
                    checkName = places.objects.filter(name = name)
                    if checkName:
                        continue
                    place_id = place['place_id']
                    formatted_address = place['formatted_address']
                    #rating = place['rating']
                    if 'rating' in place:
                        rating = place['rating']
                    else:
                        rating = '' 
                    if 'business_status' in place:
                        business_status = place['business_status']
                    else:
                        business_status = ''                    
                    lat = place['geometry']['location']['lat']
                    lng = place['geometry']['location']['lng']
                    icon = place['icon']
                    addPlace = places(name = name, place_id = place_id, formatted_address = formatted_address, rating = rating, business_status = business_status, lat = lat, lng =lng,icon = icon, placeType = placeType)
                    addPlace.save()


        data = {
            'detail': 'success'
        }
        return JsonResponse(data)


class touristPlaces(APIView):
    def get(self, request):
        getAttractions = places.objects.filter(placeType= 'forest_reserve')
        if getAttractions:
            serializer = placesSerializer(getAttractions, many=True)
            return Response(serializer.data, status= status.HTTP_200_OK)
        data = {
            'detail': 'no places are registered yet'
        }
        return JsonResponse(data, status = status.HTTP_200_OK)

class allPlacesInDb(APIView):
    def get(self, request):
        getAttractions = places.objects.all()
        if getAttractions:
            serializer = placesSerializer(getAttractions, many=True)
            return Response(serializer.data, status= status.HTTP_200_OK)
        data = {
            'detail': 'no places are registered yet'
        }
        return JsonResponse(data, status = status.HTTP_200_OK)


@login_required(login_url= '/gis/login/')
def touristAttractions(request):
    email = request.session.get('email')
    getId = customUser.objects.get(email=email).id
    context ={
        'email': email,
        'id': getId
    }
    return render(request, 'gis/index2.html', context)

def detailPlace(request, placeId):
    getPlace = places.objects.get(place_id = placeId)
    context = {
        'getPlace': getPlace
    }
    return render(request, 'gis/placeDetail1.html', context)

class nearByPlaces(APIView):
    def get(self, request, placeId):
        getApiKey = keys.objects.filter(is_active = True)
        if not getApiKey:
            apiKey ="AIzaSyAXwPg_sSDRooMUKf21QjRnQR5f8sw8fpY"
        for k in getApiKey:
            apiKey = k.apiKey

        getPlace = places.objects.get(place_id = placeId)
        lat = getPlace.lat
        lng = getPlace.lng
        name= getPlace.name
        aroundPlaces = ['restaurant', 'hotel', 'lodging', 'bar', 'car_rental', 'cafe', 'food', 'spa']
        allSpots = []
        for term in aroundPlaces:
            placesInSpots =[]
            url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ lat + ','+lng+ '&radius=20000&type='+ term + '&key='+ apiKey
            r = requests.get(url)
            spots = r.json()
            if spots['results']:
                #placesInSpots.append(spots['results'])
                results = spots['results']
                for venue in results:
                    allSpots.append(venue)

            if 'next_page_token' in spots:
                nextPageToken = spots['next_page_token']
            else:
                nextPageToken = None
            
            while nextPageToken != None:
                url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key="+ apiKey +"&pagetoken="+ nextPageToken

                r = requests.get(url)
                spots = r.json()
                results = spots['results']
                for venue in results:
                    allSpots.append(venue)
            

                if 'next_page_token' in spots:
                    nextPageToken = spots['next_page_token']
                else:
                    nextPageToken = None
        data = {
            'coordinates':[lat, lng],
            'places': allSpots,
            'name': name
        }
        return JsonResponse(data, status = status.HTTP_200_OK)

@login_required(login_url= '/gis/login/')
def placesAround(request, placeId):
    getPlace = places.objects.get(place_id = placeId)
    email = request.session.get('email')
    getId = customUser.objects.get(email= email).id
    getApiKey = keys.objects.filter(is_active = True)
    if not getApiKey:
        apiKey ="AIzaSyAXwPg_sSDRooMUKf21QjRnQR5f8sw8fpY"
    for k in getApiKey:
        apiKey = k.apiKey

    mapsLink = "https://maps.googleapis.com/maps/api/js?key="+ apiKey +"&callback=initMap"


    context = {
        'getPlace': getPlace,
        'email': email,
        'mapsLink': mapsLink,
        'id': str(getId)
    }
    return render(request, 'gis/placeAroundDetail.html',context)

def login(request):
    return render(request, 'gis/login.html')

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def loginAuth(request):
    email = request.data.get("email")
    password = request.data.get("password")
    if email is None or password is None:
        return Response({'error': 'Please provide both email and password'},status= status.HTTP_400_BAD_REQUEST)
    user = authenticate(email= email, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},status= status.HTTP_404_NOT_FOUND)
    
    dj_login(request,user)
    request.session['email']= email
    data = {
        'status': 'success',
        'email': email
    }
    return JsonResponse(data, status = status.HTTP_200_OK)

def register(request):
    return render(request, 'gis/register.html')


class registerAuth(APIView):
    def post(self, request):
        serializer = registrationSerializer(data= request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data['email']
            checkEmail = customUser.objects.filter(email = email)
            if checkEmail:
                data ={
                    'status': 'failed',
                    'detail': 'email already exists to another account'
                    }
                return JsonResponse(data, status = status.HTTP_401_UNAUTHORIZED)
            account = serializer.save()
            
            data = {
                "status": "success",
                }
            return JsonResponse(data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



def _logout(request):
    logout(request)
    return redirect('/gis/login/')

class fetchKey(APIView):
    def get(self, request):
        getApiKey = keys.objects.filter(is_active = True)
        if not getApiKey:
            apiKey ="AIzaSyAXwPg_sSDRooMUKf21QjRnQR5f8sw8fpY"
        for k in getApiKey:
            apiKey = k.apiKey
        
        data = {
            'key': apiKey
        }
        return JsonResponse(data, status = status.HTTP_200_OK)

def welcome(request):
    return render(request, 'gis/welcome.html')

class makeFavourite(APIView):
    def get(self, request, placeId):
        email = request.session.get('email')
        #showId = customUser.objects.get(email=email)
        #print(showId.id)
        #email = 'katongolerichard089@gmail.com'


        #check if ts already among favourites
        checkPlace = favouritePlaces.objects.filter(place_id= placeId, email = email)
        if checkPlace:
            data = {
                'details': 'place is already favourite'
            }
            return JsonResponse(data, status = status.HTTP_200_OK)

        fields ='name,rating,vicinity,geometry,formatted_address,business_status,type,place_id'
        getApiKey = keys.objects.filter(is_active = True)
        if not getApiKey:
            apiKey ="AIzaSyAXwPg_sSDRooMUKf21QjRnQR5f8sw8fpY"
        for k in getApiKey:
            apiKey = k.apiKey
        url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id='+ placeId +'&fields='+ fields +'&key='+apiKey
        r = requests.get(url)
        results = r.json()
        placeDetails = results['result']
        lat = placeDetails['geometry']['location']['lat']
        lng = placeDetails['geometry']['location']['lng']
        allTypes = placeDetails['types']

        if not 'business_status' in placeDetails :
            business_status = 'OPERATIONAL'
        else:
            business_status = placeDetails['business_status']

        if not 'rating' in placeDetails :
            rating = '0'
        else:
            rating = placeDetails['rating']

        savePlace = favouritePlaces(name= placeDetails['name'], email= email, place_id=placeDetails['place_id'],formatted_address=placeDetails['formatted_address'], rating=rating, business_status= business_status, lat=lat, lng=lng)
        savePlace.save()

        getPlace = favouritePlaces.objects.get(place_id= placeDetails['place_id'], email = email)

        for placeType in allTypes:
            addType = favouriteTypes(placeType= placeType, place= getPlace)
            addType.save()

        data ={
            'status': 'success',
            'detail': 'place added to favourites'
        }
        return JsonResponse(data, status= status.HTTP_200_OK)
        
@login_required(login_url= '/gis/login/')
def favourites(request, id):
    email = request.session.get('email')
    
    context = {
        'email':email,
        'id': id
    }

    return render(request, 'gis/fav.html', context)

class fetchFavourite(APIView):
    def get(self, request, id):
        id =int(id)
        getPerson = customUser.objects.get(id = id)
        queryEmail = getPerson.email
        getFavs = favouritePlaces.objects.filter(email= queryEmail)
        if not getFavs:
            data = {
                'detail': 'no favs',
                'favs':[]
            }
            return JsonResponse(data, status = status.HTTP_200_OK)
        allFavs = []
        for fav in getFavs:
            placeFav =[]
            placeFav.append(fav.name)
            placeFav.append(fav.place_id)
            placeFav.append(fav.formatted_address)
            placeFav.append(fav.rating)
            placeFav.append(fav.business_status)
            placeFav.append(fav.lat)
            placeFav.append(fav.lng)
            getTypes = favouriteTypes.objects.filter(place = fav)
            allTypes = []
            for typ in getTypes:
                allTypes.append(typ.placeType)
            placeFav.append(allTypes)

            placeFav.append(str(fav.id))

            allFavs.append(placeFav)

        data = {
            'favs':allFavs
        }
        return JsonResponse(data, status = status.HTTP_200_OK)

class removeFav(APIView):
    def get(self, request, id):
        getFavPlace = favouritePlaces.objects.filter(id = int(id)).delete()
        data ={
            'detail': 'deleted'
        }
        return JsonResponse(data, status= status.HTTP_200_OK)

@login_required(login_url= '/gis/login/')
def home(request):
    user = request.user
    email = user.email
    request.session['email']= email
    getId = customUser.objects.get(email=email).id
    context = {
        'email': email,
        'id': getId
    }
    return render(request, 'gis/home.html', context)

class allForests(APIView):
    def get(self, request):
        getForests = forestsDetailed.objects.all()
        forestsInDb = []
        for forest in getForests:
            forestDets = []
            forestDets.append(forest.id)
            forestDets.append(forest.name)

            getImages = forestsImages.objects.filter(forest= forest)
            if getImages:
                allImages = []
                for image in getImages:
                    allImages.append(image.image.url)
            else:
                allImages = []
            forestDets.append(allImages)
            forestsInDb.append(forestDets)
        
        data = {
            'forests': forestsInDb
        }
        return JsonResponse(data, status = status.HTTP_200_OK)

@login_required(login_url= '/gis/login/')
def reserveDetailed(request, id):
    email = request.session.get('email')
    getId = customUser.objects.get(email=email).id
    getReserve = forestsDetailed.objects.get(id = id)
    #get photos
    getPhotos = forestsImages.objects.filter(forest= getReserve)
    photos = []
    for img in getPhotos:
        photos.append(img.image.url)
    context ={
        'id': getId,
        'email': email,
        'reserve': getReserve,
        'photos': photos
    }
    return render(request, 'gis/reserveDetailed.html', context)
        