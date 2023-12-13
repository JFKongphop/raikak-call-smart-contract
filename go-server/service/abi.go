package service

type AbiService interface {
	GetAbi(chainId int, address string) ([]map[string]interface{}, error)
}