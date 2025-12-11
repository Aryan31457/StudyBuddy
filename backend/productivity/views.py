from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import timezone
from datetime import timedelta
from .models import Todo, Flashcard
from .serializers import TodoSerializer, FlashcardSerializer

class TodoListCreateView(generics.ListCreateAPIView):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = str(self.request.user.pk)
        qs = Todo.objects.filter(user_id=user_id).order_by('-created_at')
        # optional: filter by query params
        completed = self.request.query_params.get('completed')
        if completed is not None:
            qs = qs.filter(completed=(completed.lower() in ['1','true','yes']))
        return qs

    def perform_create(self, serializer):
        serializer.save(user_id=str(self.request.user.pk))

class TodoDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'pk'

    def get_queryset(self):
        return Todo.objects.filter(user_id=str(self.request.user.pk))

class FlashcardListCreateView(generics.ListCreateAPIView):
    serializer_class = FlashcardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = str(self.request.user.pk)
        qs = Flashcard.objects.filter(user_id=user_id).order_by('-created_at')
        # support query param ?due=true to only get due cards
        due = self.request.query_params.get('due')
        if due and due.lower() in ['1','true','yes']:
            now = timezone.now()
            qs = qs.filter(next_review__lte=now).order_by('next_review')
        return qs

    def perform_create(self, serializer):
        serializer.save(user_id=str(self.request.user.pk))

class FlashcardReviewView(APIView):
    """
    POST with { 'card_id': '<id>', 'quality': <0-5> }  (0=complete fail, 5=perfect)
    Uses a simplified SM-2 algorithm to update next_review, interval_days, easiness, repetitions.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        card_id = request.data.get('card_id')
        quality = request.data.get('quality')  # expected integer 0..5
        if card_id is None or quality is None:
            return Response({'detail': 'card_id and quality are required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            card = Flashcard.objects.get(pk=card_id, user_id=str(request.user.pk))
        except Flashcard.DoesNotExist:
            return Response({'detail': 'card not found'}, status=status.HTTP_404_NOT_FOUND)

        try:
            q = int(quality)
        except ValueError:
            return Response({'detail': 'quality must be integer 0..5'}, status=status.HTTP_400_BAD_REQUEST)
        q = max(0, min(5, q))

        # SM-2 simplified
        if q < 3:
            card.repetitions = 0
            card.interval_days = 1
        else:
            card.repetitions += 1
            if card.repetitions == 1:
                card.interval_days = 1
            elif card.repetitions == 2:
                card.interval_days = 6
            else:
                card.interval_days = int(card.interval_days * card.easiness)

        # update easiness
        ef = card.easiness + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
        card.easiness = max(1.3, ef)

        # set next review date
        card.next_review = timezone.now() + timedelta(days=card.interval_days)
        card.save()
        return Response(FlashcardSerializer(card).data)
