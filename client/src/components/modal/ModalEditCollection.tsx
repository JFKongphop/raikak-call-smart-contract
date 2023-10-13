import { 
  Fragment, 
  useEffect, 
  useContext 
} from 'react';
import { 
  Dialog, 
  Transition 
} from '@headlessui/react';
import { useForm } from 'react-hook-form';

import ButtonHandler from '@/components/button/ButtonHandler';
import WalletContext from '@/context/WalletContext';

import type { 
  FC, 
  SetStateAction,
  Dispatch 
} from 'react';
import type { IAddressData } from '@/type/addressData';

interface IModalEditCollection {
  showModal: boolean;
  collection: IAddressData;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

interface IFormAddress {
  collectionName: string;
}

const ModalEditCollection: FC<IModalEditCollection> = ({
  showModal,
  collection,
  setShowModal,
}) => {
  const { onUpdateCollection } = useContext(WalletContext);
  const defaultValues = {
    collectionName: collection.name
  };

  const { 
    register, 
    handleSubmit,
    reset,
    watch,
    formState: { errors, dirtyFields }
  } = useForm<IFormAddress>({ defaultValues });

  const formIsValid = dirtyFields.collectionName 
  || watch('collectionName').length > 0;

  const searchABIHandler = (data: IFormAddress) => {
    const editedCollectionName: IAddressData = {
      ...collection,
      name: data.collectionName
    }
    onUpdateCollection(editedCollectionName);
    setShowModal(false);
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
                    Edit Collection Name
                  </header>
                  <div className="flex flex-col w-full gap-8">
                    <div className="relative flex flex-col w-full gap-2">
                      <label className="font-medium">Collection Name</label>
                      <input 
                        type="text" 
                        {...register('collectionName', { 
                          required: 'Invalid collection name',
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
                  </div>
                  <div className="w-full">
                    <ButtonHandler 
                      name={'Edit'}
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

export default ModalEditCollection;