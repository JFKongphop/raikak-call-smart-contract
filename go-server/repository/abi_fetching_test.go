package repository_test

import (
	"go-server/repository"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetAbi(t *testing.T) {
	abiRepo := repository.NewAbiRepositoryFetching()
	succeccCase := repository.SuccessGetAbiCase
	t.Run(succeccCase.Name, func(t *testing.T) {
		abiString, _ := abiRepo.GetAbi(succeccCase.ChainId, succeccCase.Address)

		assert.Equal(t, succeccCase.Expected, abiString)
	})

	errorCases := repository.ErrorGetAbiCase
	for _, e := range errorCases {
		t.Run(e.Name, func(t *testing.T) {
			_, err := abiRepo.GetAbi(e.ChainId, e.Address)
	
			assert.ErrorIs(t, err , e.ExpectedError)
		})
	}
}