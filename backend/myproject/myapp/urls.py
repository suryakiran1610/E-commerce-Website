from django.urls import path
from . import views

urlpatterns=[
    path('register/',views.Register,name="register"),
    path('otpverify/',views.Otpverify,name='otpverify'),
    path('updatepassword/<int:pk>',views.Updatepassword,name='updatepassword'),
    path('login/',views.Loginview,name="login"),
    path('addproduct/',views.Addproduct,name="addproduct"),
    path('productlist/',views.Productlist,name="productlist"),
    path('productimage/',views.Productimage,name="productimage"),
    path('productdetails/<int:pk>',views.Productdetails,name='productdetails'),
    path('productimagedetails/<int:pk>',views.Productimagedetails,name='productimagedetails'),
    path('profileupdate/<int:pk>',views.Profileupdate,name="profileupdate"),
    path('reviewadd/',views.Reviewadd,name='reviewadd'),
    path('review/<int:pk>',views.Review,name="review"),
    path('reviewdelete/<int:pk>',views.Reviewdelete,name='reviewdelete'),
    path('users/',views.Users,name="users"),
    path('userlist/',views.Userlist,name='userlist'),
    path('userlistdelete/<int:pk>',views.Userlistdelete,name='userlistdelete'),
    path('cart/',views.Cart,name='cart'),
    path('cartvalues/',views.Cartvalues,name='cartvalues'),
    path('cartupdate/<int:pk>',views.Cartupdate,name='cartupdate'),
    path('checkout/',views.Checkout,name='checkout'),
    path('checkaddress/<int:pk>',views.Checkaddress,name='checkaddress'),
    path('orderlists/',views.Orderlists,name='orderlists'),
    path('getallorders/',views.Getallorders,name='getallorders'),

    
]