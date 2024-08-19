from rest_framework import serializers
from .models import user
from .models import product
from .models import product_image
from .models import product_review 
from .models import cart
from .models import checkout

class userserializer(serializers.ModelSerializer):
    class Meta:
        model=user
        fields=["username","password","is_superuser","phone","user_image","email","id","user_otp","date_joined"]

 
class productimgserializer(serializers.ModelSerializer):
    class Meta:
        model=product_image
        fields = '__all__'   

class productserializer(serializers.ModelSerializer):
    class Meta:
        model=product
        fields = '__all__' 

class productreviewserializer(serializers.ModelSerializer):
    class Meta:
        model=product_review
        fields='__all__'                 

class cartserializer(serializers.ModelSerializer):
    class Meta:
        model=cart
        fields='__all__'        

class checkoutserializer(serializers.ModelSerializer):
    class Meta:
        model=checkout
        fields='__all__'