import { toast } from 'react-toastify';

type StatusType = 'success' | 'warning' | 'error';

export const toastifyConfig = (status: StatusType, word: string) => {
  toast[status](word, {
    style: {
      background: 'rgb(30,41,59)',
      fontWeight: 'bold',
      color: 'white'
    }
  });
}