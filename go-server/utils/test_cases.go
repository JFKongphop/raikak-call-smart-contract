package utils

type generateUrltestCase struct {
	Name     string
	ChainId  int
	Address  string
	Expected string
}

var GenerateURLTestCase = []generateUrltestCase{
	{
		Name:     "chain id 1",
		ChainId:  1,
		Address:  "0x980306e668Fa1E4246e2AC86e06e12B67A5fD087",
		Expected: "https://etherscan.io/address/0x980306e668Fa1E4246e2AC86e06e12B67A5fD087#code",
	},
	{
		Name:     "chain id 5",
		ChainId:  5,
		Address:  "0x980306e668Fa1E4246e2AC86e06e12B67A5fD087",
		Expected: "https://goerli.etherscan.io/address/0x980306e668Fa1E4246e2AC86e06e12B67A5fD087#code",
	},
	{
		Name:     "chain id 10",
		ChainId:  10,
		Address:  "0x980306e668Fa1E4246e2AC86e06e12B67A5fD087",
		Expected: "https://optimistic.etherscan.io/address/0x980306e668Fa1E4246e2AC86e06e12B67A5fD087#code",
	},
	{
		Name:     "chain id 56",
		ChainId:  56,
		Address:  "0x980306e668Fa1E4246e2AC86e06e12B67A5fD087",
		Expected: "https://bscscan.com/token/0x980306e668Fa1E4246e2AC86e06e12B67A5fD087#code",
	},
	{
		Name:     "chain id 87",
		ChainId:  87,
		Address:  "0x980306e668Fa1E4246e2AC86e06e12B67A5fD087",
		Expected: "https://testnet.bscscan.com/address/0x980306e668Fa1E4246e2AC86e06e12B67A5fD087#code",
	},
	{
		Name:     "chain id 137",
		ChainId:  137,
		Address:  "0x980306e668Fa1E4246e2AC86e06e12B67A5fD087",
		Expected: "https://polygonscan.com/address/0x980306e668Fa1E4246e2AC86e06e12B67A5fD087#code",
	},
	{
		Name:     "chain id 420",
		ChainId:  420,
		Address:  "0x980306e668Fa1E4246e2AC86e06e12B67A5fD087",
		Expected: "https://goerli-optimism.etherscan.io/address/0x980306e668Fa1E4246e2AC86e06e12B67A5fD087#code",
	},
	{
		Name:     "chain id 80001",
		ChainId:  80001,
		Address:  "0x980306e668Fa1E4246e2AC86e06e12B67A5fD087",
		Expected: "https://mumbai.polygonscan.com/address/0x980306e668Fa1E4246e2AC86e06e12B67A5fD087#code",
	},
	{
		Name:     "chain id 42161",
		ChainId:  42161,
		Address:  "0x980306e668Fa1E4246e2AC86e06e12B67A5fD087",
		Expected: "https://arbiscan.io/address/0x980306e668Fa1E4246e2AC86e06e12B67A5fD087#code",
	},
	{
		Name:     "chain id not found",
		ChainId:  0,
		Address:  "0x980306e668Fa1E4246e2AC86e06e12B67A5fD087",
		Expected: "chain id not found",
	},
}

type fetchAbiTestCase struct {
	Name         string
	HtmlResponse string
	Expected     string
}

var FetchABITestCase = []fetchAbiTestCase{
	{
		Name:         "found abi",
		HtmlResponse: `<pre class="wordwrap js-copytextarea2 scrollbar-custom" id="js-copytextarea2" style="height: 200px; max-height: 400px; margin-top: 5px;">found abi</pre><br></div><div class="mb-4"><div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2"><h4 class="card-header-title"> <i class="far fa-code text-secondary me-1"></i>Contract Creation Code</h4><div class="mb-2 mb-lg-0"> <a id="btnConvert2"`,
		Expected:     "found abi",
	},
	{
		Name:         "not found abi",
		HtmlResponse: `<pre class="wordwrap js-copytextarea2 scrollbar-custom" id="js-copytextarea2" style"height: 200px; max-height: 400px; margin-top: 5px;">found abi</pre><br></div><div class="mb-4"><div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2"><h4 class="card-header-title"> <i classfar fa-code text-secondary me-1"></i>Contract Creation Code</h4><div class="mb-2 mb-lg-0"> <a id="btnConvert2"`,
		Expected:     "abi not found",
	},
}
