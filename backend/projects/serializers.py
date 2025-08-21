from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for Project model"""
    
    technology_list = serializers.ReadOnlyField()
    image = serializers.SerializerMethodField()  # Change this line
    
    def get_image(self, obj):
        """Return full image URL"""
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
    image = serializers.SerializerMethodField()  # Change this line
    
    def get_image(self, obj):
        """Return full image URL"""
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