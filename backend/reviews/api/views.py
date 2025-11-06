from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from reviews.models import Review
from reviews.api.serializers import ReviewSerializer
from movies.models import Movie


class MovieReviewListCreateView(APIView):
    def get(self, request, slug):
        """List all reviews for a given movie"""
        try:
            movie = Movie.objects.get(slug=slug)
        except Movie.DoesNotExist:
            return Response({"detail": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)
        
        reviews = Review.objects.filter(movie=movie)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, slug):
        try:
            movie = Movie.objects.get(slug=slug)
        except Movie.DoesNotExist:
            return Response({"detail": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(movie=movie, user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

