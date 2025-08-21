from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import Http404
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
    serializer = ProjectListSerializer(projects, many=True, context={'request': request})
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
    """Return Cloudinary URL of the active resume for download"""
    resume = Resume.objects.filter(is_active=True).first()
    if not resume or not resume.file:
        raise Http404("Resume not found")
    
    return Response({
        "url": resume.file.url,
        "filename": "Siri_Tech_Resume.pdf"
    })


@api_view(['GET'])
def resume_status(request):
    """Check if resume is available for download"""
    resume = Resume.objects.filter(is_active=True).first()
    return Response({
        'available': bool(resume and resume.file),
        'title': resume.title if resume else None,
        'uploaded_at': resume.uploaded_at if resume else None,
        'url': resume.file.url if resume and resume.file else None
    })
