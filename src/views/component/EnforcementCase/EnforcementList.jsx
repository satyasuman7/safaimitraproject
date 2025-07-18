import React, { useEffect, useState } from 'react'
import { useTheme } from '../ThemeContext';
import Table from '../Table';

//ICONS
import { PiDotsThreeOutlineVerticalFill, PiDownloadFill } from "react-icons/pi";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { NavLink } from 'react-router-dom';

const API_URL = 'http://localhost:3000/enforcement';

export default function EnforcementList({ heading = "Enforcement Case Management", buttonText = "Add Enforcement Case", }) {
  const { darkMode } = useTheme();

  //GET THE DATA TO TABLE
  const [enforcement, setEnforcement] = useState([]);
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setEnforcement(data);
        console.log("Enforcement", data)
      })
      .catch(err => {
        toast.error("Error fetching data from /resources");
      });
  }, []);

  const columns = ["Sl.No.", "Officer", "Violation Type", "Amount", "Location", "Payment Mode", "Status", "Evidence", "Receipt", "Created At", "Actions"];
  return (
    <>
      <div className="container mt-5" data-bs-theme={darkMode ? 'dark' : 'light'}>
        <div className="card shadow">
          <div className="card-body p-5">
            <Table
              columns={columns}
              data={enforcement}
              actionLabel="Enforcement"
              searchKeys={['officer?.label', 'violation_type', 'paymentMode']}
              heading={heading}
              buttonText={buttonText}
              renderRow={(enfrcmnt, index) => (
                <>
                  <td>{index + 1}</td>
                  <td>{enfrcmnt.officer?.label}</td>
                  <td>{enfrcmnt.violation_type}</td>
                  <td>₹{enfrcmnt.amount}</td>
                  <td>{enfrcmnt.location}</td>
                  <td>{enfrcmnt.paymentMode}</td>
                  <td>{enfrcmnt.status}</td>
                  <td>
                    {enfrcmnt.image ? (
                      <img
                        src={`/uploads/${enfrcmnt.image}`}
                        alt="icon"
                        height="40"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/placeholder.png"; // fallback image
                        }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>
                    <button className='btn btn-success' style={{ fontSize: "12px" }}><PiDownloadFill /> Download</button>
                  </td>
                  <td>{new Date(enfrcmnt.createdAt).toLocaleDateString('en-GB')}</td>
                  <td>
                    <div className="dropdown">
                      <button className="border" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <PiDotsThreeOutlineVerticalFill />
                      </button>
                      <ul className="dropdown-menu">
                        <li><NavLink className="dropdown-item text-warning" to="#"> <FaEdit /> Edit</NavLink></li>
                        <li><NavLink className="dropdown-item text-danger" to="#"> <RiDeleteBin5Fill /> Delete</NavLink></li>
                      </ul>
                    </div>
                  </td>

                </>
              )}
            />
          </div>
        </div>
      </div>
    </>
  )
}
