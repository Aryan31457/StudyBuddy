from django.urls import path
from .views import TodoListCreateView, TodoDetailView, FlashcardListCreateView, FlashcardReviewView

urlpatterns = [
    # Todos
    path('todos/', TodoListCreateView.as_view(), name='todos-list-create'),
    path('todos/<str:pk>/', TodoDetailView.as_view(), name='todos-detail'),
    # Flashcards
    path('flashcards/', FlashcardListCreateView.as_view(), name='flashcards-list-create'),
    path('flashcards/review/', FlashcardReviewView.as_view(), name='flashcards-review'),
]
