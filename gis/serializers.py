from rest_framework import serializers
from .models import places

class placesSerializer(serializers.ModelSerializer):

    class Meta:
        model = places
        fields = '__all__'