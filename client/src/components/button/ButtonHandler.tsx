import type { FC } from 'react';

interface IButtonHandler {
  name: string;
  status?: boolean;
  onHandlerFunction: () => void;
}

const ButtonHandler: FC<IButtonHandler> = ({
  name,
  status,
  onHandlerFunction
}) => {
  let button: JSX.Element = <></>;
  if (status) {
    button = (
      <button 
        className={`w-full border-2 border-white font-medium rounded-md p-4 h-10 flex items-center justify-center text-white bg-slate-600 hover:bg-slate-700`}
        onClick={onHandlerFunction}
      >
        <p>{name}</p>
      </button>
    );
  }
  else {
    button = (
      <button 
        className={`w-full border-2 border-white font-medium rounded-md p-4 h-10 flex items-center justify-center text-white bg-slate-600 hover:bg-slate-700 cursor-not-allowed`}
        disabled={!status}
        onClick={onHandlerFunction}
      >
        <p>{name}</p>
      </button>
    );
  }

  return <>{button}</>
}

export default ButtonHandler;