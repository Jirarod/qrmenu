package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"qrmenu-be/models"
)

// MenuItem Handlers

func GetMenuItems(c *gin.Context) {
	menuID, err := strconv.ParseUint(c.Param("menu_id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid menu ID"})
		return
	}
	
	// TODO: Implement database query
	items := []models.MenuItem{
		{
			ID:          1,
			MenuID:      uint(menuID),
			Name:        "Pad Thai",
			Description: "Traditional Thai stir-fried noodles",
			Price:       150.00,
			Category:    "Main Course",
			IsAvailable: true,
		},
		{
			ID:          2,
			MenuID:      uint(menuID),
			Name:        "Tom Yum Soup",
			Description: "Spicy and sour soup with shrimp",
			Price:       120.00,
			Category:    "Soup",
			IsAvailable: true,
		},
	}
	
	c.JSON(http.StatusOK, gin.H{
		"data":    items,
		"message": "Menu items retrieved successfully",
	})
}

func GetMenuItem(c *gin.Context) {
	menuID, err := strconv.ParseUint(c.Param("menu_id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid menu ID"})
		return
	}
	
	itemID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid item ID"})
		return
	}
	
	// TODO: Implement database query
	item := models.MenuItem{
		ID:          uint(itemID),
		MenuID:      uint(menuID),
		Name:        "Pad Thai",
		Description: "Traditional Thai stir-fried noodles",
		Price:       150.00,
		Category:    "Main Course",
		IsAvailable: true,
	}
	
	c.JSON(http.StatusOK, gin.H{
		"data":    item,
		"message": "Menu item retrieved successfully",
	})
}

func CreateMenuItem(c *gin.Context) {
	menuID, err := strconv.ParseUint(c.Param("menu_id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid menu ID"})
		return
	}
	
	var item models.MenuItem
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	item.MenuID = uint(menuID)
	
	// TODO: Implement database save
	item.ID = 1 // Mock ID
	
	c.JSON(http.StatusCreated, gin.H{
		"data":    item,
		"message": "Menu item created successfully",
	})
}

func UpdateMenuItem(c *gin.Context) {
	menuID, err := strconv.ParseUint(c.Param("menu_id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid menu ID"})
		return
	}
	
	itemID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid item ID"})
		return
	}
	
	var item models.MenuItem
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	item.ID = uint(itemID)
	item.MenuID = uint(menuID)
	
	// TODO: Implement database update
	
	c.JSON(http.StatusOK, gin.H{
		"data":    item,
		"message": "Menu item updated successfully",
	})
}

func DeleteMenuItem(c *gin.Context) {
	itemID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid item ID"})
		return
	}
	
	// TODO: Implement database delete
	
	c.JSON(http.StatusOK, gin.H{
		"message": "Menu item deleted successfully",
		"id":      itemID,
	})
}