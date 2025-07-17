import React, { useEffect, useState } from 'react';
import Table from '../Table';
import { useTheme } from '../ThemeContext';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:3000/resources';

export default function ResourceToolVehicleList({
  heading = "Resources Management",
  buttonText = "Add Resources",
}) {
  const { darkMode } = useTheme();
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res =>  res.json())
      .then(data => {
        setResources(data);
      })
      .catch(err => {
        toast.error("Error fetching data from /resources");
      });
  }, []);

  const columns = ["Sl.No.", "Type", "Name", "Ward", "Assigned To", "Registration No.", "Condition", "Image", "Created At", "Actions"];

  return (
    <>
      <div className="container mt-5" data-bs-theme={darkMode ? 'dark' : 'light'}>
        <div className="card shadow">
          <div className="card-body p-5">
            <Table
              columns={columns}
              data={resources}
              actionLabel="resources"
              searchKeys={['name', 'registrationNo']}
              heading={heading}
              buttonText={buttonText}
              renderRow={(resrc, index) => (
                <>
                  <td>{index + 1}</td>
                  <td>{resrc.type}</td>
                  <td>{resrc.name}</td>
                  <td>{resrc.ward}</td>
                  <td>{resrc.assignedTo?.label || '-'}</td>
                  <td>{resrc.registrationNo || '-'}</td>
                  <td>{resrc.condition || '-'}</td>
                  <td>
                    {resrc.image ? (
                      <img src={`/uploads/${resrc.image}`} alt="icon" height="40" />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{new Date(resrc.createdAt).toLocaleDateString('en-GB')}</td>
                  <td>
                    <button className="btn btn-sm border">⋮</button>
                  </td>
                </>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
}