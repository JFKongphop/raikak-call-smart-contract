import ButtonHandler from '@/components/button/ButtonHandler';
import ModalSearchABIAddress from '@/components/modal/ModalSearchABIAddress';
import ContractCard from '@/components/card/ContractCard';

import WalletContext from '@/context/WalletContext';

import { 
  ChangeEvent,
  FormEvent,
  useCallback,
  useContext,
  useEffect, 
  useRef, 
  useState 
} from 'react';

import { useForm } from 'react-hook-form';

import type { IAddressData } from '@/type/addressData';
import { filterChainIdHandler } from '@/utils/filter-chainId';


interface ISearchCollectionName {
  collectionName: string;
}

interface CustomTypeArguments {
  [key: string]: number | string;
}

const defaultValues = {
  collectionName: ''
}

const index = () => {
  const [chatBoxHeight, setChatBoxHeight] = useState<number>(0);
  const [openNewRequest, setOpenNewRequest] = useState<boolean>(false);
  const [paramValues, setParamValues] = useState<CustomTypeArguments>({});
  const [argumentValues, setArgumentValues] = useState<CustomTypeArguments>({});

  const getArgumentsHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setArgumentValues((prevArguments) => {
      return {
        ...prevArguments,
        [e.target.name]: e.target.value 
      }
    });
  }, [argumentValues]);

  const { 
    network, 
    contractCollections, 
    currentCollection, 
    currentContractAbi 
  } = useContext(WalletContext);

  const { address, chainId } = currentCollection;
  const { parameter } = currentContractAbi;

  useEffect(() => {
    setParamValues({});
    const paramValues: any = {}
    parameter.forEach((data) => {
      paramValues[data.name] = data.type.includes('int') ? 0 : ''
    });

    setParamValues(paramValues);
  }, [parameter])


  const { register, watch } = useForm<ISearchCollectionName>({ defaultValues });

  const toggleModalRequest = () => {
    setOpenNewRequest((prevToggle) => !prevToggle);
  }

  const searchContractHandler = (): IAddressData[] => {
    return contractCollections.filter((region: any) => {
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
      {
        chainId > 0 && 
        (
          <div className="w-3/4 h-full flex flex-col text-white">
            <div 
              className="w-full h-[10%] border-b-2 border-slate-800 flex flex-col p-3 justify-center"
            >
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-4 h-10 gap-3">
                  <div 
                    className="col-span-2 border-2 border-slate-800 bg-slate-700/70 rounded-md py-1 px-2 flex items-center"
                  >
                    <p className="">{address}</p>
                  </div>
                  <div 
                    className="col-span-1 border-2 border-slate-800 bg-slate-700/70 rounded-md py-1 px-2 flex items-center"
                  >
                    <p>
                      {network.id === chainId 
                        ? filterChainIdHandler(chainId) 
                        : `Please change network`
                      }
                    </p>
                  </div>
                  <div className="col-span-1">
                    <ButtonHandler 
                      name={'Send'} 
                      status={true}
                      onHandlerFunction={() => {}}                    
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[90%] grid grid-cols-2">
              <div className="cols-span-1 border-r-2 border-slate-800">
                <div 
                  className="w-full h-20 border-b-2 border-slate-800 grid grid-cols-5 text-xl font-medium"
                >
                  <div 
                    className="col-span-2 border-r-2 border-slate-800 h-full flex justify-center items-center p-2"
                  >
                    <div 
                      className="w-full h-full border-2 border-slate-800 rounded-md flex justify-center items-center bg-slate-400 text-slate-800"
                    >
                      <p>{currentContractAbi.stateMutability}</p>
                    </div>
                  </div>
                  <div 
                    className="col-span-3 h-full flex justify-center items-center p-2"
                  >
                    <div 
                      className="w-full h-full border-2 border-slate-800 rounded-md flex justify-center items-center bg-slate-400 text-slate-800"
                    >
                      <p>{currentContractAbi.function}</p>
                    </div>
                  </div>                  
                </div>
                <div className="flex flex-col gap-8 p-4 w-full">
                  {
                    parameter.map((param) => (
                      <div
                        key={param.name}
                        className="relative flex flex-col w-full gap-2"
                      >
                        <label 
                          className="font-medium text-xl"
                        >
                          {param.name} ({param.type.includes('uint') 
                            ? 'number' 
                            : 'text'})
                        </label>
                        <input 
                          type={param.type.includes('int') ? 'number' : 'text'}
                          placeholder={param.type}
                          name={param.name}
                          onChange={getArgumentsHandler}
                          className={`outline-none px-2 h-10 rounded-md text-md text-slate-800 ring-2 ring-slate-800`}
                        />
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="cols-span-1 flex flex-col w-full">
                <div className="h-20 border-b-2 border-slate-800 p-2">
                  <div 
                    className="w-full h-full border-2 border-slate-800 rounded-md flex justify-center items-center bg-slate-400 text-slate-800"
                  >
                    <p className="text-xl font-medium">Response</p>
                  </div>
                </div>
              </div>


            </div>
            
          </div>
        )
      }
    </div>
  )
}

export default index;