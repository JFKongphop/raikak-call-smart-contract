import { useEffect, useState } from "react";
import { Signer, ethers } from "ethers";
import WalletContext from "./WalletContext";

import type { FC, ReactNode } from "react";
import type { WalletType } from "@/type/walletType";
import { chainIdLists } from "@/source/chain";
import { INetwork } from "@/type/network";

interface IWalletProvider {
  children: ReactNode;
}

type Provider = ethers.providers.Web3Provider;

const WalletProvider: FC<IWalletProvider> = ({ children }) => {
  const [provider, setProvider] = useState<Provider | object>({});
  const [signer, setSigner] = useState<Signer | object>({});
  const [network, setNetwork] = useState<INetwork>({ name: '', id: 0 });
  const [address, setAddress] = useState<string>('');
  const [shortAddress, setShortAddress] = useState<string>('');

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
    onConnectWallet: connectWallet,
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}

export default WalletProvider;