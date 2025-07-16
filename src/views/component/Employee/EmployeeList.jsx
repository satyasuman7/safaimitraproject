import React, { useEffect, useState } from 'react';
import Table from '../Table';
import { useTheme } from '../ThemeContext';

const API_URL = 'http://localhost:3000/employees';

export default function EmployeeList({ heading, buttonText, showForm, setShowForm }) {
  const { darkMode } = useTheme();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);

  const columns = ['Sl No', 'User Details', 'Role', 'Department', 'City', 'Ward', 'Status', 'Action'];

  return (
    <Table
      columns={columns}
      data={employees}
      searchKeys={['user_name', 'email', 'mobile', 'role', 'city_id']}
      actionLabel="employees"
      heading={ heading }
      buttonText={ buttonText }
      showForm={showForm}
      toggleFn={() => setShowForm(!showForm)}
      renderRow={(emp, index) => (
        <>
          <td>{index + 1}</td>
          <td>
            <div className='d-flex gap-2'>
              <img src={emp.profileImage} alt="" style={{ width: 40, height: 40, objectFit: 'cover' }} className="rounded-circle me-2" />
              <div>
                <div><strong>{emp.user_name}</strong></div>
                <small>Mob: {emp.mobile}</small><br />
                <small>Email: {emp.email}</small>
              </div>
            </div>
          </td>
          <td>{emp.role}</td>
          <td>{emp.department_id}</td>
          <td>{emp.city_id}</td>
          <td>{emp.area_id}</td>
          <td>{emp.status ? 'Active' : 'Inactive'}</td>
          <td><button className="btn btn-sm border">⋮</button></td>
        </>
      )}
    />
  );
}
