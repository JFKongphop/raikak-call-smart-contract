package main

import (
	"go-server/handler"
	"go-server/repository"
	"go-server/service"

	"github.com/redis/go-redis/v9"
)

func main() {
	redisClient := initRedis()

	abiRepository := repository.NewAbiRepositoryFetching()
	abiService := service.NewAbiService(abiRepository, redisClient)
	abiHandler := handler.NewAbiHandler(abiService); _ = abiHandler
}

func initRedis() *redis.Client {
	return redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
	})
}