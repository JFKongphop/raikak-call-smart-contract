package service

import (
	"context"
	"encoding/json"
	"fmt"
	"go-server/repository"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/redis/go-redis/v9"
)

type abiService struct {
	abiRepo repository.AbiRepository
	redisClient *redis.Client
}

func NewAbiService(abiRepo repository.AbiRepository, redisClient *redis.Client) AbiService {
	return abiService{abiRepo, redisClient}
}

func (s abiService) GetAbi(chainId int, address string) (fiber.Map, error) {
	key := fmt.Sprintf("%v::%v", chainId, address)
	// 5::0x980306e668Fa1E4246e2AC86e06e12B67A5fD087

	// GET
	var abi string
	abiJson := []map[string]interface{}{}
	if abiCached, err := s.redisClient.Get(context.Background(), key).Result(); err == nil {
		if json.Unmarshal([]byte(abiCached), &abi) == nil {
			if json.Unmarshal([]byte(abi), &abiJson) == nil {
				return fiber.Map{
					"message": "fetch abi successfully",
					"abi": abiJson,
				}, nil
			}
		}
	}

	// REPOSITORY
	abiString, err := s.abiRepo.GetAbi(chainId, address)
	if err != nil {
		return nil, err
	}

	// SET
	if data, err := json.Marshal(abiString); err == nil {
		s.redisClient.Set(context.Background(), key, string(data), time.Second * 3600)
	}

	err = json.Unmarshal([]byte(abiString), &abiJson)
	if err != nil {
		return nil, err
	}
	
	return fiber.Map{
		"message": "fetch abi successfully",
		"abi": abiJson,
	}, nil
}