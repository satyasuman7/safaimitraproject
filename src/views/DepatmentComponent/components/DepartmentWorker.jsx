import React, { useState } from 'react';
import { useTheme } from '../../component/ThemeContext.jsx';
import AddDeptWorker from './AddDeptWorker';

export default function DepartmentWorker() {
  const { darkMode } = useTheme();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container-fluid my-5" data-bs-theme={darkMode ? 'dark' : 'light'}>
      {!showForm ? (
        <div className="card">
          <div className="card-header">
            <button
              className="btn btn-outline-success m-4"
              onClick={() => setShowForm(true)}
            >
              Add Department Worker
            </button>
          </div>
          <div className="card-body m-4">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Sr No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">Department</th>
                  <th scope="col">Password</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Teo Bodega</td>
                  <td>teobodega297@yahoo.com</td>
                  <td>7745871230</td>
                  <td>POLICE DEPT</td>
                  <td>123456</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <AddDeptWorker onBack={() => setShowForm(true)} />
      )}
    </div>
  );
}
