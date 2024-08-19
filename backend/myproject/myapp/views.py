from .models import user
from .models import product
from .models import product_image
from .models import product_review
from .models import cart
from .models import checkout
from .serializers import userserializer
from .serializers import productserializer
from .serializers import productimgserializer
from .serializers import productreviewserializer
from .serializers import cartserializer
from .serializers import checkoutserializer
from django.core.mail import send_mail
import random

import json
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404
from django.shortcuts import get_list_or_404
from django.shortcuts import get_list_or_404







@api_view(['POST'])
def Register(request):
    serializer=userserializer(data=request.data)
    if serializer.is_valid():
        username=serializer.validated_data.get('username')
        email=serializer.validated_data.get('email')
        phone=serializer.validated_data.get('phone')
        password=serializer.validated_data.get('password')
        otp = ''.join(random.choices('0123456789', k=6)) 
        image = request.FILES.get('userimage')
        sendemail(email, otp)
        userdata=user.objects.create_user(username=username,email=email,phone=phone,password=password,user_otp=otp,user_image=image)
        response_serializer = userserializer(userdata)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
    else:
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
def sendemail(email, otp):
    subject = "Your One-Time Password (OTP)"
    message = f"Your OTP is {otp}. Please use this OTP to verify your email. ⚠️⚠️Donot share OTP with anyone⚠️⚠️" 
    sender = "suryakiran1616@gmail.com"
    send_mail(subject, message, sender, [email])


@api_view(['POST'])
def Otpverify(request): 
    otp_entered = request.data.get('otp') 
    user_id = request.data.get('userid') 

    user_with_otp = user.objects.filter(id=user_id,user_otp=otp_entered).first()

    if user_with_otp:
        user_with_otp.user_otp = None
        user_with_otp.save()
        return Response({'message':'otp is verified'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)
 
@api_view(['PATCH'])
def Updatepassword(request,pk):
    user1=get_object_or_404(user,id=pk)
    serializer = userserializer(user1, data=request.data, partial=True)
    if serializer.is_valid():
            user1.set_password(request.data.get('password1'))
            user1.save()
            return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def Loginview(request):
    username=request.data['username']
    password=request.data['password']

    user=authenticate(username=username,password=password)
    if not user:
        user=authenticate(email=username,password=password)
    if not user:
        user=authenticate(phone=username,password=password)

    if user:
        refresh=RefreshToken.for_user(user)
        refresh.payload["superuser"]=user.is_superuser
        refresh.payload["username"] = user.username 
        return Response({"token":str(refresh.access_token)})
    else:
        return Response({"error":"Invalid Credentials"})
    

@api_view(['POST'])
def Addproduct(request):
        serializer=productserializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            category=serializer.validated_data.get('category')
            subcategory=serializer.validated_data.get('subcategory')
            name=serializer.validated_data.get('name')
            price=serializer.validated_data.get('price')
            description=serializer.validated_data.get('description')
            product1=product.objects.create(category=category,subcategory=subcategory,name=name,price=price,description=description)

            images = request.FILES.getlist('image')
            for image in images:
                product_images=product_image.objects.create(image=image,productid=product1)
            response_serializer = productserializer(product1)

            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Serializer errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['GET'])
def Productlist(request):
    searches = request.query_params.get('searchdata')
    if searches:
        search=product.objects.filter(category=searches) | product.objects.filter(subcategory=searches) | product.objects.filter(name=searches)
        serializer=productserializer(search,many=True)
    else:    
        products=product.objects.all()
        serializer=productserializer(products,many=True)
    return Response(serializer.data)    


@api_view(['GET'])
def Productimage(request):
    images=product_image.objects.all()
    serializer=productimgserializer(images,many=True)
    return Response(serializer.data)

    
@api_view(['GET','PATCH','DELETE'])
def Productdetails(request,pk):
    products=get_object_or_404(product,id=pk)

    if request.method=="GET":
        serializer=productserializer(products)
        return Response(serializer.data)
    
    elif request.method == "PATCH":
        serializer = productserializer(products, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        products.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    
@api_view(['GET','PATCH'])
def Productimagedetails(request,pk):
    productimages=get_list_or_404(product_image,productid=pk)

    if request.method=="GET":
        serializer=productimgserializer(productimages,many=True)
        return Response(serializer.data)
    
    elif request.method == "PATCH":
        for image in productimages:
            serializer = productimgserializer(image, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        

@api_view(['GET','PATCH'])
def Profileupdate(request,pk):
    userprofile=get_object_or_404(user,id=pk)

    if request.method=="GET":
        serializer=userserializer(userprofile)
        return Response(serializer.data)
    
    elif request.method == "PATCH":
        serializer = userserializer(userprofile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])    
def Reviewadd(request):
    serializer=productreviewserializer(data=request.data)
    print(request.data)
    if serializer.is_valid():
        review=serializer.validated_data.get('review')
        rating=serializer.validated_data.get('rating')
        userid=serializer.validated_data.get('userid')
        productid=request.data.get('productid')
        reviews=product_review.objects.create(review=review,rating=rating,userid=userid,products_id=productid)
        response_serializer = productreviewserializer(reviews)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
    else:
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def Review(request,pk):
    userreview=get_list_or_404(product_review,products_id=pk)

    if request.method=="GET":
        serializer=productreviewserializer(userreview,many=True)
        return Response(serializer.data)

@api_view(['DELETE'])
def Reviewdelete(request,pk):
    userreview = get_object_or_404(product_review, id=pk)
    userreview.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def Users(request):
    users=user.objects.all()
    serializer=userserializer(users,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def Userlist(request):
    users=user.objects.filter(is_superuser=False)
    serializer=userserializer(users,many=True)
    return Response(serializer.data)    

@api_view(['DELETE'])
def Userlistdelete(request,pk):
    users=get_object_or_404(user,id=pk)
    users.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)    



@api_view(['POST'])
def Cart(request):
    serializer=cartserializer(data=request.data)
    if serializer.is_valid():
        product =serializer.validated_data.get('product')
        list_user=serializer.validated_data.get('list_user')
        productname=serializer.validated_data.get('productname')
        productprice=serializer.validated_data.get('productprice')
        carts=cart.objects.create(product=product,list_user=list_user,productname=productname,productprice=productprice)
        response_serializer = cartserializer(carts)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
    else:
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def Cartvalues(request):
    cartvalues = request.query_params.get('userId')
    if cartvalues:
        cartvalue=cart.objects.filter(list_user=cartvalues)
        serializer=cartserializer(cartvalue,many=True)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH','DELETE'])
def Cartupdate(request,pk):
    cartid=get_object_or_404(cart,id=pk)
    if request.method=='PATCH':
        serializer = cartserializer(cartid, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method=='DELETE':
        cartid.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def Checkout(request):
    user_id = request.data.get('userid')
    products_str = request.data.get('products')
    
    products = json.loads(products_str)
    
    user_instance = user.objects.get(id=user_id)
    
    checkouts = []
    for product in products:
        product_name = product.get('productname')
        product_quantity = product.get('productquantity')
        product_total = product.get('producttotal')
        
        
        checkout1 = checkout.objects.create(
            product_name=product_name,
            product_quantity=product_quantity,
            product_total=product_total,
            user_id=user_instance,
        )
        checkouts.append(checkout1)
        cart.objects.filter(list_user=user_id).delete()
    
    response_serializer = checkoutserializer(checkouts, many=True)
    return Response(response_serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PATCH'])
def Checkaddress(request, pk):
    print(request.data)
    checkout_instances = get_list_or_404(checkout, user_id=pk)
    shipingaddress = request.data.get('address') 

    for checkout_instance in checkout_instances:
        checkout_instance.shipingaddress = shipingaddress
        checkout_instance.save()

    serializer = checkoutserializer(checkout_instances, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def Orderlists(request):
    orderlist = request.query_params.get('userId')
    if orderlist:
        orders=checkout.objects.filter(user_id=orderlist)
        serializer=checkoutserializer(orders,many=True)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def Getallorders(request):
    orderlists=checkout.objects.all()
    serializer=checkoutserializer(orderlists,many=True)
    return Response(serializer.data)    

