from django.contrib import admin
from .models import Movie

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('user','title', 'release_date', 'average_rating', 'created_at')
    search_fields = ('title',)
    list_filter = ('release_date',)
    readonly_fields = ('created_at', 'updated_at', 'average_rating')
    

    fieldsets = (
        ('Movie Details', {
            'fields': ('title', 'release_date', 'poster', 'description')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at', 'average_rating'),
            'classes': ('collapse',),
        }),
    )

     # Automatically set user = logged-in admin when saving
    def save_model(self, request, obj, form, change):
        if not obj.pk:  # if creating new
            obj.user = request.user
        super().save_model(request, obj, form, change)