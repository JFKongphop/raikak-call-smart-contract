import type { 
  ChangeEvent, 
  FC 
} from 'react';

interface IArgumentInput {
  name: string;
  type: string;
  onGetArgumentValues: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ArgumentInput: FC<IArgumentInput> = ({
  name,
  type,
  onGetArgumentValues
}) => {

  const getArgumentsHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onGetArgumentValues(e);
  };

  return (
    <div
      key={name}
      className="relative flex flex-col w-full gap-2"
      >
      <label 
        className="font-medium text-xl"
      >
        {name}
      </label>
      <input 
        type={type.includes('int') ? 'number' : 'text'}
        placeholder={type}
        name={name}
        onChange={getArgumentsHandler}
        className={`outline-none px-2 h-10 rounded-md text-md text-slate-800 ring-2 ring-slate-800`}
      />
      </div>
  )
}

export default ArgumentInput;

