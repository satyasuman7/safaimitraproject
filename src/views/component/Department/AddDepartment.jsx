import React, { useEffect, useState, useActionState } from 'react';
import DepartmentList from './DepartmentList';
import { useTheme } from '../ThemeContext';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:3000/departments';

async function submitFn(prev, formData) {
  const newDept = {
    nameD: formData.get("nameD"),
    iconD: formData.get("iconD"), // just filename like "cleaning.png"
    descriptionD: formData.get("descriptionD"),
    createdAt: new Date().toISOString()
  };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newDept)
  });

  if (!res.ok) return toast.error("Error adding department");
  return toast.success("Added Department Successfully!!");
}

export default function AddDepartment() {
  const { darkMode } = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [formState, formSubmit, isPending] = useActionState(submitFn, {});

  useEffect(() => {
    if (formState?.success) setShowForm(false);
  }, [formState]);

  return (
    <>
      <div className="container mt-5" data-bs-theme={darkMode ? 'dark' : 'light'}>
        <div className="card shadow">
          <div className="card-body p-5">
            {showForm ? (
              <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="fw-bold mb-0">Department Management</h4>
                  <button className="btn btn-primary" onClick={() => setShowForm(false)}>Close Form</button>
                </div>

                <form action={formSubmit}>
                  <div className="mb-3 row">
                    <label className="col-md-4 col-form-label fw-semibold">
                      Department Name <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input type="text" name="nameD" className="form-control" required />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-md-4 col-form-label fw-semibold">
                      Icon Filename <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input type="file" name="iconD" className="form-control" required />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-md-4 col-form-label fw-semibold">Description</label>
                    <div className="col-md-8">
                      <textarea name="descriptionD" className="form-control" required />
                    </div>
                  </div>

                  <div className="text-end">
                    <button className="btn btn-primary" disabled={isPending}>
                      {isPending ? "Submitting..." : "Add Department"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <DepartmentList
                heading="Department Management"
                buttonText="Add Department"
                showForm={showForm}
                setShowForm={setShowForm}
                reload={formState}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
