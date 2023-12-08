package repository

type AbiRepository interface {
	GetAbi(chainId int, address string) (string, error)
}