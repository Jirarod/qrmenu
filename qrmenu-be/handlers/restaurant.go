package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"qrmenu-be/models"
)

// Restaurant Handlers

func GetRestaurants(c *gin.Context) {
	// TODO: Implement database query
	restaurants := []models.Restaurant{
		{
			ID:          1,
			Name:        "Sample Restaurant",
			Description: "A wonderful place to eat",
			Address:     "123 Main Street",
			Phone:       "+66-123-456-7890",
			Email:       "contact@sample.com",
			IsActive:    true,
		},
	}
	
	c.JSON(http.StatusOK, gin.H{
		"data":    restaurants,
		"message": "Restaurants retrieved successfully",
	})
}

func GetRestaurant(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid restaurant ID"})
		return
	}
	
	// TODO: Implement database query
	restaurant := models.Restaurant{
		ID:          uint(id),
		Name:        "Sample Restaurant",
		Description: "A wonderful place to eat",
		Address:     "123 Main Street",
		Phone:       "+66-123-456-7890",
		Email:       "contact@sample.com",
		IsActive:    true,
	}
	
	c.JSON(http.StatusOK, gin.H{
		"data":    restaurant,
		"message": "Restaurant retrieved successfully",
	})
}

func CreateRestaurant(c *gin.Context) {
	var restaurant models.Restaurant
	
	if err := c.ShouldBindJSON(&restaurant); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	// TODO: Implement database save
	restaurant.ID = 1 // Mock ID
	
	c.JSON(http.StatusCreated, gin.H{
		"data":    restaurant,
		"message": "Restaurant created successfully",
	})
}

func UpdateRestaurant(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid restaurant ID"})
		return
	}
	
	var restaurant models.Restaurant
	if err := c.ShouldBindJSON(&restaurant); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	restaurant.ID = uint(id)
	
	// TODO: Implement database update
	
	c.JSON(http.StatusOK, gin.H{
		"data":    restaurant,
		"message": "Restaurant updated successfully",
	})
}

func DeleteRestaurant(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid restaurant ID"})
		return
	}
	
	// TODO: Implement database delete
	
	c.JSON(http.StatusOK, gin.H{
		"message": "Restaurant deleted successfully",
		"id":      id,
	})
}