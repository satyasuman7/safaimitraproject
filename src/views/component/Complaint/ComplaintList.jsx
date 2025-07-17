import React, { useEffect, useState } from 'react';
import Table from '../Table';

const API_URL = 'http://localhost:3000/complain';

export default function ComplaintList({ showForm, setShowForm, heading, buttonText }) {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setComplaints(data));
  }, []);

  const columns = ['Sl No', 'Icon', 'Category Name', 'Description', 'Created At', 'Action'];

  return (
    <>
      <Table
        columns={columns}
        data={complaints}
        searchKeys={['category_name', 'complaintdescription']}
        actionLabel="complaints"
        heading={heading}
        buttonText={buttonText}
        showForm={showForm}
        toggleFn={() => setShowForm(!showForm)}
        renderRow={(item, idx) => (
          <>
            <td>{idx + 1}</td>
            <td>
              {item.complainticon ? (
                <img src={item.complainticon} alt="icon" width={40} height={40} />
              ) : (
                <span className="text-muted">No Icon</span>
              )}
            </td>
            <td>{item.category_name}</td>
            <td>{item.complaintdescription}</td>
            <td>
              {new Date(item.createdAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </td>
            <td>
              <button className="btn btn-sm border">⋮</button>
            </td>
          </>
        )}
      />
    </>
  );
}