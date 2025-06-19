# Docker Setup for Nuxt.js Application

This guide explains how to run your Nuxt.js application using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose installed on your system

## Quick Start

### Development Mode

To run the application in development mode with hot reloading:

```bash
# Build and start the development container
docker-compose --profile dev up --build

# Or run in detached mode
docker-compose --profile dev up --build -d
```

The application will be available at `http://localhost:3000`

### Production Mode

To run the application in production mode:

```bash
# Build and start the production container
docker-compose --profile prod up --build

# Or run in detached mode
docker-compose --profile prod up --build -d
```

### With Nginx Reverse Proxy

To run with Nginx reverse proxy for production:

```bash
# Build and start with nginx
docker-compose --profile prod --profile nginx up --build
```

This will make the application available at `http://localhost:80` (or `https://localhost:443` if SSL is configured)

## Docker Commands

### Build the image manually

```bash
# Development build
docker build -f Dockerfile.dev -t texapp-dev .

# Production build
docker build -f Dockerfile -t texapp-prod .
```

### Run containers manually

```bash
# Development
docker run -p 3000:3000 -v $(pwd):/app texapp-dev

# Production
docker run -p 3000:3000 texapp-prod
```

### View logs

```bash
# View logs for all services
docker-compose logs

# View logs for specific service
docker-compose logs app-dev
docker-compose logs app-prod
```

### Stop services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## Environment Variables

You can customize the application by setting environment variables:

```bash
# Create a .env file
NODE_ENV=production
NUXT_HOST=0.0.0.0
NUXT_PORT=3000
```

## SSL Configuration

To enable HTTPS:

1. Create an `ssl` directory in your project root
2. Place your SSL certificates in the `ssl` directory:
   - `ssl/cert.pem` - SSL certificate
   - `ssl/key.pem` - Private key
3. Uncomment the HTTPS server block in `nginx.conf`
4. Run with nginx profile: `docker-compose --profile prod --profile nginx up --build`

## Troubleshooting

### Port already in use

If port 3000 is already in use, you can change it in the `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Change 3001 to any available port
```

### Permission issues

If you encounter permission issues on Linux/macOS:

```bash
# Fix ownership of node_modules
sudo chown -R $USER:$USER node_modules
```

### Build cache issues

To rebuild without cache:

```bash
docker-compose build --no-cache
```

### View running containers

```bash
docker ps
```

### Access container shell

```bash
# Development container
docker-compose exec app-dev sh

# Production container
docker-compose exec app-prod sh
```

## Production Deployment

For production deployment, consider:

1. Using a proper domain name
2. Setting up SSL certificates
3. Configuring environment variables
4. Setting up monitoring and logging
5. Using a container orchestration platform like Kubernetes

## File Structure

```
WebTEX/
├── Dockerfile              # Production Dockerfile
├── Dockerfile.dev          # Development Dockerfile
├── docker-compose.yml      # Docker Compose configuration
├── .dockerignore           # Files to exclude from Docker build
├── nginx.conf              # Nginx configuration for reverse proxy
└── README-Docker.md        # This file
```

## Performance Optimization

The production Dockerfile uses multi-stage builds to:
- Minimize the final image size
- Separate build dependencies from runtime dependencies
- Optimize layer caching
- Run the application as a non-root user for security 