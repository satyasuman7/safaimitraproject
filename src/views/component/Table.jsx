import React, { useState } from 'react';

export default function Table({
  columns,
  data,
  searchKeys = [],
  renderRow,
  actionLabel = "rows",
  heading,
  showForm,
  toggleFn,
  buttonText
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter(item =>
    searchKeys.some(key =>
      (item[key] || '').toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIdx = (currentPage - 1) * entriesPerPage;
  const currentRows = filteredData.slice(startIdx, startIdx + entriesPerPage);

  return (
    <>
      {/* 🔹 Header inside Table.jsx */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">{heading}</h4>
        <button className="btn btn-primary" onClick={toggleFn}>
          {showForm ? "Close Form" : buttonText}
        </button>
      </div>

      {/* Filter */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <select
            className="form-select d-inline-block w-auto"
            value={entriesPerPage}
            onChange={e => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[10, 25, 50, 100].map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <span className="ms-2">entries per page</span>
        </div>

        <div>
          <label className="me-2 fw-semibold">Search:</label>
          <input
            type="text"
            className="form-control d-inline-block w-auto"
            placeholder={`Search ${actionLabel}...`}
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr className="text-uppercase text-secondary">
              {columns.map((col, idx) => (
                <th key={idx}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((row, idx) => (
                <tr key={idx}>
                  {renderRow(row, startIdx + idx)}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center text-muted">
                  No {actionLabel} found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center">
        <small className="text-muted">
          Showing {currentRows.length} of {filteredData.length} {actionLabel}
        </small>
        <ul className="pagination mb-0">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>&laquo;</button>
          </li>
          {[...Array(totalPages)].map((_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>&raquo;</button>
          </li>
        </ul>
      </div>
    </>
  );
}
