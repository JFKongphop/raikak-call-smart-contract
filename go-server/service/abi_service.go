package service

import (
	"context"
	"encoding/json"
	"fmt"
	"go-server/logs"
	"go-server/repository"
	"time"

	"github.com/redis/go-redis/v9"
)

type abiService struct {
	abiRepo repository.AbiRepository
	redisClient *redis.Client
}

func NewAbiService(abiRepo repository.AbiRepository, redisClient *redis.Client) AbiService {
	return abiService{abiRepo, redisClient}
}

func (s abiService) GetAbi(chainId int, address string) (abiJson []map[string]interface{}, err error) {
	key := fmt.Sprintf("%v::%v", chainId, address)
	// 5::0x980306e668Fa1E4246e2AC86e06e12B67A5fD087

	// GET
	var abi string
	if abiCached, err := s.redisClient.Get(context.Background(), key).Result(); err == nil {
		if json.Unmarshal([]byte(abiCached), &abi) == nil {
			if json.Unmarshal([]byte(abi), &abiJson) == nil {
				return abiJson, nil
			}
		}
	}

	// REPOSITORY
	abiString, err := s.abiRepo.GetAbi(chainId, address)
	if err != nil {
		logs.Error(err)
		return nil, err
	}

	// SET
	if data, err := json.Marshal(abiString); err == nil {
		s.redisClient.Set(context.Background(), key, string(data), time.Second * 3600)
	}

	err = json.Unmarshal([]byte(abiString), &abiJson)
	if err != nil {
		logs.Error(err)
		return nil, err
	}
	
	return abiJson, nil
}