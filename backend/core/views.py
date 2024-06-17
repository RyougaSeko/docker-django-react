from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Item
from .serializers import ItemSerializer
from rest_framework.response import Response


# Create your views here.
class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def list(self, request, *args, **kwargs):
        # GETメソッドの処理を追加
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        # 追加の処理をここに書く
        # 例: ログを記録するなど
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        # POSTメソッドの処理を追加
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        # 追加の処理をここに書く
        # 例: メールを送信するなど
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
