package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"qrmenu-be/config"
	"qrmenu-be/handlers"
	"qrmenu-be/middleware"
)

func main() {
	// Load configuration
	cfg := config.LoadConfig()

	// Initialize Gin router
	if cfg.Environment == "production" {
		gin.SetMode(gin.ReleaseMode)
	}
	
	router := gin.Default()

	// Add middleware
	router.Use(middleware.CORS())
	router.Use(middleware.Logger())

	// Health check endpoint
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "healthy",
			"service": "QR Menu Backend",
			"version": "1.0.0",
		})
	})

	// API routes
	api := router.Group("/api/v1")
	{
		// Restaurant routes
		restaurants := api.Group("/restaurants")
		{
			restaurants.GET("", handlers.GetRestaurants)
			restaurants.GET("/:id", handlers.GetRestaurant)
			restaurants.POST("", handlers.CreateRestaurant)
			restaurants.PUT("/:id", handlers.UpdateRestaurant)
			restaurants.DELETE("/:id", handlers.DeleteRestaurant)
		}

		// Menu routes
		menus := api.Group("/restaurants/:restaurant_id/menus")
		{
			menus.GET("", handlers.GetMenus)
			menus.GET("/:id", handlers.GetMenu)
			menus.POST("", handlers.CreateMenu)
			menus.PUT("/:id", handlers.UpdateMenu)
			menus.DELETE("/:id", handlers.DeleteMenu)
		}

		// Menu Item routes
		items := api.Group("/menus/:menu_id/items")
		{
			items.GET("", handlers.GetMenuItems)
			items.GET("/:id", handlers.GetMenuItem)
			items.POST("", handlers.CreateMenuItem)
			items.PUT("/:id", handlers.UpdateMenuItem)
			items.DELETE("/:id", handlers.DeleteMenuItem)
		}

		// QR Code routes
		qr := api.Group("/qr")
		{
			qr.GET("/restaurant/:id", handlers.GenerateRestaurantQR)
			qr.GET("/menu/:id", handlers.GenerateMenuQR)
		}
	}

	// Start server
	log.Printf("Starting server on port %s", cfg.Port)
	log.Fatal(http.ListenAndServe(":"+cfg.Port, router))
}