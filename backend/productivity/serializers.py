from rest_framework import serializers
from .models import Todo, Flashcard

class TodoSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='pk', read_only=True)
    class Meta:
        model = Todo
        fields = ('id','user_id','title','description','completed','due_date','created_at','updated_at')
        read_only_fields = ('created_at','updated_at','user_id')

class FlashcardSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='pk', read_only=True)
    class Meta:
        model = Flashcard
        fields = ('id','user_id','front','back','tags','next_review','interval_days','easiness','repetitions','created_at','updated_at')
        read_only_fields = ('created_at','updated_at','user_id','next_review','interval_days','easiness','repetitions')
