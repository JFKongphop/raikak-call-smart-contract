import ButtonHandler from '@/components/button/ButtonHandler';
import ModalSearchABIAddress from '@/components/modal/ModalSearchABIAddress';
import { VITE_API_ENDPOINT } from '@/configs/enviroment'
import ABIRequest from '@/lib/abi-request';
import axios from 'axios';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { 
  useEffect, 
  useRef, 
  useState 
} from 'react'

const index = () => {
  const [chatBoxHeight, setChatBoxHeight] = useState<number>(0);
  const [openNewRequest, setOpenNewRequest] = useState<boolean>(false);
 
  const getAddressContracts = ():string[] => {
    const myAddress = localStorage.getItem('addressContract');
    return myAddress ? JSON.parse(myAddress) : [];
  }

  const ad = getAddressContracts();

  const a = () => {
    const n = Date.now().toString();
    ad.push(n)
    localStorage.setItem('addressContract', JSON.stringify(ad))
  }

  const toggleModalRequest = () => {
    setOpenNewRequest((prevToggle) => !prevToggle);
  }

  const searchABIHandler = async (address: string, chainId: number) => {
    try {
      const { data } = await ABIRequest.get(
        `${VITE_API_ENDPOINT}/${address}/${chainId}`
      );
      toggleModalRequest();
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error as AxiosError<any>;
        toast.error(response!.data.message, {
          style: {
            background: 'rgb(30,41,59)',
            fontWeight: 'bold',
            color: 'white'
          }
        })
      }
    }

  }


  const chatBoxRef = useRef<any>();
  useEffect(() => {
    if (chatBoxRef.current) {
      const divHeight = chatBoxRef.current.clientHeight;
      setChatBoxHeight(divHeight)
    }
  }, []);

  return (
    <div className="flex flex-row h-full" ref={chatBoxRef}>
      <ModalSearchABIAddress 
        showModal={openNewRequest}
        setShowModal={setOpenNewRequest}
        buttonAction={searchABIHandler}
      />
      <div 
        className="w-1/4 ring-2 ring-slate-800 flex flex-col" 
        style={{ height: chatBoxHeight }} 
      >
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
          <input 
            type="text" 
            name=""
            className="outline-none p-2 rounded-md text-xs" 
          />
        </div>
        <div 
          className="h-[90%] flex flex-col gap-3 overflow-y-auto items-start justify-start p-2 pr-1 bg-slate-400"
        >
          {
            Array.from({ length: 200 }).map((_, index) => (
              <div className="h-10 w-full rounded-md bg-slate-600">{index}</div>
            ))
          }
        </div>
      </div>
      <div className="w-3/4"></div>
    </div>
  )
}

export default index