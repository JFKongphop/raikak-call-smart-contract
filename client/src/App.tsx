import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import Header from '@/components/layout/Layout';
import WalletProvider from './context/WalletProvider';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <WalletProvider>
      <Header>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <RouterProvider router={router} />
      </Header>
    </WalletProvider>
  )
}

export default App;
