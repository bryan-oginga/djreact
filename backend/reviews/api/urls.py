from rest_framework.routers import DefaultRouter
from .views import ReviewSet
from django.urls import path,include

router = DefaultRouter()
router.register(r'reviews',ReviewSet,basename='reviews')

urlpatterns = [
    path('',include(router.urls)),
]

