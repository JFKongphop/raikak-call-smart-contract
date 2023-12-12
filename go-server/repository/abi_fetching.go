package repository

import (
	"context"
	"go-server/utils"

	"github.com/carlmjohnson/requests"
)

type abiRepositoryFetching struct {}

func NewAbiRepositoryFetching() AbiRepository {
	return abiRepositoryFetching{}
}

func (r abiRepositoryFetching) GetAbi(chainId int, address string) (string, error) {
	url, err := utils.GenerateURL(chainId, address)
	if err != nil {
		return "", err
	}

	var response string
	err = requests.URL(url).ToString(&response).Fetch(context.Background())
	if err != nil {
		return "", err
	}

	abiString, err := utils.FetchABI(response)
	if err != nil {
		return "", err
	}

	return abiString, nil
}