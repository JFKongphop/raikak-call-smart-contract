import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import Header from '@/components/layout/Header';
import WalletProvider from './context/WalletProvider';

const App = () => {
  return (
    <WalletProvider>
      <Header>
        <RouterProvider router={router} />
      </Header>
    </WalletProvider>
  )
}

export default App;
