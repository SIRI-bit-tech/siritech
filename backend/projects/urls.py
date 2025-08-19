from django.urls import path
from . import views

app_name = 'projects'

urlpatterns = [
    path('projects/', views.ProjectListView.as_view(), name='project-list'),
    path('projects/<int:pk>/', views.ProjectDetailView.as_view(), name='project-detail'),
    path('projects/featured/', views.featured_projects, name='featured-projects'),
    path('stats/', views.portfolio_stats, name='portfolio-stats'),
    path('resume/download/', views.download_resume, name='resume-download'),
    path('resume/status/', views.resume_status, name='resume-status'),
]
