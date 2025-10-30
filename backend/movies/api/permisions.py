from rest_framework import permissions
from movies.models import Movie

class IsReviewOner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user