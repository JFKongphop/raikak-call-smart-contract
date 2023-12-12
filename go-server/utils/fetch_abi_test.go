package utils_test

import (
	"go-server/utils"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestFetchABI(t *testing.T) {
	successCase := utils.FetchABITestCase[0]
	t.Run(successCase.Name, func(t *testing.T) {
		abi, _ := utils.FetchABI(successCase.HtmlResponse)

		assert.Equal(t, successCase.Expected, abi)
	})

	errorCase := utils.FetchABITestCase[1]
	t.Run(errorCase.Name, func(t *testing.T) {
		_, err := utils.FetchABI(errorCase.HtmlResponse)

		assert.ErrorIs(t, err, utils.ErrABINotFound)
	})
}