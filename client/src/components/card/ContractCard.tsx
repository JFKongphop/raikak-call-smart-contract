import { 
  useCallback, 
  useContext, 
  useEffect, 
  useState 
} from 'react';
import { 
  AiFillFolder, 
  AiFillFolderOpen, 
  AiOutlineEdit 
} from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';

import ModalEditCollection from '@/components/modal/ModalEditCollection';
import FunctionContractCard from '@/components/card/FunctionContractCard';
import ModalDeleteCollection from '@/components/modal/ModalDeleteCollection';
import WalletContext from '@/context/WalletContext';

import { VITE_API_ENDPOINT } from '@/configs/enviroment';
import ABIRequest from '@/lib/abi-request';

import type { AxiosResponse } from 'axios';
import type { FC } from 'react';
import { 
  initialCollection,
  type ABIElement, 
  type FunctionName, 
  type IAddressData, 
  initialABIElement
} from '@/type/addressData';
import { LoadingOutlined } from '@ant-design/icons';

interface IContractCard {
  name: string;
  address: string;
  chainId: number;
}

const ContractCard: FC<IContractCard> = ({
  name,
  address,
  chainId
}) => {

  const [toggleCard, setToggleCard] = useState<boolean>(false);
  const [toggleEditName, setToggleEditName] = useState<boolean>(false);
  const [toggleDeleteCard, setToggleDeleteCard] = useState<boolean>(false);
  const [abiElement, setAbiElement] = useState<ABIElement[]>([]);
  const [currentEditCollection, setCurrentEditCollection] = useState<IAddressData>(initialCollection);
  const [loadingAbi, setLoadingAbi] = useState<boolean>(false);

  const { contractCollections, onGetContractAbi, onGetCollection } = useContext(WalletContext);

  const toggleCardHandler = useCallback(()=> {
    setToggleCard((prevToggle) => !prevToggle);

    if (toggleCard) {
      onGetCollection(initialCollection);
      onGetContractAbi(initialABIElement);
    }
    else {
      onGetCollection({ address, chainId, name });
    }
  }, [toggleCard]);

  const toggleEditNameHandler = useCallback(()=> {
    setToggleEditName((prevToggle) => !prevToggle);

    if (!toggleEditName) {
      const collectionEdit = contractCollections.filter(
        (data) => data.address === address
      )[0];
      setCurrentEditCollection(collectionEdit);
    }
  }, [toggleEditName]);

  const toggleDeleteCollectionHandler = useCallback(() => {
    setToggleDeleteCard((prevToggle) => !prevToggle);

    if (!toggleDeleteCard) {
      const collectionDelete = contractCollections.filter(
        (data) => data.address === address
      )[0];
      setCurrentEditCollection(collectionDelete);
    }
  }, [toggleDeleteCard]);

  const getCurrentFunctionHandler = (functionName: string) => {
    const abiSelectedFunction = abiElement.filter(
      (abi) => abi.function === functionName
    )[0];
    onGetContractAbi(abiSelectedFunction);
  }
  
  useEffect(() => {
    (async () => {
      if (toggleCard) {
        setLoadingAbi(true);
        const { data }: AxiosResponse<ABIElement[]> = await ABIRequest.get(
          `${VITE_API_ENDPOINT}/${address}/${chainId}`
        );
        setAbiElement(data);
        setLoadingAbi(false);
      }
      else setAbiElement([]);
    })();
  }, [toggleCard]);

  const functionName: FunctionName[] = abiElement.map((data) => { 
    return {
      function: data.function,
      method: data.stateMutability
    }
  }).sort((a, b) => {
    const methodPriority: any = { 
      payable: 1 , 
      nonpayable: 2, 
      pure: 3, 
      view: 3
    };

    return methodPriority[a.method] - methodPriority[b.method];
  });


  return (
    <div 
      className="relative min-h-14 w-full rounded-md bg-slate-600 text-sm flex flex-col items-center justify-between p-2 text-white cursor-pointer gap-4"
    >
      <ModalEditCollection 
        showModal={toggleEditName} 
        collection={currentEditCollection} 
        setShowModal={setToggleEditName} 
      />
      <ModalDeleteCollection 
        showModal={toggleDeleteCard}
        collection={currentEditCollection}
        setShowModal={setToggleDeleteCard}
      />
      <div className="flex flex-row justify-between items-center w-full h-8">
        <div 
          className="flex flex-row gap-1 items-center w-[70%]"
          onClick={toggleCardHandler}
        >
          {toggleCard 
            ? <AiFillFolderOpen className="text-2xl pl-[1px]"/> 
            : <AiFillFolder className="text-2xl"/>
          }
          <p className="font-bold">{name}</p>
        </div>
        <div 
          className="flex flex-row justify-between items-center gap-2 w-[20%] h-full"
        >
          <button 
            className="hover:bg-slate-400/50 h-full w-1/2 rounded-md"
            onClick={toggleEditNameHandler}
          >
            <AiOutlineEdit className="text-xl rounded-sm w-full"/>
          </button>
          <button 
            className="hover:bg-slate-400/50 h-full w-1/2 rounded-md"
            onClick={toggleDeleteCollectionHandler}
          >
            <BiTrash className="text-xl rounded-sm w-full"/>
          </button>
        </div>
      </div>
      {
        loadingAbi ?
        (
          <div
            className="flex flex-row justify-center h-full items-center gap-2 font-medium white"
          >
            <LoadingOutlined
              style={{
                fontSize: 20,
                color: 'white'
              }}
              spin
              rev={undefined}
            />
            <p>Loading...</p>
          </div>
        )
        :
        (
          <>
            {
              abiElement.length > 0 &&
              (
                <div className="flex flex-col gap-1 w-full">
                  {
                    functionName.map((data) => (
                      <FunctionContractCard
                        key={data.function}
                        method={data.method}
                        functionName={data.function}
                        onCurrentFunction={getCurrentFunctionHandler}
                      />
                    ))
                  }
                </div>
              )
            }
          </>
        )
      }
    </div>
  )
}

export default ContractCard;