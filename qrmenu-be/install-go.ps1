# Go Installation Script for Windows
# Run this script in PowerShell as Administrator

Write-Host "Installing Go for Windows..." -ForegroundColor Green

# Check if Chocolatey is installed
if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Chocolatey package manager..." -ForegroundColor Yellow
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    
    # Refresh environment variables
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
}

# Install Go using Chocolatey
Write-Host "Installing Go via Chocolatey..." -ForegroundColor Yellow
choco install golang -y

# Refresh environment variables
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Verify installation
Write-Host "Verifying Go installation..." -ForegroundColor Yellow
go version

if ($LASTEXITCODE -eq 0) {
    Write-Host "Go installed successfully!" -ForegroundColor Green
    Write-Host "You can now run 'go build .' and 'go run main.go' in your project directory" -ForegroundColor Green
} else {
    Write-Host "Go installation failed. Please install Go manually from https://golang.org/dl/" -ForegroundColor Red
}

Write-Host ""
Write-Host "Manual Installation Alternative:" -ForegroundColor Yellow
Write-Host "1. Download Go from https://golang.org/dl/" -ForegroundColor White
Write-Host "2. Run the installer" -ForegroundColor White
Write-Host "3. Restart your terminal" -ForegroundColor White
Write-Host "4. Verify with 'go version'" -ForegroundColor White