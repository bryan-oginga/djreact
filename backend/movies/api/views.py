from rest_framework import viewsets
from movies.models import Movie
from .serializers import MovieSerializer
from rest_framework import permissions

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = "slug"
