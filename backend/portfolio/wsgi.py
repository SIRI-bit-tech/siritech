"""
WSGI config for portfolio project.
"""

import os
import environ

from django.core.wsgi import get_wsgi_application

env = environ.Env()
environ.Env.read_env()

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')

application = get_wsgi_application()
