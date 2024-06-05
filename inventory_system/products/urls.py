# products/urls.py
from django.urls import path
from .views import CreateProductAPIView, ListProductAPIView, AddStockAPIView, RemoveStockAPIView

urlpatterns = [
    path('products/', CreateProductAPIView.as_view(), name='create-product'),
    path('products/list/', ListProductAPIView.as_view(), name='list-products'),
    path('products/<uuid:product_id>/add-stock/<uuid:subvariant_id>/', AddStockAPIView.as_view(), name='add-stock'),
    path('products/<uuid:product_id>/remove-stock/<uuid:subvariant_id>/', RemoveStockAPIView.as_view(), name='remove-stock'),
]
