import { useState } from 'react';

import ButtonHandler from '../button/ButtonHandler';
import SearchCollection from '../input/SearchCollection';
import ContractCard from '../card/ContractCard';
import ModalSearchABIAddress from '../modal/ModalSearchABIAddress';

import { searchCollectionHandler } from '@/utils/search-collection';

import type { FC } from 'react';
import type { UseFormRegister, UseFormWatch } from 'react-hook-form';
import type { ISearchCollectionName } from '@/type/contract-handle';


interface ISideBarCollection {
  register: UseFormRegister<ISearchCollectionName>;
  watch: UseFormWatch<ISearchCollectionName>
}

const SideBarCollection: FC<ISideBarCollection> = ({
  register,
  watch
}) => {
  const [openNewRequest, setOpenNewRequest] = useState<boolean>(false);

  const toggleModalRequest = () => {
    setOpenNewRequest((prevToggle) => !prevToggle);
  }

  const filteredCollections = searchCollectionHandler(watch('collectionName'));

  return (
    <>
      <ModalSearchABIAddress
        showModal={openNewRequest}
        setShowModal={setOpenNewRequest}
      />
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
        <SearchCollection 
          register={register}
        />
      </div>
      <div 
        className="h-[90%] flex flex-col gap-3 overflow-y-scroll items-start justify-start p-2 pr-1 bg-slate-400"
      >
        {
          filteredCollections.map((data) => (
            <ContractCard
              key={data.address}
              name={data.name}
              address={data.address}
              chainId={data.chainId}
            />
          ))
        }
      </div>
    </>
  )
}

export default SideBarCollection;