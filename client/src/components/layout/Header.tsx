import WalletContext from '@/context/WalletContext';
import { 
  useContext,
  type FC, 
  type ReactNode 
} from 'react';

interface IHeader {
  children: ReactNode
}

const Header: FC<IHeader> = ({ children }) => {
  const { shortAddress, onConnectWallet } = useContext(WalletContext);
  return (
    <div className="flex flex-col h-screen">
      <header 
        className="w-full h-20 bg-slate-800 flex flex-row p-4 items-center justify-between"
      >
        <h1 className="text-4xl text-white font-bold ">
          Raikak
        </h1>
        <button 
          className="w-[160px] border-2 font-medium rounded-md p-2 flex items-center justify-center text-white bg-slate-600 hover:bg-slate-700"
          onClick={onConnectWallet}
        >
          <p>{shortAddress.length > 0 ? shortAddress : 'Connect Wallet'}</p>
        </button>
      </header>
      <div className='h-screen'>{children}</div>
    </div>
  )
}

export default Header;

