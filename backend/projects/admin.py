from django.contrib import admin
from .models import Project, Resume


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """Admin interface for Project model"""
    
    list_display = [
        'title', 
        'short_description', 
        'featured', 
        'order', 
        'created_at'
    ]
    list_filter = ['featured', 'created_at', 'updated_at']
    search_fields = ['title', 'description', 'technologies']
    list_editable = ['featured', 'order']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'short_description')
        }),
        ('Links', {
            'fields': ('github_url', 'live_url')
        }),
        ('Media', {
            'fields': ('image',)
        }),
        ('Technical Details', {
            'fields': ('technologies',)
        }),
        ('Display Settings', {
            'fields': ('featured', 'order')
        }),
    )
    
    # Custom admin site header
    def changelist_view(self, request, extra_context=None):
        extra_context = extra_context or {}
        extra_context['title'] = 'Siri Tech Portfolio Projects'
        return super().changelist_view(request, extra_context)


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    """Admin interface for Resume model"""
    
    list_display = [
        'title',
        'file',
        'is_active',
        'uploaded_at'
    ]
    list_filter = ['is_active', 'uploaded_at']
    search_fields = ['title']
    list_editable = ['is_active']
    
    fieldsets = (
        ('Resume Information', {
            'fields': ('title', 'file', 'is_active')
        }),
    )
    
    def changelist_view(self, request, extra_context=None):
        extra_context = extra_context or {}
        extra_context['title'] = 'Resume Management'
        return super().changelist_view(request, extra_context)


# Customize admin site
admin.site.site_header = "Siri Tech Portfolio Admin"
admin.site.site_title = "Siri Tech Admin"
admin.site.index_title = "Portfolio Management"
