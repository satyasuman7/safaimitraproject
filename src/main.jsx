import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// FOR ROUTING
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// BOOTSTRAP IMPORT
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/dist/js/bootstrap.js';
import OtpVerification from './views/component/OtpVerification.jsx';
import Error404 from './views/component/Error404.jsx'
import { ToastContainer, toast } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/verify-otp' element={<OtpVerification/>} />
       <Route path='*' element={<Error404/>} />
    </Routes>
    <ToastContainer />
  </BrowserRouter>,
)
