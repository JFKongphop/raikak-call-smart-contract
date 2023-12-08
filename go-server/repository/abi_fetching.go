package repository

type abiRepositoryFetching struct {}

func NewAbiRepositoryFetching() AbiRepository {
	return abiRepositoryFetching{}
}

func (r abiRepositoryFetching) GetAbi(chainId int, address string) (string, error) {

	

	return "", nil
}