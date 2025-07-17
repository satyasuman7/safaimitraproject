import React, { useEffect, useState } from 'react'
import Table from '../Table';
import { useTheme } from '../ThemeContext';

const API_URL = 'http://localhost:3000/ngo';

export default function NgoList({
  heading = "NGOs Management",
  buttonText = "Add NGO",
}) {
  const columns = ['Sl No', 'Icon', 'NGO Name', 'Description', 'Created At', 'Action'];
  const { darkMode } = useTheme();
  const [ngo, setNgo] = useState([]);

  useEffect(() => {
      fetch(API_URL)
        .then(res => res.json())
        .then(data => setNgo(data));
    }, []);

  return (
    <>
      <div className="container mt-5" data-bs-theme={darkMode ? 'dark' : 'light'}>
        <div className="card shadow">
          <div className="card-body p-5">
            <Table
              columns={columns}
              data={ngo}
              searchKeys={['nameN', 'descriptionN']}
              actionLabel="NGOs"
              heading={heading}
              buttonText={buttonText}
              renderRow={(ngo, index) => (
                <>
                  <td>{index + 1}</td>
                  <td>
                    {ngo.iconN ? (
                      <img src={`/uploads/${ngo.iconN}`} alt="icon" width={40} height={40} style={{ objectFit: 'cover' }} />
                    ) : (
                      <span className="text-muted">No Icon</span>
                    )}
                  </td>
                  <td>{ngo.nameN}</td>
                  <td>{ngo.descriptionN}</td>
                  <td>{new Date(ngo.createdAt).toLocaleDateString('en-GB')}</td>
                  <td><button className="btn btn-sm border">⋮</button></td>
                </>
              )}
            />
          </div>
        </div>
      </div>
    </>
  )
}
