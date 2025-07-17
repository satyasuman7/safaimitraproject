import React, { useState, useRef, useActionState, useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import EmployeeList from './EmployeeList';

const API_URL = 'http://localhost:3000/employees';

// Submit function for useActionState
async function submitFn(prevState, formData) {
  try {
    const employeeForm = {
      department_id: formData.get("department_id"),
      city_id: formData.get("city_id"),
      area_id: formData.get("area_id"),
      role: formData.get("role"),
      user_name: formData.get("user_name"),
      mobile: formData.get("mobile"),
      email: formData.get("email"),
      password: formData.get("password"),
      employee_code: formData.get("employee_code"),
      status: formData.get("status") === 'true',
      profileImage: formData.get("profileImage"),
      createdAt: new Date().toISOString()
    };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeForm)
    });

    if (!res.ok) return alert("Submission failed");
    return { success: true };
  } catch (error) {
    alert("Server error");
    return { success: false };
  }
}

export default function AddEmployee() {
  const { darkMode } = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState(true);

  const defaultImage = "/300-1.jpg";
  const placeholderImage = "/images.png";
  const [image, setImage] = useState(defaultImage);
  const fileInputRef = useRef(null);

  const [formState, formSubmit, isPending] = useActionState(submitFn, {});

  // When form is submitted successfully
  useEffect(() => {
    if (formState?.success) {
      setShowForm(false);
    }
  }, [formState]);

  const handleStatusChange = () => setStatus(prev => !prev);

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleEditClick = () => fileInputRef.current.click();
  const handleRemoveClick = () => {
    setImage(placeholderImage);
    fileInputRef.current.value = null;
  };

  return (
    <>
      <div className="container mt-5" data-bs-theme={darkMode ? 'dark' : 'light'}>
        <div className="card shadow">
          <div className="card-body p-5">
            {showForm ? (
              <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="fw-bold mb-0">Employee Management</h4>
                  <button className="btn btn-primary" onClick={() => setShowForm(false)}>Close Form</button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  formData.set("status", status);
                  formData.set("profileImage", image);
                  formSubmit(formData);
                }}>
                  {/* Profile Image */}
                  <div className="row mb-3">
                    <label className="col-md-4 col-form-label fw-semibold">Profile Image</label>
                    <div className="col-md-8 text-center">
                      <div className="position-relative d-inline-block">
                        <img src={image} alt="Avatar" className="rounded-3 shadow" style={{ width: "150px", height: "150px", objectFit: "cover" }} />
                        <button type="button" className="btn btn-sm btn-warning position-absolute top-0 translate-middle rounded-circle" onClick={handleEditClick} data-bs-theme={darkMode ? 'dark' : 'light'}>
                          <i className="bi bi-pencil"></i>
                        </button>
                        {image !== placeholderImage && (
                          <button type="button" className="btn btn-sm btn-danger position-absolute bottom-0 translate-middle rounded-circle" onClick={handleRemoveClick}>
                            <i className="bi bi-x"></i>
                          </button>
                        )}
                        <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" style={{ display: "none" }} />
                      </div>
                    </div>
                  </div>

                  {/* Dropdowns */}
                  {[
                    { label: 'Department', name: 'department_id', options: ['Sanitation', 'Water Works'] },
                    { label: 'City', name: 'city_id', options: ['Bhubaneswar', 'Pune'] },
                    { label: 'Area & Ward', name: 'area_id', options: ['101 - Pimpri Chichwad', '102 - Bapuji Nagar'] },
                    { label: 'Role', name: 'role', options: ['Sanitory Inspector', 'Supervisor', 'Swacha Sathi', 'MCC Supervisor', 'Vehicle Coordinator', 'Enforcement Officer'] }
                  ].map(({ label, name, options }) => (
                    <div className="row mb-3" key={name}>
                      <label className="col-md-4 col-form-label fw-semibold">{label} <span className="text-danger">*</span></label>
                      <div className="col-md-8">
                        <select className="form-select" name={name} required>
                          <option disabled selected>Select {label}</option>
                          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                    </div>
                  ))}

                  {/* Text Inputs */}
                  {[
                    { label: 'Full Name', name: 'user_name' },
                    { label: 'Mobile Number', name: 'mobile' },
                    { label: 'Email ID', name: 'email' },
                    { label: 'Password', name: 'password' },
                    { label: 'Employee ID', name: 'employee_code' }
                  ].map(({ label, name }) => (
                    <div className="row mb-3" key={name}>
                      <label className="col-md-4 col-form-label fw-semibold">{label} <span className="text-danger">*</span></label>
                      <div className="col-md-8">
                        <input className="form-control" name={name} placeholder={`Enter ${label}`} required />
                      </div>
                    </div>
                  ))}

                  {/* Status */}
                  <div className="row mb-3">
                    <label className="col-md-4 col-form-label fw-semibold">Status</label>
                    <div className="col-md-8 mt-2">
                      <div className="form-check form-switch">
                        <input type="checkbox" className="form-check-input" id="statusSwitch" name="status" checked={status} onChange={handleStatusChange} />
                        <label htmlFor="statusSwitch" className="form-check-label ms-2">
                          {status ? 'Active' : 'Inactive'}
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="text-end">
                    <button className="btn btn-primary" disabled={isPending}>
                      {isPending ? 'Submitting...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <EmployeeList
                heading="Employee Management"
                buttonText="Add Employee"
                showForm={showForm}
                setShowForm={setShowForm}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}