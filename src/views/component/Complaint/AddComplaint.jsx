import React, { useEffect, useState, useActionState } from 'react';
import ComplaintList from './ComplaintList';
import { useTheme } from '../ThemeContext';

const API_URL = 'http://localhost:3000/complain';

async function submitFn(prevState, formData) {
  try {
    const complaintForm = {
      category_name: formData.get("category_name"),
      complaintdescription: formData.get("complaintdescription"),
      complainticon: formData.get("complainticon"),
      createdAt: new Date().toISOString(),
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(complaintForm),
    });

    if (!response.ok) return alert("Failed to submit complaint");
    return { success: true };
  } catch (error) {
    alert("Server error");
  }
}

export default function AddComplaint() {
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
                  <h4 className="fw-bold mb-0">Complaint Management</h4>
                  <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Close Form" : "Add Complaint"}
                  </button>
                </div>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  formSubmit(formData);
                }} >
                  <div className="mb-3 row">
                    <label className="col-md-4 col-form-label fw-semibold">
                      Category Name <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <select name="category_name" className="form-select" required>
                        <option disabled selected>Select Category</option>
                        <option value="Roads">Roads</option>
                        <option value="Public Toilets">Public Toilets</option>
                        <option value="Drainage">Drainage</option>
                        <option value="Solid Waste">Solid Waste</option>
                        <option value="Dead Animal">Dead Animal</option>
                        <option value="Street Light">Street Light</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-md-4 col-form-label fw-semibold">Complaint Description</label>
                    <div className="col-md-8">
                      <textarea
                        className="form-control"
                        name="complaintdescription"
                        placeholder="Describe your complaint"
                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-md-4 col-form-label fw-semibold">Complaint Icon (Optional)</label>
                    <div className="col-md-8">
                      <input type="file" name="complainticon" className="form-control" />
                    </div>
                  </div>

                  <div className="text-end">
                    <button type="submit" className="btn btn-primary" disabled={isPending}>
                      {isPending ? "Submitting..." : "Submit Complaint"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <ComplaintList
                // showForm={showForm}
                setShowForm={setShowForm}
                heading="Complaint Management"
                buttonText="Add Complaint"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
