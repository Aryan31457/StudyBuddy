from django.db import models
from django.utils import timezone

class Todo(models.Model):
    user_id = models.CharField(max_length=255, db_index=True)  # store user PK or id string (Mongo)
    title = models.CharField(max_length=512)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    due_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({'done' if self.completed else 'open'})"

class Flashcard(models.Model):
    user_id = models.CharField(max_length=255, db_index=True)
    front = models.TextField()
    back = models.TextField()
    tags = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    # Spaced repetition fields
    next_review = models.DateTimeField(default=timezone.now)
    interval_days = models.IntegerField(default=1)   # current interval in days
    easiness = models.FloatField(default=2.5)        # ease factor (SM-2 style)
    repetitions = models.IntegerField(default=0)     # consecutive correct reviews

    def __str__(self):
        return f"Flashcard {self.id}: {self.front[:40]}"
