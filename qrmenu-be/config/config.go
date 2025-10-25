package config

import (
	"os"
	"strconv"
)

type Config struct {
	Port        string
	Environment string
	Database    DatabaseConfig
}

type DatabaseConfig struct {
	Host     string
	Port     int
	Username string
	Password string
	DBName   string
	SSLMode  string
}

func LoadConfig() *Config {
	config := &Config{
		Port:        getEnv("PORT", "8080"),
		Environment: getEnv("ENVIRONMENT", "development"),
		Database: DatabaseConfig{
			Host:     getEnv("DB_HOST", "localhost"),
			Port:     getEnvAsInt("DB_PORT", 5432),
			Username: getEnv("DB_USERNAME", "postgres"),
			Password: getEnv("DB_PASSWORD", "password"),
			DBName:   getEnv("DB_NAME", "qrmenu"),
			SSLMode:  getEnv("DB_SSLMODE", "disable"),
		},
	}
	
	return config
}

func getEnv(key string, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}

func getEnvAsInt(name string, defaultValue int) int {
	valueStr := getEnv(name, "")
	if value, err := strconv.Atoi(valueStr); err == nil {
		return value
	}
	return defaultValue
}