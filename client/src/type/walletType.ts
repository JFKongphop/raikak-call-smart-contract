import { ethers, Signer } from 'ethers'

type Provider = ethers.providers.Web3Provider

export interface WalletType {
  provider: Provider | object;
  signer: Signer | object;
  network: { name: string; id: number };
  address: string;
  shortAddress: string;
  onConnectWallet: () => void;
}