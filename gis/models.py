from django.db import models

# Create your models here.
class attractions(models.Model):
    name= models.CharField(max_length= 200, blank=False)

    def __str__(self):
        return self.name

class places(models.Model):
    name= models.CharField(max_length= 200, blank=False)
    place_id = models.CharField(max_length= 200, blank=False)
    formatted_address = models.CharField(max_length= 200, blank=True)
    rating = models.CharField(max_length= 200, blank=True)
    business_status = models.CharField(max_length= 200, blank=True)
    lat = models.CharField(max_length= 200, blank=True)
    lng = models.CharField(max_length= 200, blank=True)
    icon = models.CharField(max_length= 200, blank=True)
    placeType = models.CharField(max_length= 200, blank=True)

    def __str__(self):
        return self.name + '--'+ self.placeType

class keys(models.Model):
    apiKey = models.CharField(verbose_name= 'api key',max_length= 200)
    is_active = models.BooleanField(default= False)
    def __str__(self):
        return self.apiKey + '--'+ str(self.is_active)