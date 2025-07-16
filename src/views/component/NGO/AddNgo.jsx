import React, { useActionState } from 'react'
import { useTheme } from '../ThemeContext';

const API_URL = 'http://localhost:3000/ngo';

async function submitFn(prev, formData) {
  const newNGO = {
    nameN: formData.get("nameN"),
    iconN: formData.get("iconN"),
    descriptionN: formData.get("descriptionN"),
    createdAt: new Date().toISOString()
  };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newNGO)
  });

  if (!res.ok) return alert("Error adding NGO");
  return alert("Added NGO Successfully!!");
}

export default function AddNgo() {
  const { darkMode } = useTheme();
  const [formState, formSubmit, isPending] = useActionState(submitFn, {});
  return (
    <>
      <div className="container mt-5" data-bs-theme={darkMode ? 'dark' : 'light'}>
        <div className="card shadow">
          <div className="card-body p-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold mb-0">NGO Management</h4>
              <button className="btn btn-primary">NGO List</button>
            </div>

            <form action={formSubmit}>
              <div className="mb-3 row">
                <label className="col-md-4 col-form-label fw-semibold">
                  NGO Name <span className="text-danger">*</span>
                </label>
                <div className="col-md-8">
                  <input type="text" name="nameN" className="form-control" required />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-md-4 col-form-label fw-semibold">
                  Icon Filename <span className="text-danger">*</span>
                </label>
                <div className="col-md-8">
                  <input type="file" name="iconN" className="form-control" required />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-md-4 col-form-label fw-semibold">Description</label>
                <div className="col-md-8">
                  <textarea name="descriptionN" className="form-control" required />
                </div>
              </div>

              <div className="text-end">
                <button className="btn btn-primary">Add NGO
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
