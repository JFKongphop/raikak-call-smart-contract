package repository

import "github.com/stretchr/testify/mock"

type abiRepositoryMock struct {
	mock.Mock
}

func NewAbiRepositoryMock() *abiRepositoryMock {
	return &abiRepositoryMock{}
}

func (m *abiRepositoryMock) GetAbi(chainId int, address string) (string, error) {
	arge := m.Called(chainId, address)
	return arge.Get(0).(string), arge.Error(1)
}
