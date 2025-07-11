FROM python:3.10 AS backend

RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy backend files to /app
COPY . /app

# Install dependencies
RUN pip install -r requirements.txt

# Collect static files for serving
# RUN python manage.py collectstatic --noinput

# Expose port for Gunicorn
EXPOSE 8000

# Command to run the application with Gunicorn
CMD ["gunicorn", "--chdir", "backend", "project4.wsgi", "--bind", "0.0.0.0:8000", "--log-file", "-"]
