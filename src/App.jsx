import { BrowserRouter } from 'react-router-dom';
import { Router } from './router/Router';
import {AuthProvider} from "./context/AuthContext.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {CartProvider} from "./context/CartContext.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
          <AuthProvider>
              <CartProvider>
                  <Router />
                  <ToastContainer
                    style={{top: '85px'}}
                  />
              </CartProvider>
          </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
