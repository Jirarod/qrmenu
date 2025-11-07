# QR Menu Docker Management Script for Windows
# Usage: .\docker-commands.ps1 [command]

param(
    [Parameter(Position=0)]
    [string]$Command = "help"
)

function Show-Help {
    Write-Host "QR Menu Docker Commands:" -ForegroundColor Green
    Write-Host ""
    Write-Host "Production:" -ForegroundColor Yellow
    Write-Host "  .\docker-commands.ps1 build       - Build all services"
    Write-Host "  .\docker-commands.ps1 up          - Start all services in background"
    Write-Host "  .\docker-commands.ps1 up-logs     - Start all services with logs"
    Write-Host "  .\docker-commands.ps1 down        - Stop all services"
    Write-Host "  .\docker-commands.ps1 restart     - Restart all services"
    Write-Host "  .\docker-commands.ps1 clean       - Stop services and remove volumes"
    Write-Host ""
    Write-Host "Development:" -ForegroundColor Yellow
    Write-Host "  .\docker-commands.ps1 dev         - Build and start development environment"
    Write-Host "  .\docker-commands.ps1 dev-up      - Start development services"
    Write-Host "  .\docker-commands.ps1 dev-down    - Stop development services"
    Write-Host "  .\docker-commands.ps1 dev-logs    - View development logs"
    Write-Host ""
    Write-Host "Logs:" -ForegroundColor Yellow
    Write-Host "  .\docker-commands.ps1 logs        - View all logs"
    Write-Host "  .\docker-commands.ps1 backend-logs - View backend logs only"
    Write-Host "  .\docker-commands.ps1 frontend-logs - View frontend logs only"
    Write-Host "  .\docker-commands.ps1 db-logs     - View database logs only"
    Write-Host ""
    Write-Host "Database:" -ForegroundColor Yellow
    Write-Host "  .\docker-commands.ps1 db-shell    - Connect to database shell"
    Write-Host ""
    Write-Host "Utils:" -ForegroundColor Yellow
    Write-Host "  .\docker-commands.ps1 status      - Check services status"
}

switch ($Command.ToLower()) {
    "help" { Show-Help }
    "build" { docker-compose build }
    "up" { docker-compose up -d }
    "up-logs" { docker-compose up }
    "down" { docker-compose down }
    "restart" { docker-compose restart }
    "clean" { 
        docker-compose down -v
        docker system prune -f
    }
    "dev" { docker-compose -f docker-compose.dev.yml up --build }
    "dev-up" { docker-compose -f docker-compose.dev.yml up -d }
    "dev-down" { docker-compose -f docker-compose.dev.yml down }
    "dev-logs" { docker-compose -f docker-compose.dev.yml logs -f }
    "dev-clean" { docker-compose -f docker-compose.dev.yml down -v }
    "logs" { docker-compose logs -f }
    "backend-logs" { docker-compose logs -f backend }
    "frontend-logs" { docker-compose logs -f frontend }
    "db-logs" { docker-compose logs -f postgres }
    "db-shell" { docker-compose exec postgres psql -U postgres -d qrmenu }
    "backend-shell" { docker-compose exec backend sh }
    "frontend-shell" { docker-compose exec frontend sh }
    "status" { docker-compose ps }
    "prod" { 
        docker-compose build
        docker-compose up -d
    }
    default { 
        Write-Host "Unknown command: $Command" -ForegroundColor Red
        Show-Help
    }
}