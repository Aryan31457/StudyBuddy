"""
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .services.gemini_service import send_message, GeminiServiceError
from django.conf import settings

class AIChatView(APIView):
    """Simple AI chat endpoint that forwards user messages to Gemini."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        message = request.data.get("message")
        if not message:
            return Response({"detail": "message is required"}, status=status.HTTP_400_BAD_REQUEST)

        # optional system prompt configured in settings
        system_prompt = getattr(settings, "AI_SYSTEM_PROMPT", None)
        try:
            reply = send_message(message, system_prompt=system_prompt)
            return Response({"reply": reply})
        except GeminiServiceError as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({"detail": "internal error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
"""
