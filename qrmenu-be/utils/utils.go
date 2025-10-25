package utils

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"strings"
)

// GenerateRandomString generates a random string of specified length
func GenerateRandomString(length int) (string, error) {
	bytes := make([]byte, length)
	_, err := rand.Read(bytes)
	if err != nil {
		return "", err
	}
	return base64.URLEncoding.EncodeToString(bytes)[:length], nil
}

// ValidateEmail performs basic email validation
func ValidateEmail(email string) bool {
	return strings.Contains(email, "@") && strings.Contains(email, ".")
}

// FormatPrice formats price to Thai Baht format
func FormatPrice(price float64) string {
	return fmt.Sprintf("฿%.2f", price)
}

// SanitizeString removes potentially harmful characters from strings
func SanitizeString(input string) string {
	// Basic sanitization - remove HTML tags and scripts
	input = strings.ReplaceAll(input, "<script>", "")
	input = strings.ReplaceAll(input, "</script>", "")
	input = strings.ReplaceAll(input, "<", "&lt;")
	input = strings.ReplaceAll(input, ">", "&gt;")
	return strings.TrimSpace(input)
}