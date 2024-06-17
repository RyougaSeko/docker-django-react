from rest_framework import serializers
from .models import Item


# モデル操作を行うためのシリアライザ
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'
