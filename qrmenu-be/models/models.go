package models

import (
	"time"
)

// Restaurant represents a restaurant entity
type Restaurant struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Name        string    `json:"name" gorm:"not null" binding:"required"`
	Description string    `json:"description"`
	Address     string    `json:"address"`
	Phone       string    `json:"phone"`
	Email       string    `json:"email"`
	Website     string    `json:"website"`
	LogoURL     string    `json:"logo_url"`
	IsActive    bool      `json:"is_active" gorm:"default:true"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	
	// Relationships
	Menus []Menu `json:"menus,omitempty" gorm:"foreignKey:RestaurantID"`
}

// Menu represents a menu entity
type Menu struct {
	ID           uint      `json:"id" gorm:"primaryKey"`
	RestaurantID uint      `json:"restaurant_id" gorm:"not null"`
	Name         string    `json:"name" gorm:"not null" binding:"required"`
	Description  string    `json:"description"`
	IsActive     bool      `json:"is_active" gorm:"default:true"`
	DisplayOrder int       `json:"display_order" gorm:"default:0"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	
	// Relationships
	Restaurant *Restaurant `json:"restaurant,omitempty" gorm:"foreignKey:RestaurantID"`
	Items      []MenuItem  `json:"items,omitempty" gorm:"foreignKey:MenuID"`
}

// MenuItem represents a menu item entity
type MenuItem struct {
	ID           uint      `json:"id" gorm:"primaryKey"`
	MenuID       uint      `json:"menu_id" gorm:"not null"`
	Name         string    `json:"name" gorm:"not null" binding:"required"`
	Description  string    `json:"description"`
	Price        float64   `json:"price" gorm:"not null" binding:"required"`
	ImageURL     string    `json:"image_url"`
	Category     string    `json:"category"`
	IsAvailable  bool      `json:"is_available" gorm:"default:true"`
	DisplayOrder int       `json:"display_order" gorm:"default:0"`
	Allergens    string    `json:"allergens"` // JSON string of allergen list
	Dietary      string    `json:"dietary"`   // JSON string of dietary options (vegetarian, vegan, etc.)
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	
	// Relationships
	Menu *Menu `json:"menu,omitempty" gorm:"foreignKey:MenuID"`
}

// Category represents menu item categories
type Category struct {
	ID           uint      `json:"id" gorm:"primaryKey"`
	RestaurantID uint      `json:"restaurant_id" gorm:"not null"`
	Name         string    `json:"name" gorm:"not null" binding:"required"`
	Description  string    `json:"description"`
	DisplayOrder int       `json:"display_order" gorm:"default:0"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	
	// Relationships
	Restaurant *Restaurant `json:"restaurant,omitempty" gorm:"foreignKey:RestaurantID"`
}