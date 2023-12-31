package handler

import (
	"fmt"
	"go-server/service"

	"github.com/gofiber/fiber/v2"
)

type abiHandler struct {
	abiSrv service.AbiService
}

func NewAbiHandler(abiSrv service.AbiService) abiHandler {
	return abiHandler{abiSrv}
}

func (h abiHandler) GetAbi(c *fiber.Ctx) error {
	chainId := c.QueryInt("chain-id")
	address := c.Query("address")

	abiJson, err := h.abiSrv.GetAbi(chainId, address)
	fmt.Println(err)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": err.Error() ,
		})
	}

	response := fiber.Map{
		"message": "fetch abi successfully",
		"abi": abiJson,
	}

	return  c.Status(fiber.StatusOK).JSON(response)
} 