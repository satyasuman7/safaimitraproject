import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';

export default function AddAreaWard() {
  const [wardFields, setWardFields] = useState([{ ward_no: '', ward_code: '' }]);

  const handleWardChange = (index, field, value) => {
    const updated = [...wardFields];
    updated[index][field] = value;
    setWardFields(updated);
  };

  const addWardField = () => {
    setWardFields([...wardFields, { ward_no: '', ward_code: '' }]);
  };

  const { darkMode } = useTheme();

  return (
    <div className="container" data-bs-theme={darkMode ? 'dark' : 'light'}>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="card shadow my-5">
            <form>
              <div className="card-header d-flex justify-content-between align-items-center p-4">
                <h5 className="ms-3"><b>Add Area & Ward</b></h5>
              </div>

              <div className="card-body ms-3 me-4">
                {/* CITY */}
                <div className="row mb-3">
                  <label className="col-md-4 col-form-label fw-semibold mt-3">
                    Select City <span className='text-danger'>*</span>
                  </label>
                  <div className="col-md-8">
                    <select name="city" className="form-select p-3" required>
                      <option disabled selected>Select City</option>
                      <option value="Bhubaneswar">Bhubaneswar</option>
                      <option value="Patia">Patia</option>
                    </select>
                  </div>
                </div>

                {/* AREA NAME */}
                <div className="row mb-3">
                  <label htmlFor='area' className="col-md-4 col-form-label fw-semibold mt-3">
                    Area Name <span className='text-danger'>*</span>
                  </label>
                  <div className="col-md-8">
                    <input type="text" className="form-control p-3" placeholder="Enter Area Name" name='area' id='area' />
                  </div>
                </div>

                {/* WARD NUMBER + WARD CODE */}
                {wardFields.map((field, index) => (
                  <div key={index} className="row mb-3 align-items-center">
                    {/* WARD NUMBER */}
                    <label htmlFor='ward_no' className="col-md-4 col-form-label fw-semibold mt-3">
                      {index === 0 && 
                        <>
                          Ward Number <span className='text-danger'>*</span>
                        </>
                      }
                    </label>
                    <div className="col-md-4">
                      <input type="text" className="form-control p-3"  placeholder="Enter Ward Number" name='ward_no' id='ward_no' value={field.ward_no} onChange={(e) => handleWardChange(index, 'ward_no', e.target.value)} required />
                    </div>

                    {/* WARD CODE */}
                    <div className="col-md-3">
                      <input type="text" className="form-control p-3" placeholder="Enter Ward Code (Optional)" value={field.ward_code} onChange={(e) => handleWardChange(index, 'ward_code', e.target.value)} />
                    </div>

                    {/* ADD BUTTON (only on first) */}
                    {index === 0 && (
                      <div className="col-md-1 mt-3">
                        <button type="button" className="btn btn-outline-success" onClick={addWardField} title="Add more"> + </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="card-footer p-4 d-flex justify-content-end">
                <button type="reset" className='btn btn-danger'>Discard</button>
                <button type="submit" className='btn btn-primary ms-3'>Save Changes</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
