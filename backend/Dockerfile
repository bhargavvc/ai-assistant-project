# Use a slim Python base image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy only requirements.txt first to leverage Docker caching
COPY requirements.txt /app/requirements.txt

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r /app/requirements.txt

# Copy the rest of the application files
COPY . /app

# Expose Cloud Run's required PORT (default is 8080)
EXPOSE 8080

# Use Gunicorn to run the Flask app in production
CMD ["gunicorn", "--bind", "0.0.0.0:${PORT}", "--workers", "4", "main:app"]
