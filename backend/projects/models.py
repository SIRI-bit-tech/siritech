from django.db import models
from django.core.validators import URLValidator


class Project(models.Model):
    """Model for portfolio projects"""
    
    title = models.CharField(max_length=200, help_text="Project title")
    description = models.TextField(help_text="Detailed project description")
    short_description = models.CharField(
        max_length=300, 
        help_text="Brief description for project cards",
        blank=True
    )
    
    # Links
    github_url = models.URLField(
        blank=True, 
        null=True,
        validators=[URLValidator()],
        help_text="GitHub repository URL"
    )
    live_url = models.URLField(
        blank=True, 
        null=True,
        validators=[URLValidator()],
        help_text="Live project URL"
    )
    
    # Image
    image = models.ImageField(
        upload_to='projects/',
        blank=True,
        null=True,
        help_text="Project screenshot or image"
    )
    
    # Technologies used
    technologies = models.CharField(
        max_length=500,
        help_text="Comma-separated list of technologies used",
        blank=True
    )
    
    # Metadata
    featured = models.BooleanField(
        default=False,
        help_text="Show this project prominently"
    )
    order = models.PositiveIntegerField(
        default=0,
        help_text="Display order (lower numbers first)"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = "Project"
        verbose_name_plural = "Projects"
    
    def __str__(self):
        return self.title
    
    @property
    def technology_list(self):
        """Return technologies as a list"""
        if self.technologies:
            return [tech.strip() for tech in self.technologies.split(',')]
        return []


class Resume(models.Model):
    """Model for resume file management"""
    
    title = models.CharField(
        max_length=200, 
        default="Resume",
        help_text="Resume title/version"
    )
    file = models.FileField(
        upload_to='resume/',
        help_text="Upload PDF resume file"
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(
        default=True,
        help_text="Set as active resume (only one can be active)"
    )
    
    class Meta:
        ordering = ['-uploaded_at']
        verbose_name = "Resume"
        verbose_name_plural = "Resumes"
    
    def __str__(self):
        return f"{self.title} - {self.uploaded_at.strftime('%Y-%m-%d')}"
    
    def save(self, *args, **kwargs):
        # Ensure only one active resume
        if self.is_active:
            Resume.objects.filter(is_active=True).update(is_active=False)
        super().save(*args, **kwargs)
