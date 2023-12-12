package utils

import "fmt"

func GenerateURL(chainId int, address string) (string, error) {
	switch chainId {
	case 1:
		return fmt.Sprintf("https://etherscan.io/address/%s#code", address), nil
	case 5:
		return fmt.Sprintf("https://goerli.etherscan.io/address/%s#code", address), nil
	case 10:
		return fmt.Sprintf("https://optimistic.etherscan.io/address/%s#code", address), nil
	case 56:
		return fmt.Sprintf("https://bscscan.com/token/%s#code", address), nil
	case 87:
		return fmt.Sprintf("https://testnet.bscscan.com/address/%s#code", address), nil
	case 137:
		return fmt.Sprintf("https://polygonscan.com/address/%s#code", address), nil
	case 420:
		return fmt.Sprintf("https://goerli-optimism.etherscan.io/address/%s#code", address), nil
	case 80001:
		return fmt.Sprintf("https://mumbai.polygonscan.com/address/%s#code", address), nil
	case 42161:
		return fmt.Sprintf("https://arbiscan.io/address/%s#code", address), nil
	default:
		return "", ErrChainNotFound
	}
}
