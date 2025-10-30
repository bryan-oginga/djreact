from rest_framework.viewsets import ModelViewSet
from .serializers import ReviewSerializer
from reviews.models import Review

class ReviewSet(ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()
    