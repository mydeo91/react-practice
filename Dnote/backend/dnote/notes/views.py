from rest_framework import viewsets
from .serializers import NoteSerializer
from .models import Notes


# Create your views here.
class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer

    def get_queryset(self):
        return Notes.objects.all().order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save()