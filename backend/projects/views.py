from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import HttpResponse, Http404
from django.shortcuts import get_object_or_404
import os
from .models import Project, Resume
from .serializers import ProjectSerializer, ProjectListSerializer


class ProjectListView(generics.ListAPIView):
    """API view to list all projects"""
    
    queryset = Project.objects.all()
    serializer_class = ProjectListSerializer
    
    def get_queryset(self):
        queryset = Project.objects.all()
        featured = self.request.query_params.get('featured', None)
        
        if featured is not None:
            queryset = queryset.filter(featured=True)
            
        return queryset


class ProjectDetailView(generics.RetrieveAPIView):
    """API view to get a single project"""
    
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


@api_view(['GET'])
def featured_projects(request):
    """Get featured projects for homepage"""
    projects = Project.objects.filter(featured=True)[:3]
    serializer = ProjectListSerializer(projects, many=True, context={'request': request})  # ← Added context
    return Response(serializer.data)


@api_view(['GET'])
def portfolio_stats(request):
    """Get portfolio statistics"""
    total_projects = Project.objects.count()
    featured_projects = Project.objects.filter(featured=True).count()
    
    return Response({
        'total_projects': total_projects,
        'featured_projects': featured_projects,
    })


@api_view(['GET'])
def download_resume(request):
    """Download the active resume file"""
    try:
        resume = Resume.objects.filter(is_active=True).first()
        if not resume or not resume.file:
            raise Http404("Resume not found")
        
        # Get the file path
        file_path = resume.file.path
        if not os.path.exists(file_path):
            raise Http404("Resume file not found")
        
        # Read and serve the file
        with open(file_path, 'rb') as file:
            response = HttpResponse(
                file.read(),
                content_type='application/pdf'
            )
            response['Content-Disposition'] = f'attachment; filename="Siri_Tech_Resume.pdf"'
            return response
            
    except Resume.DoesNotExist:
        raise Http404("Resume not found")


@api_view(['GET'])
def resume_status(request):
    """Check if resume is available for download"""
    try:
        resume = Resume.objects.filter(is_active=True).first()
        return Response({
            'available': bool(resume and resume.file),
            'title': resume.title if resume else None,
            'uploaded_at': resume.uploaded_at if resume else None
        })
    except Resume.DoesNotExist:
        return Response({
            'available': False,
            'title': None,
            'uploaded_at': None
        })