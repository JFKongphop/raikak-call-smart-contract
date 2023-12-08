package service

import (
	"go-server/repository"

	"github.com/redis/go-redis/v9"
)

type abiService struct {
	abiRepo repository.AbiRepository
	redisClient *redis.Client
}

func NewAbiService(abiRepo repository.AbiRepository, redisClient *redis.Client) AbiService {
	return abiService{abiRepo, redisClient}
}

func (s abiService) GetAbi(chainId int, address string) ([]map[string]interface{}, error) {
	return nil, nil
}