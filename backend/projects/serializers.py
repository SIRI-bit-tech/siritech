from rest_framework import serializers
from .models import Project
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for Project model"""
    
    technology_list = serializers.ReadOnlyField()
    image = serializers.SerializerMethodField()
    
    def get_image(self, obj):
        if obj.image:
            # Debug logging
            logger.info(f"USE_CLOUDINARY setting: {getattr(settings, 'USE_CLOUDINARY', 'NOT SET')}")
            logger.info(f"DEFAULT_FILE_STORAGE: {getattr(settings, 'DEFAULT_FILE_STORAGE', 'NOT SET')}")
            logger.info(f"Raw image.url: {obj.image.url}")
            
            request = self.context.get('request')
            if request:
                full_url = request.build_absolute_uri(obj.image.url)
                logger.info(f"Full URL: {full_url}")
                return full_url
            return obj.image.url
        return None
    
    class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'description',
            'short_description',
            'github_url',
            'live_url',
            'image',
            'technologies',
            'technology_list',
            'featured',
            'order',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


class ProjectListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for project lists"""
    
    technology_list = serializers.ReadOnlyField()
    image = serializers.SerializerMethodField()
    
    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None
    
    class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'short_description',
            'github_url',
            'live_url',
            'image',
            'technology_list',
            'featured'
        ]