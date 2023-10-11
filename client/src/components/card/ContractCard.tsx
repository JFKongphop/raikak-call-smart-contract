import { VITE_API_ENDPOINT } from '@/configs/enviroment';
import ABIRequest from '@/lib/abi-request';
import { ABIElement, FunctionName, IAddressData } from '@/type/addressData';
import { AxiosResponse } from 'axios';
import { FC, useCallback, useEffect, useState } from 'react';
import { AiFillFolder, AiFillFolderOpen, AiOutlineEdit } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import ModalEditCollection from '../modal/ModalEditCollection';
import FunctionContractCard from './FunctionContractCard';

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
  const [abiElement, setAbiElement] = useState<ABIElement[]>([]);
  const [currentEditCollection, setCurrentEditCollection] = useState<IAddressData>({
    name: '',
    address: '',
    chainId: 0,
  });

  const myAddress = localStorage.getItem('addressContract');
  const addressContract: IAddressData[] = myAddress 
    ? JSON.parse(myAddress)
    : [];

  const toggleCardHandler = useCallback(()=> {
    setToggleCard((prevToggle) => !prevToggle);
  }, [toggleCard]);

  const toggleEditNameHandler = useCallback(()=> {
    setToggleEditName((prevToggle) => !prevToggle);

    if (!toggleEditName) {
      const collectionEdit = addressContract.filter(
        (data) => data.address === address
      )[0];
      console.log(collectionEdit)
      setCurrentEditCollection(collectionEdit);
    }
  }, [toggleEditName]);

  useEffect(() => {
    (async () => {
      if (toggleCard) {
        const { data }: AxiosResponse<ABIElement[]> = await ABIRequest.get(
          `${VITE_API_ENDPOINT}/${address}/${chainId}`
        );
        setAbiElement(data);
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

  const editCollectionHandler = (name: string) => {
    const newCollectionName: IAddressData = {
      ...currentEditCollection,
      name,
    }
    const editedCollections: IAddressData[] = addressContract.map(
      (oldCollection) => 
        oldCollection.address === currentEditCollection.address 
          ? newCollectionName 
          : oldCollection
    );

    localStorage.setItem(
      'addressContract', 
      JSON.stringify(editedCollections)
    );

    setToggleEditName((prevToggle) => !prevToggle);
  }

  const deleteCollectionHandler = (address: string) => {

  }

  return (
    <div 
      className="relative min-h-14 w-full rounded-md bg-slate-600 text-sm flex flex-col items-center justify-between p-2 text-white cursor-pointer gap-4"
    >
      <ModalEditCollection 
        showModal={toggleEditName} 
        collectionName={'A'} 
        setShowModal={setToggleEditName} 
        buttonAction={editCollectionHandler}        
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
          onClick={() => console.log('test')}
        >
          <button 
            className="hover:bg-slate-400/50 h-full w-1/2 rounded-md"
            onClick={toggleEditNameHandler}
          >
            <AiOutlineEdit className="text-xl rounded-sm w-full"/>
          </button>
          <button className="hover:bg-slate-400/50 h-full w-1/2 rounded-md">
            <BiTrash className="text-xl rounded-sm w-full"/>
          </button>
        </div>
      </div>
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
                />
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default ContractCard;