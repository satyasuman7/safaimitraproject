import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeContext';
import Table from '../Table';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:3000/tickets';

// Format Date
function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

// Format Time
function formatTime(datetime) {
  if (!datetime) return '-';
  const date = new Date(datetime);
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

export default function UnassignedTicket({ heading = "Unassigned Ticket List", buttonText = "Assign Selected" }) {
  const { darkMode } = useTheme();
  const [unassigned, setUnassigned] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => { setUnassigned(data); })
      .catch(() => {
        toast.error("Error fetching data from /tickets");
      });
  }, []);

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === unassigned.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(unassigned.map(item => item.id));
    }
  };

  const handleAssignSelected = () => {
    const selectedData = unassigned.filter(item => selectedIds.includes(item.id));
    toast.success(`${selectedData.length} task(s) selected for assignment.`);
    setSelectedIds([]);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const handleModalConfirm = () => {
    handleAssignSelected();
    closeModal();
  };

  const isAllSelected = unassigned.length > 0 && selectedIds.length === unassigned.length;

  const columns = [
    <input type="checkbox" checked={isAllSelected} onChange={toggleSelectAll} />,
    "Sl.No.",
    "Category",
    "Remark",
    "Image",
    "Name",
    "Email",
    "Phone",
    "Date",
    "Time",
    "Status",
    "Action"
  ];

  return (
    <>
      <div className="container my-5" data-bs-theme={darkMode ? 'dark' : 'light'}>
        <div className="card shadow">
          <div className="card-body p-4">
            <Table
              columns={columns}
              data={unassigned}
              heading={heading}
              actionLabel="tickets"
              searchKeys={['category', 'name', 'email', 'date']}
              showAssignButton={selectedIds.length > 0}
              buttonText={buttonText}
              handleAssignSelected={openModal}
              renderRow={(item, index) => (
                <>
                  <td>
                    <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => toggleSelect(item.id)}/>
                  </td>
                  <td>{index + 1}</td>
                  <td>{item.category || '-'}</td>
                  <td>{item.remark || '-'}</td>
                  <td>
                    {item.image ? (
                      <img src={`/uploads/${item.image}`} alt="ticket" width="60" height="60" className="rounded" />
                    ) : 'No Image'}
                  </td>
                  <td>{item.name || '-'}</td>
                  <td>{item.email || '-'}</td>
                  <td>{item.phone || '-'}</td>
                  <td>{formatDate(item.date)}</td>
                  <td>{formatTime(item.time)}</td>
                  <td>
                    <span className={`badge ${item.status === 'Pending' ? 'bg-warning' : 'bg-success'}`}>
                      {item.status || 'Unassigned'}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-success">Assign Task</button>
                  </td>
                </>
              )}
            />
          </div>
        </div>
      </div>

      {/* Bootstrap Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Assignment</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                Are you sure you want to assign <strong>{selectedIds.length}</strong> selected ticket(s)?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleModalConfirm}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}