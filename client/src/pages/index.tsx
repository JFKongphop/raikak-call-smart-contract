import ButtonHandler from '@/components/button/ButtonHandler';

import WalletContext from '@/context/WalletContext';
import { LoadingOutlined } from '@ant-design/icons';

import { 
  ChangeEvent,
  useCallback,
  useContext,
  useEffect, 
  useRef, 
  useState 
} from 'react';

import { useForm } from 'react-hook-form';

import type { ParameterFunction } from '@/type/addressData';
import { filterChainIdHandler } from '@/utils/filter-chainId';
import { CustomTypeArguments, ISearchCollectionName, ResponseData, initialResponseData } from '@/type/contract-handle';
import { sortArguments } from '@/utils/sorting-argument';
import { checkAddressIndexIsValid } from '@/utils/check-index-address';
import { checkIntegerIndexIsValid } from '@/utils/check-index-integer';
import { Signer, ethers, utils } from 'ethers';
import { checkValidNumber } from '@/utils/check-valid-number';
import SideBarCollection from '@/components/sidebar/SideBarCollection';
import { RegisterProps, WatchProps } from '@/type/cutom-type-hook-form';
import ArgumentInput from '@/components/input/ArgumentInput';

type Provider = ethers.providers.Web3Provider;
type Transaction = ethers.providers.TransactionResponse;


const defaultValues = {
  collectionName: ''
}

const index = () => {
  const [chatBoxHeight, setChatBoxHeight] = useState<number>(0);
  const [openNewRequest, setOpenNewRequest] = useState<boolean>(false);
  const [argumentValues, setArgumentValues] = useState<CustomTypeArguments>({});
  const [inputByMsg, setInputByMsg] = useState<number>(0);
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<ResponseData>(initialResponseData)

  const { 
    provider,
    signer,
    network,
    currentCollection, 
    currentContractAbi 
  } = useContext(WalletContext);

  const { register, watch } = useForm<ISearchCollectionName>({ defaultValues });
  const registerProps = register as RegisterProps<ISearchCollectionName>
  const watchProps = watch as WatchProps<ISearchCollectionName>

  const { address, chainId } = currentCollection;
  const { parameter } = currentContractAbi;

  const getArgumentsHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setArgumentValues((prevArguments) => {
      return {
        ...prevArguments,
        [e.target.name]: e.target.value 
      }
    });
  }, [argumentValues]);

  const getEtherByMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setInputByMsg(Number(e.target.value));
  }

  const chatBoxRef = useRef<any>();
  useEffect(() => {
    if (chatBoxRef.current) {
      const divHeight = chatBoxRef.current.clientHeight;
      setChatBoxHeight(divHeight);
    }
  }, []);

  useEffect(() => {
    setResponseData(initialResponseData);
  }, [currentContractAbi.function])

  const sendTransactionHandler = async (
    method: string,
    params: ParameterFunction[],
    argumentInputs: CustomTypeArguments,
    type: string,
    outputs: string,
  ) => {
    setLoadingTransaction(true);
    const Provider = provider as Provider;
    const Signer = signer as Signer;
    const sortedArguments = sortArguments(params, argumentInputs);
    const someInputUndefied = sortedArguments.some(
      (argument) => argument === undefined
    );
    const parametersType = params.map((param) => param.type);

    if (someInputUndefied) {
      return setResponseData((prevResponse) => {
        return {
          ...prevResponse,
          message: 'Please fill all inputs'
        }
      })
    }

    if (checkAddressIndexIsValid(sortedArguments, parametersType)) {
      return setResponseData((prevResponse) => {
        return {
          ...prevResponse,
          message: 'Address is invalid'
        }
      })
    }

    if (checkIntegerIndexIsValid(sortedArguments, parametersType)) {
      return setResponseData((prevResponse) => {
        return {
          ...prevResponse,
          message: 'Integer is invalid'
        }
      })
    }

    const paramsStructure: string[] = params.map(
      (param) => `${param.type} ${param.name}`
    );
    let paramsInFunction: string = '';
    if (paramsStructure.length > 0) {
      paramsInFunction = paramsStructure.join(', ');
    }

    let transaction: Transaction;
    if (type === 'view' || type === 'pure') {
      const ABI = [`function ${method}(${paramsInFunction})`];
      const iface = new utils.Interface(ABI);
      const encodeInterface = iface.encodeFunctionData(method, sortedArguments);
      
      const response = await Provider.call({
        to: address,
        data: encodeInterface,
      });

      let stringResponse: string = '';
      console.log(outputs)
      if (outputs === 'string') {
        stringResponse = utils.toUtf8String(response).trim();
      }
      else if (outputs === 'address') {
        stringResponse = response;
      }
      else {
        const bigNumber = ethers.BigNumber.from(response);
        stringResponse = bigNumber.toString();
      }

      setLoadingTransaction(false);
      return setResponseData({
        message: 'Call transaction successfully.',
        data: stringResponse,
      });
    }

    else if (params.length === 0 && type === 'payable') {
      if (
        checkValidNumber(inputByMsg) 
        || Number(inputByMsg)  < 0 
        || !inputByMsg
      ) {
        return setResponseData({
          message: 'Input ether is invalid',

        });
      }

      const ABI = [`function ${method}()`];
      const iface = new utils.Interface(ABI);
      const encodeInterface = iface.encodeFunctionData(`${method}`);

      transaction = await Signer.sendTransaction({
        to: address,
        data: encodeInterface,
        value: utils.parseEther(inputByMsg.toString())
      })
    }

    else {
      const ABI = [`function ${method}(${paramsInFunction})`];
      const iface = new utils.Interface(ABI);
      const encodeInterface = iface.encodeFunctionData(
        `${method}`, 
        sortedArguments
      );

      transaction = await Signer.sendTransaction({
        to: address,
        data: encodeInterface,
      });
    }

    await transaction.wait();
    setLoadingTransaction(false);
    return setResponseData({
      message: 'Send transaction successfully.',
      hash: transaction.hash,
      gasPrice: ethers.BigNumber.from(transaction.gasPrice!._hex).toString()
    })
  }

  const focusingFunction: boolean = currentContractAbi.function.length > 0;
  const connectedWalletStatus = Object.keys(provider).length > 0 && currentContractAbi.function.length > 0;
  const responseKey = Object.keys(responseData) as (keyof ResponseData)[];

  return (
    <div className="flex flex-row h-full" ref={chatBoxRef}>
      <div 
        className="w-1/4 ring-2 ring-slate-800 flex flex-col" 
        style={{ height: chatBoxHeight }} 
      >
        <SideBarCollection 
          register={registerProps}
          watch={watchProps}
        />
      </div>
      {
        chainId > 0 && 
        (
          <div className="w-3/4 h-full flex flex-col text-white">
            <div 
              className="w-full h-[10%] border-b-2 border-slate-800 flex flex-col p-3 justify-center"
            >
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-4 h-10 gap-3">
                  <div 
                    className="col-span-2 border-2 border-slate-800 bg-slate-700/70 rounded-md py-1 px-2 flex items-center"
                  >
                    <p className="">{address}</p>
                  </div>
                  <div 
                    className="col-span-1 border-2 border-slate-800 bg-slate-700/70 rounded-md py-1 px-2 flex items-center"
                  >
                    <p>
                      {network.id === chainId 
                        ? filterChainIdHandler(chainId) 
                        : `Please change network`
                      }
                    </p>
                  </div>
                  <div className="col-span-1">
                    <ButtonHandler
                      name={'Send'} 
                      status={connectedWalletStatus}
                      onHandlerFunction={
                        () => sendTransactionHandler(
                          currentContractAbi.function,
                          currentContractAbi.parameter,
                          argumentValues,
                          currentContractAbi.stateMutability,
                          currentContractAbi.outputs
                        )
                      }                    
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[90%] grid grid-cols-2">
              {
                focusingFunction &&
                (
                  <div className="cols-span-1 border-r-2 border-slate-800">
                    <div 
                      className="w-full h-[15%] border-b-2 border-slate-800 grid grid-cols-5 text-xl font-medium"
                    >
                      <div 
                        className="col-span-2 border-r-2 border-slate-800 h-full flex justify-center items-center p-2"
                      >
                        <div 
                          className="w-full h-full border-2 border-slate-800 rounded-md flex justify-center items-center bg-slate-400 text-slate-800"
                        >
                          <p>{currentContractAbi.stateMutability}</p>
                        </div>
                      </div>
                      <div 
                        className="col-span-3 h-full flex justify-center items-center p-2"
                      >
                        <div 
                          className="w-full h-full border-2 border-slate-800 rounded-md flex justify-center items-center bg-slate-400 text-slate-800"
                        >
                          <p>{currentContractAbi.function}</p>
                        </div>
                      </div>                  
                    </div>
                    <div className="flex flex-col gap-8 p-4 w-full">
                      {
                        parameter.map((param) => (
                          <ArgumentInput 
                            name={param.name}
                            type={param.type}
                            onGetArgumentValues={getArgumentsHandler}
                          />
                        ))
                      }
                    </div>
                  </div>
                )
              }
              <div className="cols-span-1 flex flex-col w-full">
                {
                  currentContractAbi.function.length > 0 && 
                  (
                    <>
                      <div className="h-[15%] border-b-2 border-slate-800 p-2">
                        <div 
                          className="w-full h-full border-2 border-slate-800 rounded-md flex justify-center items-center bg-slate-400 text-slate-800"
                        >
                          <p className="text-xl font-medium">Response</p>
                        </div>
                      </div>
                      <div 
                        className="h-[85%] w-full py-2 px-4"
                      >
                        {
                          loadingTransaction ?
                          (
                            <div
                              className="flex flex-col justify-center h-full items-center gap-2 font-medium text-slate-800"
                            >
                              <LoadingOutlined
                                style={{
                                  fontSize: 100,
                                  color: 'rgb(30,41,59)'
                                }}
                                spin
                                rev={undefined}
                              />
                              <p>Loading...</p>
                            </div>
                          )
                          :
                          (
                            <div className="w-full h-auto">
                              {responseKey.map((key) => {
                                if (responseData[key]) {
                                  return (
                                    <div 
                                      className="flex flex-row items-center gap-2 h-auto w-full whitespace-normal"
                                    >
                                      <p className="font-medium">{key}: </p>
                                      <p 
                                        className="whitespace-normal"
                                      >
                                        {responseData[key]}
                                      </p>
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          )
                        }
                      </div>
                    </>
                  )
                }
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default index;