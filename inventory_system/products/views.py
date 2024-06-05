# products/views.py
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Products, Variant, SubVariant
from .serializers import ProductSerializer, VariantSerializer, SubVariantSerializer
from django.shortcuts import get_object_or_404
from rest_framework.renderers import JSONRenderer
from rest_framework.generics import ListAPIView
import logging

logger = logging.getLogger(__name__)

logger = logging.getLogger(__name__)

class CreateProductAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            serializer = ProductSerializer(data=request.data)
            print("Request data:", request.data)  # Inspect the request data

            if serializer.is_valid():
                product = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                error_message = "Error creating product: {}".format(serializer.errors)
                return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.exception("Error creating product: {}".format(str(e)))
            error_message = "Error creating product: Internal Server Error"
            return Response({"error": error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListProductAPIView(ListAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer
    renderer_classes = [JSONRenderer]

class AddStockAPIView(APIView):
    def post(self, request, product_id, subvariant_id, *args, **kwargs):
        subvariant = get_object_or_404(SubVariant, id=subvariant_id, variant__product__id=product_id)
        amount = request.data.get('amount', 0)

        try:
            amount = float(amount)
        except ValueError:
            return Response({"error": "Invalid amount"}, status=status.HTTP_400_BAD_REQUEST)

        subvariant.stock += amount
        subvariant.save()
        return Response(SubVariantSerializer(subvariant).data, status=status.HTTP_200_OK)

class RemoveStockAPIView(APIView):
    def post(self, request, product_id, subvariant_id, *args, **kwargs):
        subvariant = get_object_or_404(SubVariant, id=subvariant_id, variant__product__id=product_id)
        amount = request.data.get('amount', 0)

        try:
            amount = float(amount)
        except ValueError:
            return Response({"error": "Invalid amount"}, status=status.HTTP_400_BAD_REQUEST)

        if subvariant.stock < amount:
            return Response({"error": "Insufficient stock"}, status=status.HTTP_400_BAD_REQUEST)

        subvariant.stock -= amount
        subvariant.save()
        return Response(SubVariantSerializer(subvariant).data, status=status.HTTP_200_OK)
