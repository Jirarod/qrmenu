.PHONY: help build up down logs clean restart backend-logs frontend-logs db-logs dev dev-up dev-down prod

# Default target
help:
	@echo "QR Menu Docker Commands:"
	@echo ""
	@echo "Production:"
	@echo "  make build       - Build all services"
	@echo "  make up          - Start all services in background"
	@echo "  make up-logs     - Start all services with logs"
	@echo "  make down        - Stop all services"
	@echo "  make restart     - Restart all services"
	@echo "  make clean       - Stop services and remove volumes"
	@echo ""
	@echo "Development:"
	@echo "  make dev         - Build and start development environment"
	@echo "  make dev-up      - Start development services"
	@echo "  make dev-down    - Stop development services"
	@echo "  make dev-logs    - View development logs"
	@echo ""
	@echo "Logs:"
	@echo "  make logs        - View all logs"
	@echo "  make backend-logs - View backend logs only"
	@echo "  make frontend-logs - View frontend logs only"
	@echo "  make db-logs     - View database logs only"
	@echo ""
	@echo "Database:"
	@echo "  make db-shell    - Connect to database shell"
	@echo "  make db-backup   - Create database backup"
	@echo "  make db-restore  - Restore database from backup"
	@echo ""
	@echo "Utils:"
	@echo "  make status      - Check services status"
	@echo "  make backend-shell - Access backend container shell"
	@echo "  make frontend-shell - Access frontend container shell"

# Production commands
build:
	docker-compose build

up:
	docker-compose up -d

up-logs:
	docker-compose up

down:
	docker-compose down

restart:
	docker-compose restart

clean:
	docker-compose down -v
	docker system prune -f

# Development commands
dev:
	docker-compose -f docker-compose.dev.yml up --build

dev-up:
	docker-compose -f docker-compose.dev.yml up -d

dev-down:
	docker-compose -f docker-compose.dev.yml down

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f

dev-clean:
	docker-compose -f docker-compose.dev.yml down -v

# Logs
logs:
	docker-compose logs -f

backend-logs:
	docker-compose logs -f backend

frontend-logs:
	docker-compose logs -f frontend

db-logs:
	docker-compose logs -f postgres

# Database operations
db-shell:
	docker-compose exec postgres psql -U postgres -d qrmenu

db-backup:
	docker-compose exec postgres pg_dump -U postgres qrmenu > backup_$$(date +%Y%m%d_%H%M%S).sql

db-restore:
	@echo "Usage: make db-restore FILE=backup_file.sql"
	@if [ -z "$(FILE)" ]; then echo "Please specify FILE=backup_file.sql"; exit 1; fi
	docker-compose exec -T postgres psql -U postgres qrmenu < $(FILE)

# Container shells
backend-shell:
	docker-compose exec backend sh

frontend-shell:
	docker-compose exec frontend sh

# Status check
status:
	docker-compose ps

# Production deployment
prod: build up

# Quick development setup
dev-setup: dev-clean dev