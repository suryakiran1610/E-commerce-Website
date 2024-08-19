from django.contrib import admin
from .models import user
from .models import product
from .models import product_image
from .models import product_review



admin.site.register(user)
admin.site.register(product)
admin.site.register(product_image)
admin.site.register(product_review)

