#!/bin/bash
# QR Menu Backend Setup Script

echo "🚀 Setting up QR Menu Backend..."

# Check if Go is installed
if ! command -v go &> /dev/null; then
    echo "❌ Go is not installed. Please install Go first:"
    echo "   Windows: Run install-go.ps1 or download from https://golang.org/dl/"
    echo "   macOS: brew install go"
    echo "   Linux: sudo apt-get install golang-go"
    exit 1
fi

echo "✅ Go is installed: $(go version)"

# Install dependencies
echo "📦 Installing Go dependencies..."
go mod tidy

# Create .env file from example
if [ ! -f .env ]; then
    echo "📝 Creating .env file from example..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your configuration"
fi

# Build the application
echo "🔨 Building application..."
go build -o qrmenu-backend .

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 Setup complete! To run the application:"
    echo "   1. Edit .env file with your database configuration"
    echo "   2. Run: go run main.go"
    echo "   3. API will be available at http://localhost:8080"
    echo ""
    echo "📖 API Documentation:"
    echo "   Health Check: GET /health"
    echo "   Restaurants: GET /api/v1/restaurants"
    echo "   Menus: GET /api/v1/restaurants/{id}/menus"
    echo "   Items: GET /api/v1/menus/{id}/items"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi