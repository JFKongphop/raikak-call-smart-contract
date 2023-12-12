package service

import "github.com/gofiber/fiber/v2"

type AbiService interface {
	GetAbi(chainId int, address string) (fiber.Map, error)
}