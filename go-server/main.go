package main

import (
	"go-server/handler"
	"go-server/redis"
	"go-server/repository"
	"go-server/service"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	redisClient := redis.InitRedis()
	app := fiber.New(); _ = app
	app.Use(logger.New())

	abiRepository := repository.NewAbiRepositoryFetching()
	abiService := service.NewAbiService(abiRepository, redisClient)
	abiHandler := handler.NewAbiHandler(abiService); _ = abiHandler

	// http://localhost:4000/search-abi?chain-id=5&address=0x980306e668Fa1E4246e2AC86e06e12B67A5fD087
	app.Get("/search-abi", abiHandler.GetAbi)

	app.Listen(":4000")
}
