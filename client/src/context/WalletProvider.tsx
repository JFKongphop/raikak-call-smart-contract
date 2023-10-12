import { useEffect, useReducer, useState } from "react";
import { Signer, ethers } from "ethers";
import WalletContext from "./WalletContext";

import type { FC, ReactNode } from "react";
import type { AllowAbiHandleType, WalletType } from "@/type/walletType";
import { chainIdLists } from "@/source/chain";
import { INetwork } from "@/type/network";
import { IAddressData } from "@/type/addressData";
import { setLocalStorage } from "@/utils/localstorage-handler";

interface IWalletProvider {
  children: ReactNode;
}

type Provider = ethers.providers.Web3Provider;

const myAddress = localStorage.getItem('addressContract');
const addressContract: IAddressData[] = myAddress 
  ? JSON.parse(myAddress)
  : [];

type AppActions = {
  type: 'EDIT' | 'ADD' | 'DELETE';
  payload: IAddressData; // Make the payload optional
};

function appReducer(state: IAddressData[], action: AppActions): IAddressData[] {
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
      const newCollection = [...addressContract, collectionInput];
      setLocalStorage(newCollection);

      return [...state, collectionInput];

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
  // const [abiCollections, setAbiCollections] = useState<IAddressData[]>(addressContract);

  const [abiCollections, dispatchABI] = useReducer(appReducer, addressContract);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
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

  // 0x980306e668Fa1E4246e2AC86e06e12B67A5fD087
  const createNewCollectionHandler = (collection: IAddressData) => {
    dispatchABI({ type: 'ADD', payload: collection });
  }

  const updateCollectionNameHandler = (collection: IAddressData) => {
    dispatchABI({ type: 'EDIT', payload: collection })
  }

  const deleteCollectionHandler = (collection: IAddressData) => {
    console.log(collection)
    dispatchABI({ type: 'DELETE', payload: collection });
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
    abiCollections,
    onConnectWallet: connectWallet,
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