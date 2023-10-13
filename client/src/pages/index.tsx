import ButtonHandler from '@/components/button/ButtonHandler';
import ModalSearchABIAddress from '@/components/modal/ModalSearchABIAddress';
import ContractCard from '@/components/card/ContractCard';

import WalletContext from '@/context/WalletContext';

import { 
  useContext,
  useEffect, 
  useRef, 
  useState 
} from 'react';

import { useForm } from 'react-hook-form';

import type { IAddressData } from '@/type/addressData';


interface ISearchCollectionName {
  collectionName: string;
}

const defaultValues = {
  collectionName: ''
}

const index = () => {
  const [chatBoxHeight, setChatBoxHeight] = useState<number>(0);
  const [openNewRequest, setOpenNewRequest] = useState<boolean>(false);

  const { register, watch } = useForm<ISearchCollectionName>({ defaultValues });

  const toggleModalRequest = () => {
    setOpenNewRequest((prevToggle) => !prevToggle);
  }

  const { abiCollections } = useContext(WalletContext);

  const searchContractHandler = (): IAddressData[] => {
    return abiCollections.filter((region: any) => {
      return ['name'].some((searchRegions) => {
        return (
          region[searchRegions]
            .toString()
            .toLowerCase()
            .indexOf(watch('collectionName').toLowerCase()) > -1
        );
      });
    });
  };

  const chatBoxRef = useRef<any>();
  useEffect(() => {
    if (chatBoxRef.current) {
      const divHeight = chatBoxRef.current.clientHeight;
      setChatBoxHeight(divHeight);
    }
  }, []);

  return (
    <div className="flex flex-row h-full" ref={chatBoxRef}>
      <ModalSearchABIAddress
        showModal={openNewRequest}
        setShowModal={setOpenNewRequest}
      />
      <div 
        className="w-1/4 ring-2 ring-slate-800 flex flex-col" 
        style={{ height: chatBoxHeight }} 
      >
        <div 
          className="h-auto w-full bg-slate-600 flex flex-col justify-center px-2 pt-4 pb-3 gap-4 border-b-2 border-slate-800"
        >
          <div 
            className="w-full flex flex-row justify-between items-center font-medium text-md text-white"
          >
            <p>Collections</p>
            <div className="w-[160px]">
              <ButtonHandler
                name={'New Request'}
                status={true}
                onHandlerFunction={toggleModalRequest}
              />
            </div>
          </div>
          <input 
            type="text" 
            {...register('collectionName')}
            className="outline-none p-2 rounded-md text-xs" 
          />
        </div>
        <div 
          className="h-[90%] flex flex-col gap-3 overflow-y-scroll items-start justify-start p-2 pr-1 bg-slate-400"
        >
          {
            searchContractHandler().map((data) => (
              <ContractCard
                key={data.address}
                name={data.name}
                address={data.address}
                chainId={data.chainId}
              />
            ))
          }
        </div>
      </div>
      <div className="w-3/4"></div>
    </div>
  )
}

export default index;