import type { FC } from 'react';

interface IButtonHandler {
  name: string;
  onHandlerFunction: () => void;
}

const ButtonHandler: FC<IButtonHandler> = ({
  name,
  onHandlerFunction
}) => {
  return (
    <button 
      className="w-full border-2 border-white font-medium rounded-md p-2 h-10 flex items-center justify-center text-white bg-slate-600 hover:bg-slate-700"
      onClick={onHandlerFunction}
    >
      <p>{name}</p>
    </button>
  )
}

export default ButtonHandler;