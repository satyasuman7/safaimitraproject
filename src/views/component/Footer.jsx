import React from 'react'
import { NavLink } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
  return (
    <>
      <div className='container-fluid d-flex justify-content-between p-3 footer'>
        <p><span className='text-secondary'>2025 © </span>Safai Mitra</p>

        <div>
          <NavLink to="#" className="text-decoration-none me-3">About</NavLink>
          <NavLink to="#" className="text-decoration-none">Support</NavLink>
        </div>
      </div>
    </>
  )
}

export default Footer;
