package main

import (
	// "fmt"
	"go-server/handler"
	"go-server/repository"
	"go-server/service"

	"github.com/gofiber/fiber/v2"
	"github.com/redis/go-redis/v9"
)

func main() {
	redisClient := initRedis()
	app := fiber.New(); _ = app

	abiRepository := repository.NewAbiRepositoryFetching()
	abiService := service.NewAbiService(abiRepository, redisClient)
	abiHandler := handler.NewAbiHandler(abiService); _ = abiHandler

	// http://localhost:3000/search-abi?chain-id=5&address=0x980306e668Fa1E4246e2AC86e06e12B67A5fD087
	app.Get("/search-abi", abiHandler.GetAbi)

	app.Listen(":4000")
}

func initRedis() *redis.Client {
	return redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
	})
}