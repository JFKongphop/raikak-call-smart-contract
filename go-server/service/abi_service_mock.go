package service

import "github.com/stretchr/testify/mock"

type abiServiceMock struct {
	mock.Mock
}

func NewAbiServiceMock() *abiServiceMock {
	return &abiServiceMock{}
}

func (m *abiServiceMock) GetAbi(chainId int, address string) ([]map[string]interface{}, error) {
	arge := m.Called(chainId, address)
	return arge.Get(0).([]map[string]interface{}), arge.Error(1)
}

