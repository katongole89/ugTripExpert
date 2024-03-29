from django.db import models

# Create your models here.
class attractions(models.Model):
    name= models.CharField(max_length= 200, blank=False)
    placeType = models.CharField(max_length= 200, default='')

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

class favouritePlaces(models.Model):
    name= models.CharField(max_length= 200, blank=False)
    email = models.CharField(max_length= 200, blank=False)
    place_id = models.CharField(max_length= 200, blank=False)
    formatted_address = models.CharField(max_length= 200, blank=True)
    rating = models.CharField(max_length= 200, blank=True)
    business_status = models.CharField(max_length= 200, blank=True)
    lat = models.CharField(max_length= 200, blank=False)
    lng = models.CharField(max_length= 200, blank=False)

    def __str__(self):
        return self.email + '--'+ self.name

class favouriteTypes(models.Model):
    placeType = models.CharField(max_length= 200, blank=True)
    place = models.ForeignKey(favouritePlaces, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.place.email + '--'+ self.placeType

class forestsDetailed(models.Model):
    name= models.CharField(max_length= 200, blank=False)
    contactInfo= models.TextField(blank=True)
    areaCoverage= models.TextField(blank=True)
    attractions= models.TextField(blank=True)
    accomodation= models.TextField(blank=True)
    accessibility= models.TextField(blank=True)
    activities= models.TextField(blank=True)
    def __str__(self):
        return self.name 
        
class forestsImages(models.Model):
    forest = models.ForeignKey(forestsDetailed, on_delete=models.CASCADE)
    image = models.ImageField(verbose_name='forest image', blank= False)
    def __str__(self):
        return self.forest.name 
    