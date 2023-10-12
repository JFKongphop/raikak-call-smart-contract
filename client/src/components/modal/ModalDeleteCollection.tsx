import { Fragment, useState, useCallback, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, Transition } from '@headlessui/react';

import ButtonHandler from '@/components/button/ButtonHandler';

import type { FC, SetStateAction, Dispatch } from 'react';
import { IAddressData } from '@/type/addressData';
import WalletContext from '@/context/WalletContext';

interface IModalEditCollection {
  showModal: boolean;
  collection: IAddressData;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  buttonAction: (collectionName: string) => void;
}

const ModalDeleteCollection: FC<IModalEditCollection> = ({
  showModal,
  collection,
  setShowModal,
  buttonAction,
}) => {
  const { onDeleteCollection } = useContext(WalletContext);

  const deleteCollectionHandler = () => {
    console.log('de', collection)
    onDeleteCollection(collection);
    setShowModal(false);
  }

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
                    Delete Collection
                  </header>
                  <div className="w-full">
                    <ButtonHandler 
                      name={'Edit'}
                      status={true}
                      onHandlerFunction={deleteCollectionHandler}
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


export default ModalDeleteCollection