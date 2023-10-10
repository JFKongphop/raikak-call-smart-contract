import WalletContext from '@/context/WalletContext';
import { useContext } from 'react';
import ButtonHandler from '../button/ButtonHandler';

import type { 
  FC, 
  ReactNode 
} from 'react';

interface IHeader {
  children: ReactNode
}

const Header: FC<IHeader> = ({ children }) => {
  const { 
    shortAddress,
    network,
    onConnectWallet 
  } = useContext(WalletContext);

  return (
    <div className="flex flex-col h-screen">
      <header 
        className="w-full h-[10%] bg-slate-800 flex flex-row p-4 items-center justify-between"
      >
        <h1 className="text-4xl text-white font-bold ">
          Raikak
        </h1>
        <div className="flex flex-row gap-4">
          <div 
            className="w-full ring-2 ring-white font-medium rounded-md p-2 h-10 flex items-center justify-center text-white bg-slate-600"
          >
            {network.id > 0 ?
              (
                <div className="flex flex-row items-center gap-2">
                  <p>{network.name}</p>
                  <p>{network.id}</p>
                </div>
              )
              :
             (
                <p>Network</p>
              )
            }
            
          </div>
          <div className="w-[160px]">
            <ButtonHandler 
              name={shortAddress.length > 0 ? shortAddress : 'Connect Wallet'}
              onHandlerFunction={onConnectWallet}
            />
          </div>
        </div>
      </header>
      <div className="w-full h-[85%] bg-slate-600">
        {children}
      </div>
      <footer className="bg-slate-800 w-full h-[5%]" />
    </div>
  )
}

export default Header;
