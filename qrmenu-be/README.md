# QR Menu Backend

A Go-based backend service for a QR Menu application using the Gin framework.

## Features

- RESTful API for managing restaurants, menus, and menu items
- QR code generation for restaurants and menus
- CORS support for frontend integration
- Environment-based configuration
- Structured logging middleware

## Project Structure

```
qrmenu-be/
├── main.go              # Application entry point
├── config/              # Configuration management
│   └── config.go
├── handlers/            # HTTP request handlers
│   ├── restaurant.go    # Restaurant CRUD operations
│   ├── menu.go         # Menu CRUD operations
│   ├── menuitem.go     # Menu item CRUD operations
│   └── qr.go           # QR code generation
├── models/             # Data models
│   └── models.go
├── middleware/         # HTTP middleware
│   └── middleware.go
├── utils/             # Utility functions
├── database/          # Database connection and migrations
└── .env.example       # Environment variables template
```

## API Endpoints

### Health Check
- `GET /health` - Service health check

### Restaurants
- `GET /api/v1/restaurants` - Get all restaurants
- `GET /api/v1/restaurants/:id` - Get restaurant by ID
- `POST /api/v1/restaurants` - Create new restaurant
- `PUT /api/v1/restaurants/:id` - Update restaurant
- `DELETE /api/v1/restaurants/:id` - Delete restaurant

### Menus
- `GET /api/v1/restaurants/:restaurant_id/menus` - Get restaurant menus
- `GET /api/v1/restaurants/:restaurant_id/menus/:id` - Get menu by ID
- `POST /api/v1/restaurants/:restaurant_id/menus` - Create new menu
- `PUT /api/v1/restaurants/:restaurant_id/menus/:id` - Update menu
- `DELETE /api/v1/restaurants/:restaurant_id/menus/:id` - Delete menu

### Menu Items
- `GET /api/v1/menus/:menu_id/items` - Get menu items
- `GET /api/v1/menus/:menu_id/items/:id` - Get menu item by ID
- `POST /api/v1/menus/:menu_id/items` - Create new menu item
- `PUT /api/v1/menus/:menu_id/items/:id` - Update menu item
- `DELETE /api/v1/menus/:menu_id/items/:id` - Delete menu item

### QR Codes
- `GET /api/v1/qr/restaurant/:id` - Generate restaurant QR code
- `GET /api/v1/qr/menu/:id` - Generate menu QR code

## Getting Started

### Prerequisites
- Go 1.19 or higher
- PostgreSQL (optional, for database integration)

### Installation

1. Clone the repository
2. Copy environment configuration:
   ```bash
   cp .env.example .env
   ```

3. Install dependencies:
   ```bash
   go mod tidy
   ```

4. Run the application:
   ```bash
   go run main.go
   ```

The server will start on `http://localhost:8080`

### Environment Variables

Configure the following variables in your `.env` file:

- `PORT`: Server port (default: 8080)
- `ENVIRONMENT`: Environment mode (development/production)
- `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`: Database configuration
- `JWT_SECRET`: JWT secret key for authentication
- `FRONTEND_URL`: Frontend URL for CORS

## Development

The current implementation uses mock data. To integrate with a real database:

1. Add GORM PostgreSQL driver to dependencies
2. Implement database connection in `database/` folder
3. Replace mock data in handlers with actual database queries
4. Add database migrations

## TODO

- [ ] Database integration with PostgreSQL
- [ ] Authentication and authorization
- [ ] File upload for restaurant logos and menu item images
- [ ] QR code generation implementation
- [ ] Input validation and error handling improvements
- [ ] Unit and integration tests
- [ ] API documentation with Swagger
- [ ] Docker containerization