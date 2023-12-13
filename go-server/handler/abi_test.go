package handler_test

import (
	"encoding/json"
	"io"
	"go-server/handler"
	"go-server/service"
	"net/http/httptest"
	"testing"

	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
)

func TestGetAbi(t *testing.T) {
	app := fiber.New()
	abiService := service.NewAbiServiceMock()
	urlPath := "/search-abi?chain-id=5&address=0x980306e668Fa1E4246e2AC86e06e12B67A5fD087"

	t.Run("fetch abi successfully", func(t *testing.T) {
		// Arrange
		var expectedAbiConverted []map[string]interface{}
		json.Unmarshal([]byte(handler.ExpectedAbi), &expectedAbiConverted)
		abiService.
			On("GetAbi", 5, "0x980306e668Fa1E4246e2AC86e06e12B67A5fD087").
			Return(expectedAbiConverted, nil)
		
		abiHandler := handler.NewAbiHandler(abiService)
		app.Get("/search-abi", abiHandler.GetAbi)

		req := httptest.NewRequest("GET", urlPath, nil)

		// Act
		res, _ := app.Test(req)
		defer res.Body.Close()

		body, _ := io.ReadAll(res.Body)
		var responseBody map[string]interface{}
		json.Unmarshal(body, &responseBody)
		abiMap := responseBody["abi"]

		// Assert
		if assert.Equal(t, fiber.StatusOK, res.StatusCode) {
			abiList, ok := abiMap.([]interface{})
			if !ok {
				t.Error("abiMap is not in the expected format")
				return
			}

			var convertedAbi []map[string]interface{}
			for _, item := range abiList {
				if abi, ok := item.(map[string]interface{}); ok {
					convertedAbi = append(convertedAbi, abi)
				}
			}

			expected := map[string]interface{}{
				"message": "fetch abi successfully",
				"abi": expectedAbiConverted,
			}
			actual := map[string]interface{}{
				"message": "fetch abi successfully",
				"abi": convertedAbi,
			} 

			assert.Equal(t, expected, actual)
		}
	})
} 