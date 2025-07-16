import React, { useEffect, useState } from 'react';
import Table from '../Table';

const API_URL = 'http://localhost:3000/departments';

export default function DepartmentList({ heading, buttonText, showForm, setShowForm }) {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setDepartments(data));
  }, []);

  const columns = ['Sl No', 'Icon', 'Department Name', 'Description', 'Created At', 'Action'];

  return (
    <Table
      columns={columns}
      data={departments}
      searchKeys={['nameD', 'descriptionD']}
      actionLabel="departments"
      heading={heading}
      buttonText={buttonText}
      showForm={showForm}
      toggleFn={() => setShowForm(!showForm)}
      renderRow={(dept, index) => (
        <>
          <td>{index + 1}</td>
          <td>
            {dept.iconD ? (
              <img src={`/uploads/${dept.iconD}`} alt="icon" width={40} height={40} style={{ objectFit: 'cover' }} />
            ) : (
              <span className="text-muted">No Icon</span>
            )}
          </td>
          <td>{dept.nameD}</td>
          <td>{dept.descriptionD}</td>
          <td>{new Date(dept.createdAt).toLocaleDateString('en-GB')}</td>
          <td><button className="btn btn-sm border">⋮</button></td>
        </>
      )}
    />
  );
}
