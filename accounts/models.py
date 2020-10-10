from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.conf import settings
#SSSSfrom django.db.models.signals import post_save
#from django.dispatch import receiver
#from rest_framework.authtoken.models import Token

# Create your models here.
class MyAccountManager(BaseUserManager):
    def create_user(self, email, password = None):
        if not email:
            raise ValueError("Users must have an email")

        user = self.model(
            email = email,
        )
        user.set_password(password)
        user.save(using = self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(
            email = email,
            password = password,

        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class customUser(AbstractBaseUser):
    email = models.EmailField(max_length=50, unique=True)
    date_joined = models.DateTimeField(verbose_name= 'date joined', auto_now_add= True)
    firstName = models.CharField(verbose_name= 'first name', max_length=50, default= '')
    lastName = models.CharField(verbose_name= 'last name', max_length=50 , default= '')
    #last_login = models.DateTimeField(verbose_name= 'last login', auto_now= True)
    #accountBalance = models.CharField(verbose_name= 'account balance', default= '0', max_length= 700)
    is_verified = models.BooleanField(default= False)
    is_admin = models.BooleanField(default= False)
    is_active = models.BooleanField(default= True)
    is_staff = models.BooleanField(default= False)
    is_superuser = models.BooleanField(default= False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = MyAccountManager()

    def __str__(self):
        return self.email + '--'+ str(self.date_joined)

    def has_perm(self, perm, obj= None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

