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

    def destroy(self, request, *args, **kwargs):
        print('destroy')
        instance = self.get_object()  # URLのキーパラメータから自動的にオブジェクトを取得する
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)  # partial 引数が True の場合は、部分的な更新になる
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {} # キャッシュをクリア

        return Response(serializer.data)
