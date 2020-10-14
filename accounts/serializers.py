from rest_framework import serializers
from .models import customUser

class registrationSerializer(serializers.Serializer):
    email = serializers.CharField(max_length= 50)
    firstName = serializers.CharField(max_length= 50)
    lastName = serializers.CharField(max_length= 50)
    password = serializers.CharField(max_length=200)
       
    extra_kwargs = {
        'password': {'write_only': True}
        }

    def save(self):
        account = customUser(
            email = self.validated_data['email'],
            firstName= self.validated_data['firstName'],
            lastName = self.validated_data['lastName'],   
        )
        password = self.validated_data['password']
        account.set_password(password)
        account.save()
        return account
