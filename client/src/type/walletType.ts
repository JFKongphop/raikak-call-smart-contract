import { 
  ethers, 
  Signer 
} from 'ethers'
import { IAddressData } from './addressData';

type Provider = ethers.providers.Web3Provider

export interface WalletType {
  provider: Provider | object;
  signer: Signer | object;
  network: { name: string; id: number };
  address: string;
  shortAddress: string;
  abiCollections: IAddressData[];
  onConnectWallet: () => void;
  onCreateNewCollection: (collection: IAddressData) => void;
  onUpdateCollection: (collection: IAddressData) => void;
  onDeleteCollection: (collection: IAddressData) => void;
}
