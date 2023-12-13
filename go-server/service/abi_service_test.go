package service_test

import (
	"encoding/json"
	"go-server/redis"
	"go-server/repository"
	"go-server/service"
	"go-server/utils"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetAbi(t *testing.T) {
	redisClient := redis.InitRedis()
	chainId := service.ServiceTestCase.ChainId
	address := service.ServiceTestCase.Address
	expectedAbi := service.ExpectedAbi

	t.Run("found abi in service", func(t *testing.T) {
		// Arrang
		abiRepo := repository.NewAbiRepositoryMock()
		abiRepo.
			On("GetAbi", chainId, address).
			Return(expectedAbi, nil)

		abiService := service.NewAbiService(abiRepo, redisClient)

		// Act
		abiJson, _ := abiService.GetAbi(chainId, address)

		// Assert
		var expectedAbiConverted []map[string]interface{}
		json.Unmarshal([]byte(expectedAbi), &expectedAbiConverted)
		assert.Equal(t, expectedAbiConverted , abiJson)
	})

	t.Run("error abi not found in service", func(t *testing.T) {
		abiRepo := repository.NewAbiRepositoryMock()
		abiRepo.
			On("GetAbi", chainId, address).
			Return(expectedAbi, utils.ErrABINotFound)

		abiService := service.NewAbiService(abiRepo, redisClient)

		// Act
		_, err := abiService.GetAbi(chainId, address)

		// Assert
		assert.ErrorIs(t, err, utils.ErrABINotFound)
	})
}