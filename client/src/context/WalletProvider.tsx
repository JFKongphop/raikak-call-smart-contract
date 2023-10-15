import { 
  useEffect, 
  useReducer, 
  useState 
} from "react";
import { ethers } from "ethers";

import WalletContext from "./WalletContext";
import { chainIdLists } from "@/source/chain";
import { 
  getLocalStorage, 
  setLocalStorage 
} from "@/utils/localstorage-handler";

import type { Signer } from "ethers";
import type { 
  FC, 
  ReactNode 
} from "react";
import type{ INetwork } from "@/type/network";
import { initialABIElement, type ABIElement, type IAddressData, initialCollection } from "@/type/addressData";
import type { WalletType } from "@/type/walletType";

interface IWalletProvider {
  children: ReactNode;
}

type Provider = ethers.providers.Web3Provider;

const addressContract: IAddressData[] = getLocalStorage();

type AppActions = {
  type: 'EDIT' | 'ADD' | 'DELETE';
  payload: IAddressData;
};

const abiReducer = (state: IAddressData[], action: AppActions): IAddressData[] => {
  const collectionInput = action.payload;
  switch (action.type) {
    case 'EDIT':      
      const editedCollections: IAddressData[] = state.map(
        (oldCollection) => 
          oldCollection.address === collectionInput.address 
            ? collectionInput 
            : oldCollection
      );
      setLocalStorage(editedCollections);

      return editedCollections;

    case 'ADD':
      const newCollection = [...state, collectionInput];
      setLocalStorage(newCollection);

      return newCollection;

    case 'DELETE':
      const filteredCollection: IAddressData[] = state.filter(
        (oldCollection) => oldCollection.address !== collectionInput.address
      )
      setLocalStorage(filteredCollection);

      return filteredCollection;

    default:
      return state;
  }
}

const WalletProvider: FC<IWalletProvider> = ({ children }) => {
  const [provider, setProvider] = useState<Provider | object>({});
  const [signer, setSigner] = useState<Signer | object>({});
  const [network, setNetwork] = useState<INetwork>({ name: '', id: 0 });
  const [address, setAddress] = useState<string>('');
  const [shortAddress, setShortAddress] = useState<string>('');
  const [currentContractAbi, setCurrentContractAbi] = useState<ABIElement>(initialABIElement);
  const [currentCollection, setCurrentCollection] = useState<IAddressData>(initialCollection);

  const [contractCollections, dispatchABI] = useReducer(abiReducer, addressContract);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider: Provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      
      const signer = provider.getSigner();
      const { chainId } = await provider.getNetwork();
      const address = await signer.getAddress();
      const shortAddress = `${address.slice(0,5)}...${address.slice(address.length - 5, address.length)}`;
      const network = chainIdLists.filter((data) => data.id === chainId)[0];

      setProvider(provider);
      setSigner(signer);
      setNetwork(network);
      setAddress(address);
      setShortAddress(shortAddress);
    }
  }

  const createNewCollectionHandler = (collection: IAddressData) => {
    dispatchABI({ type: 'ADD', payload: collection });
  }

  const updateCollectionNameHandler = (collection: IAddressData) => {
    dispatchABI({ type: 'EDIT', payload: collection })
  }

  const deleteCollectionHandler = (collection: IAddressData) => {
    dispatchABI({ type: 'DELETE', payload: collection });
  }

  const getContractAbi = (abi: ABIElement) => {
    setCurrentContractAbi(abi);
  }

  const getCurrentCollection = (collection: IAddressData) => {
    setCurrentCollection(collection);
  }

  window.ethereum.on('chainChanged', (chainId) => {
    const id = Number(BigInt(chainId as unknown as string).toString());
    const network = chainIdLists.filter((data) => data.id === id)[0];
    setNetwork(network);
  });

  useEffect(() => {
    (async () => await connectWallet())();
  }, []);

  const value: WalletType = {
    provider,
    signer,
    network,
    address,
    shortAddress,
    contractCollections,
    currentContractAbi,
    currentCollection,
    onConnectWallet: connectWallet,
    onGetContractAbi: getContractAbi,
    onGetCollection: getCurrentCollection,
    onCreateNewCollection: createNewCollectionHandler,
    onUpdateCollection: updateCollectionNameHandler,
    onDeleteCollection: deleteCollectionHandler,
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}

export default WalletProvider;