from django.urls import path
from . import views
from reviews.api.views import MovieReviewListCreateView

urlpatterns = [
    path('', views.MovieListCreateView.as_view(), name='movie-list'),
    path('<slug:slug>/', views.MovieDetailView.as_view(), name='movie-detail'),
    path('<slug:slug>/reviews/', MovieReviewListCreateView.as_view(), name='movie-reviews'),
]
