package utils

import "errors"

var (
	ErrChainNotFound = errors.New("chain id not found")
	ErrABINotFound = errors.New("abi not found")
)