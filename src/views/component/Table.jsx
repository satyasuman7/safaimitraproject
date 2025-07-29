  import React, { useState, useRef } from 'react';
  import { useNavigate } from 'react-router-dom';
  import * as XLSX from 'xlsx';
  import html2canvas from 'html2canvas';
  import jsPDF from 'jspdf';
  import { toast } from 'react-toastify';

  export default function Table({
    columns,
    data,
    searchKeys = [],
    renderRow,
    actionLabel = "rows",
    heading,
    showAssignButton = true,
    showForm,
    toggleFn,
    buttonText,
    nav
  }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const tableRef = useRef();

    const filteredData = data.filter(item =>
      searchKeys.some(key =>
        (item[key] || '').toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    const totalPages = Math.ceil(filteredData.length / entriesPerPage);
    const startIdx = (currentPage - 1) * entriesPerPage;
    const currentRows = filteredData.slice(startIdx, startIdx + entriesPerPage);

    const handleClick = () => {
      if (toggleFn) toggleFn();
      else if (nav) navigate(nav);
    };

    // ✅ COPY FUNCTION
    const handleCopy = () => {
      const rows = currentRows.map(row =>
        searchKeys.map(key => row[key]).join('\t')
      );
      const text = [columns.join('\t'), ...rows].join('\n');
      navigator.clipboard.writeText(text)
        .then(() => toast.success("Copied to clipboard"))
        .catch(() => toast.error("Copy failed"));
    };

    // ✅ EXCEL FUNCTION
    const handleExcel = () => {
      const wsData = [columns, ...currentRows.map(row => searchKeys.map(key => row[key]))];
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "tableEXCEL.xlsx");
      toast.success("Excel downloaded");
    };

    // ✅ PDF FUNCTION
    const handlePDF = () => {
      html2canvas(tableRef.current).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('TablePDF.pdf');
        toast.success("PDF downloaded");
      }).catch(() => toast.error("PDF export failed"));
    };

    // ✅ PRINT FUNCTION
    const handlePrint = () => {
      const printContent = tableRef.current.innerHTML;
      const win = window.open('', '', 'height=600,width=800');
      win.document.write('<html><head><title>Print Table</title></head><body>');
      win.document.write(printContent);
      win.document.write('</body></html>');
      win.document.close();
      win.print();
      toast.info("Print dialog opened");
    };

    return (
      <>
        {/* 🔹 Header inside Table.jsx */}
        {/* {(heading || buttonText) && (
          <div className="d-flex justify-content-between align-items-center mb-4">
            {heading && <h4 className="fw-bold mb-0">{heading}</h4>}
            {buttonText && (
              <button className="btn btn-success" onClick={handleClick}>
                {showForm ? "Close Form" : buttonText}
              </button>
            )}
          </div>
        )} */}

        <div className="d-flex justify-content-between mb-4">
          {heading && <h4>{heading}</h4>}

          {showAssignButton && (
            <button className="btn btn-success mb-2">
              {buttonText}
            </button>
          )}
        </div>

        {/* Controls */}
        <div className="row mb-3">
          <div className="col-lg-6 col-md-12 col-sm-12 col-12 mb-4 d-flex">
            <div className="btn-group " role="group">
              <button className="btn btn-outline-secondary" onClick={handleCopy}>Copy</button>
              <button className="btn btn-outline-secondary" onClick={handleExcel}>Excel</button>
              <button className="btn btn-outline-secondary" onClick={handlePDF}>PDF</button>
              <button className="btn btn-outline-secondary" onClick={handlePrint}>Print</button>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12 d-flex justify-content-end">
            <div>
              <label className="me-2 fw-semibold">Search:</label>
              <input type="text" className="form-control d-inline-block w-auto" placeholder={`Search ${actionLabel}...`} value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }} />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive" ref={tableRef}>
          <table className="table table-striped align-middle" style={{ fontSize: "15px" }}>
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

        {/* 🔹 Pagination */}
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