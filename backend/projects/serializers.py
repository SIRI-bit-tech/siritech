from rest_framework import serializers
from .models import Project
from django.conf import settings


class ProjectSerializer(serializers.ModelSerializer):
    technology_list = serializers.ReadOnlyField()
    image = serializers.SerializerMethodField()
    
    def get_image(self, obj):
        if obj.image:
            url = obj.image.url
            if url.startswith('/'):
                request = self.context.get('request')
                if request:
                    return request.build_absolute_uri(url)
            return url
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
    technology_list = serializers.ReadOnlyField()
    image = serializers.SerializerMethodField()
    
    def get_image(self, obj):
        if obj.image:
            url = obj.image.url
            if url.startswith('/'):
                request = self.context.get('request')
                if request:
                    return request.build_absolute_uri(url)
            return url
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