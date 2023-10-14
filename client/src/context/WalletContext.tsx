import { createContext } from "react";
import { WalletType } from "@/type/walletType";
import { IAddressData, initialABIElement, initialCollection } from "@/type/addressData";

const WalletContext = createContext<WalletType>({
  provider: {},
  signer: {},
  network: { name: '', id: 0 },
  address: '',
  shortAddress: '',
  contractCollections: [],
  currentContractAbi: initialABIElement,
  currentCollection: initialCollection,
  onConnectWallet: () => { },
  onGetContractAbi: () => { },
  onGetCollection: () => { },
  onCreateNewCollection: () => { },
  onUpdateCollection: () => { },
  onDeleteCollection: () => { },
});

export default WalletContext;