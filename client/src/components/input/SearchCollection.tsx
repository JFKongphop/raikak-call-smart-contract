import { ISearchCollectionName } from '@/type/contract-handle';
import { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface ISearchCollection {
  register: UseFormRegister<ISearchCollectionName>;
}

const SearchCollection: FC<ISearchCollection> = ({ register }) => {
  return (
    <input 
      type="text" 
      {...register('collectionName')}
      className="outline-none p-2 rounded-md text-xs" 
    />
  )
}

export default SearchCollection;