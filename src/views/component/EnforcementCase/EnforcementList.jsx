import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeContext';
import Table from '../Table';

// ICONS
import { PiDotsThreeOutlineVerticalFill, PiDownloadFill } from "react-icons/pi";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { NavLink } from 'react-router-dom';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const API_URL = 'http://localhost:3000/enforcement';

export default function EnforcementList({ heading = "Enforcement Case Management", buttonText = "Add Enforcement Case", }) {
  const { darkMode } = useTheme();

  const [enforcement, setEnforcement] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setEnforcement(data);
        console.log("Enforcement", data)
      })
      .catch(err => {
        console.error("Error fetching data from /enforcement");
      });
  }, []);

  const columns = [
    "Sl.No.", "Officer", "Violation Type", "Amount", "Location", "Payment Mode",
    "Status", "Evidence", "Receipt", "Created At", "Actions"
  ];

  const handleDownload = async (data, index) => {
    setSelectedData({ ...data, caseIndex: index + 1 }); // serial number
    setTimeout(async () => {
      const input = document.getElementById('pdf-content');
      if (input) {
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
        pdf.save(`Enforcement_Case_${index + 1}.pdf`);
        setSelectedData(null);
      }
    }, 500);
  };

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
                  <td>{enfrcmnt.locationName}</td>
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
                          e.target.src = "/placeholder.png";
                        }}
                      />
                    ) : "No Image"}
                  </td>
                  <td>
                    <button className="btn btn-success" style={{ fontSize: "12px" }} onClick={() => handleDownload(enfrcmnt, index)}>
                      <PiDownloadFill /> Download
                    </button>
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

      {/* Hidden Receipt for PDF */}
      {selectedData && (
        <div id="pdf-content">
          <h2>Enforcement Case Receipt</h2>
          <p>
            Generated on {new Date().toLocaleDateString('en-GB')}, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>

          <h5><b>Case Details</b></h5>
          <table>
            <tbody>
              <tr>
                <td><b>Case ID</b></td>
                <td>{selectedData.caseIndex}</td>
              </tr>
              <tr>
                <td><b>Officer Name</b></td>
                <td>{selectedData.officer?.label}</td>
              </tr>
              <tr>
                <td><b>Violation Type</b></td>
                <td>{selectedData.violation_type}</td>
              </tr>
              <tr>
                <td><b>Location</b></td>
                <td>{selectedData.locationName}</td>
              </tr>
              <tr>
                <td><b>Description</b></td>
                <td>{selectedData.description || 'N/A'}</td>
              </tr>
            </tbody>
          </table>

          <h5><b>Payment Information</b></h5>
          <table>
            <tbody>
              <tr>
                <td><b>Amount</b></td>
                <td>₹{selectedData.amount}</td>
              </tr>
              <tr>
                <td><b>Payment Mode</b></td>
                <td>{selectedData.paymentMode}</td>
              </tr>
              <tr>
                <td><b>Status</b></td>
                <td>{selectedData.status}</td>
              </tr>
            </tbody>
          </table>

          <p className="footer-note">
            This is a system-generated receipt. For queries, contact your municipal authority.
          </p>
        </div>
      )}


    </>
  );
}
