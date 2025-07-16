import React from 'react'
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <div className='container-fluid d-flex justify-content-between p-3'>
        <p><span className='text-secondary'>2025 © </span>Techzex Software Pvt Ltd.</p>

        <div>
          <NavLink to="#" className="text-decoration-none me-3">About</NavLink>
          <NavLink to="#" className="text-decoration-none">Support</NavLink>
        </div>
      </div>
    </>
  )
}

export default Footer;
