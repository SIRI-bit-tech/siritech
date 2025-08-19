#!/bin/bash

# Exit on any error
set -e

echo "Starting deployment process..."

# Wait for database to be ready
echo "Waiting for database..."
python manage.py wait_for_db || echo "Database connection check failed, continuing..."

# Run migrations
echo "Running database migrations..."
python manage.py migrate --noinput

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Create superuser if it doesn't exist
echo "Creating superuser..."
python manage.py shell << EOF
import os
from django.contrib.auth import get_user_model

User = get_user_model()

# Get superuser credentials from environment variables
username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@example.com')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'admin123')

# Create superuser if it doesn't exist
if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f'Superuser "{username}" created successfully!')
else:
    print(f'Superuser "{username}" already exists.')
EOF

echo "Deployment process completed successfully!"
