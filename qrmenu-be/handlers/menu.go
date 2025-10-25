package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"qrmenu-be/models"
)

// Menu Handlers

func GetMenus(c *gin.Context) {
	restaurantID, err := strconv.ParseUint(c.Param("restaurant_id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid restaurant ID"})
		return
	}
	
	// TODO: Implement database query
	menus := []models.Menu{
		{
			ID:           1,
			RestaurantID: uint(restaurantID),
			Name:         "Main Menu",
			Description:  "Our main menu with all dishes",
			IsActive:     true,
		},
	}
	
	c.JSON(http.StatusOK, gin.H{
		"data":    menus,
		"message": "Menus retrieved successfully",
	})
}

func GetMenu(c *gin.Context) {
	restaurantID, err := strconv.ParseUint(c.Param("restaurant_id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid restaurant ID"})
		return
	}
	
	menuID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid menu ID"})
		return
	}
	
	// TODO: Implement database query
	menu := models.Menu{
		ID:           uint(menuID),
		RestaurantID: uint(restaurantID),
		Name:         "Main Menu",
		Description:  "Our main menu with all dishes",
		IsActive:     true,
	}
	
	c.JSON(http.StatusOK, gin.H{
		"data":    menu,
		"message": "Menu retrieved successfully",
	})
}

func CreateMenu(c *gin.Context) {
	restaurantID, err := strconv.ParseUint(c.Param("restaurant_id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid restaurant ID"})
		return
	}
	
	var menu models.Menu
	if err := c.ShouldBindJSON(&menu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	menu.RestaurantID = uint(restaurantID)
	
	// TODO: Implement database save
	menu.ID = 1 // Mock ID
	
	c.JSON(http.StatusCreated, gin.H{
		"data":    menu,
		"message": "Menu created successfully",
	})
}

func UpdateMenu(c *gin.Context) {
	restaurantID, err := strconv.ParseUint(c.Param("restaurant_id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid restaurant ID"})
		return
	}
	
	menuID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid menu ID"})
		return
	}
	
	var menu models.Menu
	if err := c.ShouldBindJSON(&menu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	menu.ID = uint(menuID)
	menu.RestaurantID = uint(restaurantID)
	
	// TODO: Implement database update
	
	c.JSON(http.StatusOK, gin.H{
		"data":    menu,
		"message": "Menu updated successfully",
	})
}

func DeleteMenu(c *gin.Context) {
	menuID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid menu ID"})
		return
	}
	
	// TODO: Implement database delete
	
	c.JSON(http.StatusOK, gin.H{
		"message": "Menu deleted successfully",
		"id":      menuID,
	})
}