package utils

import "strings"

func FetchABI(htmlResponse string) (string, error) {
	wordStart := `<pre class="wordwrap js-copytextarea2 scrollbar-custom" id="js-copytextarea2" style="height: 200px; max-height: 400px; margin-top: 5px;">`
	wordStop := `</pre><br></div><div class="mb-4"><div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2"><h4 class="card-header-title"> <i class="far fa-code text-secondary me-1"></i>Contract Creation Code</h4><div class="mb-2 mb-lg-0"> <a id="btnConvert2"`
	startAbiIndex := strings.Index(htmlResponse, wordStart)
	stopAbiIndex := strings.Index(htmlResponse, wordStop)

	if startAbiIndex < 0 || stopAbiIndex < 0 {
		return "", ErrABINotFound
	}

	abiString := strings.Replace(
		htmlResponse[startAbiIndex:stopAbiIndex], wordStart,
		"",
		1,
	)

	return abiString, nil
}
