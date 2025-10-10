import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LoginMerchant from './pages/LoginMerchant';
import MenuMerchant from './pages/menuMerchant';
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MenuMerchant />
  </StrictMode>,
)
