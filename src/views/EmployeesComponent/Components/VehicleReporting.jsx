import React, { useState } from 'react';
import { useTheme } from '../../component/ThemeContext';

export default function VehicleReporting() {
  const { darkMode } = useTheme();
  const [vehicleReport, setVehicleReport] = useState(''); 

  const options = [
    { id: 'vehicleYes', label: 'Yes', value: 'Yes' },
    { id: 'vehicleNo', label: 'No', value: 'No' }
  ];

  return (
    <div className="container-fluid my-4">
      <div className="card shadow">
        <div className={`card-header px-md-5 px-sm-4 ${darkMode ? 'bg-dark' : 'bg-white'}`}>
          <h3 className="my-2">Vehicle Reporting</h3>
        </div>
        <div className="card-body p-4 px-md-5 px-sm-4">
          <label className="mb-2">Vehicle Reporting (Arrived?)</label>
          {options.map(({ id, label, value }) => (
            <div className="form-check" key={id}>
              <input className="form-check-input" type="radio" name="vehicleReport" id={id} value={value} checked={vehicleReport === value} onChange={(e) => { setVehicleReport(e.target.value)}} />
              <label className="form-check-label" htmlFor={id}> {label} </label>
            </div>
          ))}

          <button className="btn btn-success mt-4">Submit</button>
        </div>
      </div>
    </div>
  );
}