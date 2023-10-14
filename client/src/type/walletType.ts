import { 
  ethers, 
  Signer 
} from 'ethers'
import type { 
  ABIElement, 
  IAddressData 
} from './addressData';

type Provider = ethers.providers.Web3Provider;

export interface WalletType {
  provider: Provider | object;
  signer: Signer | object;
  network: { name: string; id: number };
  address: string;
  shortAddress: string;
  contractCollections: IAddressData[];
  currentContractAbi: ABIElement;
  currentCollection: IAddressData;
  onConnectWallet: () => void;
  onGetContractAbi: (abi: ABIElement) => void;
  onGetCollection: (collection: IAddressData) => void;
  onCreateNewCollection: (collection: IAddressData) => void;
  onUpdateCollection: (collection: IAddressData) => void;
  onDeleteCollection: (collection: IAddressData) => void;
}
