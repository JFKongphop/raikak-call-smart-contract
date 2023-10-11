import { FunctionName } from '@/type/addressData';
import { FC } from 'react';

interface IFunctionContractCard {
  method: string;
  functionName: string;
}

const FunctionContractCard: FC<IFunctionContractCard> = ({ 
  method,
  functionName
 }) => {

  const stateMutabilityStatusHandler = (stateMutability: string): boolean => {
    return (stateMutability === 'view' || stateMutability === 'pure');
  };

  return (
    <div 
      className="flex flex-row w-full border items-center justify-between rounded-md h-8 py-1 px-2 bg-slate-800 hover:bg-slate-700"
    >
      <p
        className={`border-2 ${stateMutabilityStatusHandler(method) ? ' border-yellow-500 text-yellow-500': 'border-red-500 text-red-500'} font-medium rounded-md text-xs w-[50px] text-center`}
      >
        {
          stateMutabilityStatusHandler(method) 
          ? 'READ' 
          : 'WRITE'
        }
      </p>
      <p className="font-medium">{functionName}</p>
    </div>
  )
}

export default FunctionContractCard;