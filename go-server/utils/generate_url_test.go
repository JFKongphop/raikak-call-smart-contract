package utils_test

import (
	"fmt"
	"go-server/utils"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGenerateURL(t *testing.T) {
	successCases := utils.GenerateURLTestCase[:9]
	for _, c := range successCases {
		t.Run(c.Name, func(t *testing.T) {
			url, _ := utils.GenerateURL(c.ChainId, c.Address)

			assert.Equal(t, c.Expected, url)
		})
	}

	errorCase := utils.GenerateURLTestCase[9]
	t.Run(errorCase.Name, func(t *testing.T) {
		_, err := utils.GenerateURL(errorCase.ChainId, errorCase.Address)
		fmt.Println(err)

		assert.ErrorIs(t, err, utils.ErrChainNotFound)
	})
}
