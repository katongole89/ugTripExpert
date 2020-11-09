from django.shortcuts import render, redirect
from rest_framework.response import Response
import json
import requests
from django.conf import settings
from .models import customUser

from django.contrib.auth import authenticate, login as dj_login, logout, update_session_auth_hash
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework import status
from .serializers import registrationSerializer
from django.contrib import messages

# Create your views here.
class registerAuth(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
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
                "status": "success"
                }
            return JsonResponse(data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def alreadyExist(request):
    messages.add_message(request, messages.INFO, 'this email has already been used in another login approach', extra_tags='alreadyUsed')
    return redirect('/gis/login/')