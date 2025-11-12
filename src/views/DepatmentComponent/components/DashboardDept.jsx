import React from 'react'
import { NavLink } from 'react-router-dom'
import DynamicCalendar from './DynamicCalender'
import { useTheme } from '../../component/ThemeContext.jsx';

export default function DashboardDept() {
  const { darkMode } = useTheme();
  return (
    <>
      <div className="container-fluid my-4" data-bs-theme={darkMode ? 'dark' : 'light'}>
        <div className="breadcrumbText">
          <h5>Department Dashboard</h5>
          <nav aria-label="breadcrumb" style={{ fontSize: "13px" }}>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <NavLink to="#">Home</NavLink>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Dashboard
              </li>
            </ol>
          </nav>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-12 col-12">
            <div className="card mb-3 shadow">
              <div className="card-body text-center">
                <h5 className="card-title">0</h5>
                <p className="text-secondary">Total Tickets</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-12 col-12">
            <div className="card mb-3 shadow">
              <div className="card-body text-center">
                <h5 className="card-title">0</h5>
                <p className="text-secondary">Today's Tickets</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-12 col-12">
            <div className="card mb-3 shadow">
              <div className="card-body text-center">
                <h5 className="card-title">0</h5>
                <p className="text-secondary">Open Tickets</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-12 col-12">
            <div className="card mb-3 shadow">
              <div className="card-body text-center">
                <h5 className="card-title">0</h5>
                <p className="text-secondary">This Month</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-12 col-12">
            <div className="card mb-3 shadow">
              <div className="card-body text-center">
                <h5 className="card-title">0</h5>
                <p className="text-secondary">Closed Tickets</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="card mb-3 shadow">
              <DynamicCalendar />
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="card mb-3 shadow">
              <div className="card-body">
                <h4 className="card-title">Total Pending List</h4>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Phone No.</th>
                      <th scope="col">Department</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Rahul Shinde</th>
                      <td>7008547882</td>
                      <td>General Inquery</td>
                      <td>04/08/2025</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
