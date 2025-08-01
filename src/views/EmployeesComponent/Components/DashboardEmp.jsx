import React from 'react'
import { useTheme } from '../../component/ThemeContext';
import { NavLink } from 'react-router-dom';

export default function DashboardEmp() {
  const { darkMode } = useTheme();
  return (
    <>
      <div className="container my-4" data-bs-theme={darkMode ? 'dark' : 'light'}>
        <div className="breadcrumbText">
          <h5>Dashboard</h5>
          <nav aria-label="breadcrumb" style={{fontSize:"13px"}}>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"> <NavLink to="/">Home</NavLink> </li>
              <li className="breadcrumb-item active" aria-current="page"> Dashboard </li>
            </ol>
          </nav>
        </div>

        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4 col-12">
              <img src="../../../../300-1.jpg" className="img-fluid rounded-start me-md-3 mb-3 mb-md-0" alt="..." />
            </div>
            <div className="col-md-8 col-12">
              <div className="card-body">
                <h5 className="card-title"> Good Afternoon!, Satya Suman Behera </h5>
                <div className="text-secondary d-flex gap-3">
                  <div className="card-text">Swacha Sathi</div>
                  <div className="card-text">Bhubaneswar</div>
                  <div className="card-text">satyasuman9893@gmail.com</div>
                  <div className="card-text">7000705476</div>
                </div>
                <p className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
          </div>
        </div>



      </div>
    </>
  )
}
