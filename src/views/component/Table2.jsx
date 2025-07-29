// // src/views/component/Table2.jsx
// import React, { useEffect, useRef } from "react";
// import $ from "jquery";
// import DataTable from "datatables.net-bs5";
// // import Buttons from "datatables.net-buttons-bs5";
// // import jsZip from "jszip";
// // import pdfMake from "pdfmake/build/pdfmake";
// // import pdfFonts from "pdfmake/build/vfs_fonts";
// import * as XLSX from 'xlsx';
// import html2canvas from 'html2canvas';
//   import jsPDF from 'jspdf';

// // CSS imports
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
// // import "datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css";

// // Assign required global variables
// // window.jsPDF = jsPDF;
// // pdfMake.vfs = pdfFonts.pdfMake.vfs;

// export default function Table2() {
//   const tableRef = useRef();

//   useEffect(() => {
//     const table = new DataTable(tableRef.current, {
//       layout: {
//         topStart: {
//           buttons: ['copy', 'excel', 'pdf', 'colvis'],
//         },
//       },
//     });

//     return () => table.destroy();
//   }, []);

//   return (
//     <div className="container mt-4">
//       <h3>Employee Table</h3>
//       <table
//         ref={tableRef}
//         className="table table-striped"
//         style={{ width: "100%" }}
//       >
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Position</th>
//             <th>Office</th>
//             <th>Age</th>
//             <th>Start date</th>
//             <th>Salary</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Tiger Nixon</td>
//             <td>System Architect</td>
//             <td>Edinburgh</td>
//             <td>61</td>
//             <td>2011-04-25</td>
//             <td>$320,800</td>
//           </tr>
//           <tr>
//             <td>Garrett Winters</td>
//             <td>Accountant</td>
//             <td>Tokyo</td>
//             <td>63</td>
//             <td>2011-07-25</td>
//             <td>$170,750</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }
