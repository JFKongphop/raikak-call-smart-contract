import { FC, useCallback } from 'react';

interface IFunctionContractCard {
  method: string;
  functionName: string;
  onCurrentFunction: (name: string) => void;
}

const FunctionContractCard: FC<IFunctionContractCard> = ({ 
  method,
  functionName,
  onCurrentFunction,
 }) => {

  const stateMutabilityStatusHandler = (stateMutability: string): boolean => {
    return (stateMutability === 'view' || stateMutability === 'pure');
  };

  const getCurrentFunctionHandler = useCallback(() => {
    onCurrentFunction(functionName);
  }, [functionName]);

  return (
    <button 
      className="flex flex-row w-full border items-center justify-between rounded-md h-8 py-1 pr-1 pl-1 bg-slate-800 hover:bg-slate-700"
      onClick={getCurrentFunctionHandler}
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
    </button>
  )
}

export default FunctionContractCard;