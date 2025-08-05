import { useTheme } from '../../component/ThemeContext';
import { NavLink } from 'react-router-dom';

export default function DashboardEmp() {
  const { darkMode } = useTheme();
  return (
    <>
      <div className="container my-4" data-bs-theme={darkMode ? 'dark' : 'light'}>
        <div className="breadcrumbText">
          <h5>Dashboard</h5>
          <nav aria-label="breadcrumb" style={{ fontSize: "13px" }}>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"> <NavLink to="/">Home</NavLink> </li>
              <li className="breadcrumb-item active" aria-current="page"> Dashboard </li>
            </ol>
          </nav>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-3 colsm-12 col-12">
                <img src="../../../../300-1.jpg" alt="" className='img-fluid rounded-4' />
              </div>
              <div className="col-md-9 colsm-12 col-12 py-3">
                <h5 className="card-title mb-3">
                  <NavLink to="#" className="text-decoration-none fw-bold name_text">Good Morning!, Satya Suman Behera</NavLink>
                </h5>
                <div className="d-flex mb-5">
                  <NavLink to="#" className="text-decoration-none text-secondary fw-semibold me-3">Swacha Sathi</NavLink>
                  <NavLink to="#" className="text-decoration-none text-secondary fw-semibold me-3">Bhubaneswar</NavLink>
                  <NavLink to="#" className="text-decoration-none text-secondary fw-semibold me-3">satyasuman9893@gmail.com</NavLink>
                  <NavLink to="#" className="text-decoration-none text-secondary fw-semibold me-3">7000720467</NavLink>
                </div>
                <NavLink to="/employee/attendence" className="btn btn-primary">Take Attendence</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
