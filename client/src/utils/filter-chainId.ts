import { chainIdLists } from "@/source/chain"

export const filterChainIdHandler = (chainId: number): string => {
  const contractChain = chainIdLists.filter((data) => data.id === chainId)[0];

  return `${contractChain.name} ${contractChain.id}`;
}