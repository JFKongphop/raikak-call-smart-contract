export const generateUrlContract = (
  address: string,
  chainId: number,
): string => {
  switch (chainId) {
    case 0:
      return `https://etherscan.io/address/${address}#code`;
    case 5:
      return `https://goerli.etherscan.io/address/${address}#code`;
    case 10:
      return `https://optimistic.etherscan.io/address/${address}#code`;
    case 56:
      return `https://bscscan.com/token/${address}#code`;
    case 87:
      return `https://testnet.bscscan.com/address/${address}#code`;
    case 137:
      return `https://polygonscan.com/address/${address}#code`;
    case 420:
      return `https://goerli-optimism.etherscan.io/address/${address}#code`;
    case 80001:
      return `https://mumbai.polygonscan.com/address/${address}#code`;
    case 42161:
      return `https://arbiscan.io/address/${address}#code`;
    default:
      return '';
  }
};
