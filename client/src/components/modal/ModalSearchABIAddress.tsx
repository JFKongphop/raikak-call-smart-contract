import {
  Fragment, 
  useState, 
  useCallback, 
  useEffect, 
  useContext 
} from 'react';
import { 
  Menu, 
  Dialog, 
  Transition 
} from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { utils } from 'ethers';
import axios from 'axios';

import ButtonHandler from '@/components/button/ButtonHandler';
import WalletContext from '@/context/WalletContext';

import { chainIdLists } from '@/source/chain';
import ABIRequest from '@/lib/abi-request';
import { toastifyConfig } from '@/lib/toastify-config';
import { VITE_API_ENDPOINT } from '@/configs/enviroment';

import type { SubmitHandler } from 'react-hook-form';
import type { 
  FC, 
  SetStateAction, 
  Dispatch 
} from 'react';
import type { INetwork } from '@/type/network';
import type { AxiosError } from 'axios';



interface IModalSearchABIAddress {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

interface IFormAddress {
  collectionName: string;
  address: string;
}

const defaultValues = {
  collectionName: '',
  address: ''
};

const ModalSearchABIAddress: FC<IModalSearchABIAddress> = ({
  showModal,
  setShowModal,
}) => {
  const [network, setNetwork] = useState<INetwork>({
    name: 'Ethereum Mainnet',
    id: 1
  });

  const { contractCollections, onCreateNewCollection } = useContext(WalletContext);
 
  const { 
    register, 
    handleSubmit,
    reset,
    formState: { errors, dirtyFields }
  } = useForm<IFormAddress>({ defaultValues });

  const { 
    address: validAddress, 
    collectionName: validCollectionName 
  } = dirtyFields;
  const formIsValid = validAddress && validCollectionName;

  const networkSelector = useCallback((network: INetwork) => {
    setNetwork(network);
  }, [network]);

  const searchABIHandler: SubmitHandler<IFormAddress> = async (data) => {
    const { address, collectionName } = data;
    const chainId = network.id;
    try {
      await ABIRequest.get(`${VITE_API_ENDPOINT}/${address}/${chainId}`);
      const haveAddress = contractCollections.some((data: any) => {
        if (data.address === address && data.chainId === chainId) {
          return true;
        }
      });

      if (!haveAddress) {
        onCreateNewCollection({ address, chainId, name: collectionName });
        toastifyConfig('success', 'Successfully search address');
        setShowModal(false);
      }
      else toastifyConfig('warning', 'Duplicate Address');
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error as AxiosError<any>;
        toastifyConfig('error', response!.data.message);
      }
    }
  }

  useEffect(() => {
    reset(defaultValues);
  }, [showModal]);

  return (
    <Transition.Root 
      as={Fragment} 
      show={showModal}
    >
      <Dialog
        as="div"
        className="relative z-10"
        onClose={setShowModal as Dispatch<SetStateAction<boolean>>}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div 
            className="fixed inset-0 hidden bg-slate-500 bg-opacity-75 transition-opacity md:block" 
          />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div 
            className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel 
                className="collection-card p-6 flex w-[500px] h-auto bg-slate-800 transform text-left text-base transition rounded-md shadow-xl"
              >
                <div 
                  className="flex flex-col gap-10 items-center w-full text-white"
                >
                  <header className="font-semibold text-2xl">
                    New Request
                  </header>
                  <div className="flex flex-col w-full gap-8">
                    <div className="relative flex flex-col w-full gap-2">
                      <label className="font-medium">Collection Name</label>
                      <input 
                        type="text" 
                        {...register('collectionName', { 
                          required: 'Invalid collection name'
                        })}
                        className={`outline-none px-2 h-10 rounded-md text-md text-slate-800 ${errors.collectionName && 'ring-2 ring-red-500'} `} 
                      />
                      {errors.collectionName && 
                        (
                          <p 
                            className="absolute -bottom-6 text-red-500 text-sm"
                          >
                            Invalid collection name
                          </p>
                        )
                      }
                    </div>
                    <div className="relative flex flex-col w-full gap-2">
                      <label className="font-medium">Contract Address</label>
                      <input 
                        type="text" 
                        {...register('address', { 
                          required: 'Invalid address' ,
                          validate: (data) => utils.isAddress(data)
                        })}
                        className={`outline-none px-2 h-10 rounded-md text-md text-slate-800 ${errors.address && 'ring-2 ring-red-500'}`} 
                      />
                      {errors.address && 
                        (
                          <p 
                            className="absolute -bottom-6 text-red-500 text-sm"
                          >
                            Invalid address
                          </p>
                        )
                      }
                    </div>
                    <div className="flex flex-col w-full gap-2">
                      <label className="font-medium">Chain</label>
                      <Menu 
                        as="div" 
                        className="relative text-left h-10 w-full bg-white flex justify-center items-center rounded-md cursor-pointer"
                      >
                        <div className="w-full">
                          <Menu.Button
                            className="w-full flex flex-row justify-between font-medium text-slate-800 p-4"
                          >
                            <p>{network.name}</p>
                            <p>{network.id}</p>
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items 
                            className="absolute bottom-12 z-10 mt-2 w-full origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <div className="h-[240px] overflow-y-auto p-2 pr-1">
                              {
                                chainIdLists.map((data: INetwork) => (
                                  <Menu.Item key={data.id}>
                                    {({ active }) => (
                                      <button
                                        onClick={() => networkSelector(data)}
                                        className={`${active && 'bg-slate-200'} flex flex-row justify-between items-center text-md p-2 w-full font-medium text-slate-800 h-10 rounded-md`}
                                      >
                                        <p>{data.name}</p>
                                        <p>{data.id}</p>
                                      </button>
                                    )}
                                  </Menu.Item>
                                ))
                              }
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="w-full">
                    <ButtonHandler 
                      name={'Import'}
                      status={formIsValid}
                      onHandlerFunction={handleSubmit(searchABIHandler)}
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalSearchABIAddress;
