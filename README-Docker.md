# QR Menu Docker Setup

This project uses Docker and Docker Compose to run the complete application stack including:
- **Frontend**: React application with Vite
- **Backend**: Go API server with Gin framework
- **Database**: PostgreSQL database
- **Nginx**: Reverse proxy (optional)

## Prerequisites

- Docker Desktop installed
- Docker Compose v3.8 or higher

## Quick Start

### Production Environment

```powershell
# Build and start all services
.\docker-commands.ps1 up

# Or using docker-compose directly
docker-compose up -d

# View logs
.\docker-commands.ps1 logs
```

### Development Environment

```powershell
# Start development environment with hot reload
.\docker-commands.ps1 dev

# Or using docker-compose directly
docker-compose -f docker-compose.dev.yml up --build
```

## Services

| Service | Port | URL | Description |
|---------|------|-----|-------------|
| Frontend | 3000 | http://localhost:3000 | React application |
| Backend | 8080 | http://localhost:8080 | Go API server |
| Database | 5432 | localhost:5432 | PostgreSQL database |
| Nginx | 80 | http://localhost | Reverse proxy |

## Available Commands

### Windows PowerShell

```powershell
# Show help
.\docker-commands.ps1 help

# Production
.\docker-commands.ps1 build       # Build all services
.\docker-commands.ps1 up          # Start services in background
.\docker-commands.ps1 up-logs     # Start services with logs
.\docker-commands.ps1 down        # Stop services
.\docker-commands.ps1 restart     # Restart services
.\docker-commands.ps1 clean       # Stop and remove volumes

# Development
.\docker-commands.ps1 dev         # Start development environment
.\docker-commands.ps1 dev-up      # Start dev services in background
.\docker-commands.ps1 dev-down    # Stop dev services
.\docker-commands.ps1 dev-logs    # View dev logs

# Logs
.\docker-commands.ps1 logs        # All logs
.\docker-commands.ps1 backend-logs    # Backend logs only
.\docker-commands.ps1 frontend-logs   # Frontend logs only
.\docker-commands.ps1 db-logs     # Database logs only

# Database
.\docker-commands.ps1 db-shell    # Connect to database
.\docker-commands.ps1 status      # Check service status
```

### Linux/Mac (using Makefile)

```bash
# Show help
make help

# Production
make build        # Build all services
make up           # Start services in background
make up-logs      # Start services with logs
make down         # Stop services
make clean        # Stop and remove volumes

# Development
make dev          # Start development environment
make dev-up       # Start dev services in background
make dev-down     # Stop dev services

# Database
make db-shell     # Connect to database
make db-backup    # Create database backup
```

## Environment Variables

### Backend Environment Variables

```env
PORT=8080
ENVIRONMENT=development
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=qrmenu
DB_SSLMODE=disable
JWT_SECRET=your_jwt_secret_key_here
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment Variables

```env
NODE_ENV=production
REACT_APP_API_URL=http://localhost:8080
REACT_APP_BACKEND_URL=http://backend:8080
```

## Docker Compose Files

- `docker-compose.yml` - Production environment
- `docker-compose.dev.yml` - Development environment with hot reload

## Development Features

### Backend Development
- Hot reload using Air
- Source code mounted as volume
- Development dependencies included

### Frontend Development
- Vite development server
- Hot module replacement (HMR)
- Source code mounted as volume

## Database

### Connection Details
- **Host**: localhost (from host machine) or postgres (from containers)
- **Port**: 5432
- **Database**: qrmenu
- **Username**: postgres
- **Password**: password

### Database Shell Access

```powershell
# Connect to database shell
.\docker-commands.ps1 db-shell

# Or using docker-compose
docker-compose exec postgres psql -U postgres -d qrmenu
```

### Database Backup/Restore

```bash
# Create backup (Linux/Mac)
make db-backup

# Restore from backup (Linux/Mac)
make db-restore FILE=backup_file.sql
```

## Nginx Reverse Proxy

The nginx service provides:
- Frontend served at http://localhost/
- API endpoints at http://localhost/api/
- Health checks at http://localhost/health

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```powershell
   # Stop services and try again
   .\docker-commands.ps1 down
   .\docker-commands.ps1 up
   ```

2. **Database connection failed**
   ```powershell
   # Check if database is ready
   .\docker-commands.ps1 db-logs
   ```

3. **Frontend not loading**
   ```powershell
   # Check frontend logs
   .\docker-commands.ps1 frontend-logs
   ```

4. **Backend API not responding**
   ```powershell
   # Check backend logs
   .\docker-commands.ps1 backend-logs
   ```

### Clean Reset

```powershell
# Stop all services and remove volumes
.\docker-commands.ps1 clean

# Rebuild and start
.\docker-commands.ps1 build
.\docker-commands.ps1 up
```

## Health Checks

All services include health checks:
- **Backend**: Checks `/health` endpoint
- **Frontend**: Checks if service responds on port 3000
- **Database**: Uses `pg_isready` command

## Production Deployment

For production deployment, make sure to:

1. Change default passwords in environment variables
2. Use proper JWT secret
3. Configure SSL certificates for nginx
4. Set up proper domain names
5. Configure firewall rules

```powershell
# Production deployment
.\docker-commands.ps1 prod
```