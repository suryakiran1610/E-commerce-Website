from django.db import models
from django.contrib.auth.models import AbstractUser


class user(AbstractUser):
    phone=models.CharField(max_length=15,null=True,blank=True)
    user_image=models.ImageField(upload_to='profile_image/',null=True,blank=True)
    user_otp=models.IntegerField(null=True,blank=True)


class product(models.Model):
    category=models.CharField(max_length=100)
    subcategory=models.CharField(max_length=100)
    name=models.CharField(max_length=100)
    price=models.IntegerField()
    description=models.CharField(max_length=100)
    userid=models.ForeignKey(user,on_delete=models.CASCADE,null=True,blank=True)

class product_image(models.Model):
    image=models.ImageField(upload_to='product_image/',null=True,blank=True)  
    productid=models.ForeignKey(product,related_name='images',on_delete=models.CASCADE,null=True,blank=True) 


class product_review(models.Model):
    review=models.CharField(max_length=100)
    rating=models.IntegerField(null=True,blank=True)
    userid=models.ForeignKey(user,on_delete=models.CASCADE,null=True,blank=True)
    created_at = models.DateField(auto_now_add=True,null=True,blank=True)
    products_id=models.IntegerField(null=True,blank=True)
    
class cart(models.Model):
    proquantity = models.IntegerField(default=1,null=True,blank=True)
    product= models.ForeignKey(product, on_delete=models.CASCADE,null=True,blank=True)
    productname=models.CharField(max_length=100,null=True,blank=True)
    productprice=models.IntegerField(null=True,blank=True)
    list_user=models.ForeignKey(user,on_delete=models.CASCADE,null=True,blank=True)

class checkout(models.Model):
    product_name=models.CharField(max_length=100)
    product_quantity=models.IntegerField()
    product_total=models.IntegerField()
    shipingaddress=models.CharField(max_length=200)
    user_id=models.ForeignKey(user,on_delete=models.CASCADE,null=True,blank=True)