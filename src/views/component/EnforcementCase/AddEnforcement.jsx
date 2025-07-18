import React, { useActionState, useEffect, useState } from 'react';
import { useTheme } from '../ThemeContext';
import { toast } from 'react-toastify';

const JSON_API = 'http://localhost:3000';
const API_URL = 'http://localhost:3000/enforcement';

async function submitFn(prevState, formData) {
  try {
    const assignedToRaw = formData.get("officer_id");
    const { id, label } = JSON.parse(assignedToRaw);

    const file = formData.get("imageVideo");
    const fileName = file ? file.name : '';

    const enforcementForm = {
      officer: { id, label },
      violation_type: formData.get("violation_type"),
      amount: formData.get("amount"),
      location: formData.get("location"),
      paymentMode: formData.get("paymentMode"),
      description: formData.get("descriptionEnforce"),
      imageVideo: fileName,
      status: formData.get("status"),
      createdAt: new Date().toISOString(),
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enforcementForm),
    });

    if (!response.ok) return toast.error("Failed to submit enforcement case.");
    return toast.success("Enforcement case submitted!");
  } catch (error) {
    toast.error("Server error.");
  }
}

const AddEnforcement = () => {
  const { darkMode } = useTheme();
  const [formState, formSubmit, isPending] = useActionState(submitFn, {});
  const [employees, setEmployees] = useState([]);
  const [previewURL, setPreviewURL] = useState(null);

  useEffect(() => {
    fetch(`${JSON_API}/employees`)
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);

  // GEOLOCATION IN LOCATION FIELD
  const [location, setLocation] = useState('');
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude}, ${longitude}`);
      });
    } else {
      toast.warn('Geolocation not supported');
    }
  }, []);

  return (
    <div className="container my-5" data-bs-theme={darkMode ? 'dark' : 'light'}>
      <div className="card shadow">
        <div className="card-body p-5">
          <h3 className="fw-bold mb-5">Add Enforcement Case</h3>
          <form action={formSubmit}>
            {/* Officer Select */}
            <div className="mb-3 row">
              <label className="col-md-4 col-form-label fw-semibold">Officers <span className="text-danger">*</span></label>
              <div className="col-md-8">
                <select name="officer_id" className="form-select" required>
                  <option disabled selected>Select Officer</option>
                  {employees.filter(emp => emp.status === true).map(emp => (
                    <option key={emp.id} value={JSON.stringify({ id: emp.id, label: emp.user_name })}>
                      {emp.user_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Violation Type */}
            <div className="mb-3 row">
              <label className="col-md-4 col-form-label fw-semibold">Violation Type <span className="text-danger">*</span></label>
              <div className="col-md-8">
                <input type="text" name="violation_type" className="form-control" required />
              </div>
            </div>

            {/* Fine Amount */}
            <div className="mb-3 row">
              <label className="col-md-4 col-form-label fw-semibold">Fine Amount (₹) <span className="text-danger">*</span></label>
              <div className="col-md-8">
                <input type="number" name="amount" className="form-control" required />
              </div>
            </div>

            {/* Location */}
            <div className="mb-3 row">
              <label className="col-md-4 col-form-label fw-semibold">Location <span className="text-danger">*</span></label>
              <div className="col-md-8">
                <input type="text" name="location" className="form-control" value={location} readOnly />
              </div>
            </div>

            {/* Payment Mode */}
            <div className="mb-3 row">
              <label className="col-md-4 col-form-label fw-semibold">Payment Mode <span className="text-danger">*</span></label>
              <div className="col-md-8">
                <select name="paymentMode" className="form-select" required>
                  <option disabled selected>Select Mode</option>
                  <option value="Cash">Cash</option>
                  <option value="Online">Online</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="mb-3 row">
              <label className="col-md-4 col-form-label fw-semibold">Description <span className="text-danger">*</span></label>
              <div className="col-md-8">
                <textarea name="descriptionEnforce" className="form-control" rows={4}></textarea>
              </div>
            </div>

            {/* Evidence Upload */}
            <div className="mb-3 row">
              <label className="col-md-4 col-form-label fw-semibold">Evidence (Image/Video) <span className="text-danger">*</span></label>
              <div className="col-md-8">
                <input type="file" name="imageVideo" accept="image/*,video/*" capture="environment" className="form-control"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setPreviewURL(URL.createObjectURL(file));
                    }
                  }}
                />
                {previewURL && (
                  <div className="mt-2">
                    <p className="small">Preview:</p>
                    {previewURL.includes('video') ? (
                      <video src={previewURL} controls width="200" />
                    ) : (
                      <img src={previewURL} alt="preview" width="200" className="rounded border" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="mb-3 row">
              <label className="col-md-4 col-form-label fw-semibold">Status <span className="text-danger">*</span></label>
              <div className="col-md-8">
                <select name="status" className="form-select" required>
                  <option disabled selected>Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
            </div>

            {/* Generate Receipt */}
            <div className="row mb-3">
              <div className="col-md-4 fw-semibold">
                <input className="form-check-input me-2" type="checkbox" />
                <label className="form-check-label">Generate Receipt</label>
              </div>
            </div>

            {/* Submit */}
            <div className="text-end">
              <button type="submit" className="btn btn-primary" disabled={isPending}>
                {isPending ? 'Submitting...' : 'Submit Enforcement'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEnforcement;
