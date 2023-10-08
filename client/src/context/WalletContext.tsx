import { createContext } from "react";
import { WalletType } from "@/type/walletType";

const WalletContext = createContext<WalletType>({
  provider: {},
  signer: {},
  chainId: 0,
  address: '',
  shortAddress: '',
  onConnectWallet: () => {}
});

export default WalletContext;