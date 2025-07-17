import React, { useEffect, useState, useActionState } from 'react';
import { useTheme } from '../ThemeContext';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:3000/resources';
const JSON_API = 'http://localhost:3000';

// Submit handler
async function submitFn(prevState, formData) {
  try {
    const assignedToRaw = formData.get("assignedTo");
    const { id, label } = JSON.parse(assignedToRaw);

    const resourceForm = {
      type: formData.get("type"),
      name: formData.get("name"),
      registrationNo: formData.get("registrationNo"),
      // city: formData.get("city"),
      ward: formData.get("ward"),
      condition: formData.get("condition"),
      image: formData.get("image"),
      assignedTo: {
        id,
        label
      },
      createdAt: new Date().toISOString()
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resourceForm),
    });

    if (!response.ok) return toast.error("Failed to submit resource.");
    return toast.success("Successfully added resources!!");
  } catch (error) {
    toast.error("Server error.");
  }
}

export default function AddResource_Tool_Vehicle() {
  const { darkMode } = useTheme();
  const [formState, formSubmit, isPending] = useActionState(submitFn, {});

  const [departments, setDepartments] = useState([]);
  const [ngo, setNgo] = useState([]);
  // const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch(`${JSON_API}/departments`)
      .then(res => res.json())
      .then(data => setDepartments(data));

    fetch(`${JSON_API}/ngo`)
      .then(res => res.json())
      .then(data => setNgo(data));

    // fetch(`${JSON_API}/employees`)
    //   .then(res => res.json())
    //   .then(data => setEmployees(data));
  }, []);

  return (
    <div className="container mt-5" data-bs-theme={darkMode ? 'dark' : 'light'}>
      <div className="card shadow">
        <div className="card-body p-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold mb-0">Add Resource / Tool / Vehicle</h4>
            <button className="btn btn-primary">
              <NavLink to="/resourcelist" className="text-decoration-none text-white">Resources List</NavLink>
            </button>
          </div>

          <form action={formSubmit}>
            {/* Type */}
            <div className="mb-3 row">
              <label className="col-md-4 col-form-label fw-semibold">Type <span className="text-danger">*</span></label>
              <div className="col-md-8">
                <select name="type" className="form-select" required defaultValue="">
                  <option value="" disabled>Select Type</option>
                  <option value="Vehicle">Vehicle</option>
                  <option value="Tool">Tool</option>
                  <option value="Equipment">Equipment</option>
                </select>
              </div>
            </div>

            {/* Name */}
            <div className="mb-3 row">
              <label className="col-md-4 col-form-label fw-semibold">Name <span className="text-danger">*</span></label>
              <div className="col-md-8">
                <input type="text" name="name" className="form-control" required />
              </div>
            </div>

            {/* Registration No. */}
            <div className="mb-3 row">
              <label className="col-md-4 col-form-label fw-semibold">Registration No. (if vehicle)</label>
              <div className="col-md-8">
                <input type="text" name="registrationNo" className="form-control" />
              </div>
            </div>

            {/* City */}
            {/* <div className="mb-3 row">
              <label className="col-md-4 col-form-label fw-semibold">City <span className="text-danger">*</span></label>
              <div className="col-md-8">
                <select name="city" className="form-select" required defaultValue="">
                  <option value="" disabled>Select City</option>
                  <option value="Bhubaneswar">Bhubaneswar</option>
                  <option value="Pune">Pune</option>
                  <option value="Raipur">Raipur</option>
                </select>
              </div>
            </div> */}

            {/* Ward */}
            <div className="mb-3 row">
              <label className="col-md-4 col-form-label fw-semibold">Ward <span className="text-danger">*</span></label>
              <div className="col-md-8">
                <select name="ward" className="form-select" required defaultValue="">
                  <option value="" disabled>Select Ward</option>
                  <option value="Ward 102">Ward 102 - Indiranagar</option>
                  <option value="Ward 101">Ward 101 - Koramangala</option>
                </select>
              </div>
            </div>

            {/* Assigned To */}
            <div className="mb-3 row">
              <label className="col-md-4 col-form-label fw-semibold">Assigned To <span className="text-danger">*</span></label>
              <div className="col-md-8">
                <select name="assignedTo" className="form-select" required defaultValue="">
                  <option value="" disabled>Select</option>

                  <optgroup label="Departments">
                    {departments.map(dept => (
                      <option
                        key={`dept-${dept.id}`}
                        value={JSON.stringify({ id: dept.id, label: `${dept.nameD} (Dept)` })}
                      >
                        {dept.nameD} (Dept)
                      </option>
                    ))}
                  </optgroup>

                  <optgroup label="NGOs">
                    {ngo.map(ngo => (
                      <option
                        key={`ngo-${ngo.id}`}
                        value={JSON.stringify({ id: ngo.id, label: `${ngo.nameN} (NGO)` })}
                      >
                        {ngo.nameN} (NGO)
                      </option>
                    ))}
                  </optgroup>

                  {/* <optgroup label="Users">
                    {employees.map(emp => (
                      <option
                        key={`emp-${emp.id}`}
                        value={JSON.stringify({ id: emp.id, label: `${emp.user_name} (User)` })}
                      >
                        {emp.user_name} (User)
                      </option>
                    ))}
                  </optgroup> */}
                </select>
              </div>
            </div>

            {/* Condition */}
            <div className="mb-3 row">
              <label className="col-md-4 col-form-label fw-semibold">Condition</label>
              <div className="col-md-8">
                <select name="condition" className="form-select">
                  <option value="Good">Good</option>
                  <option value="Needs Repair">Needs Repair</option>
                  <option value="Out of Service">Out of Service</option>
                </select>
              </div>
            </div>

            {/* Image */}
            <div className="mb-4 row">
              <label className="col-md-4 col-form-label fw-semibold">Image</label>
              <div className="col-md-8">
                <input type="file" name="image" placeholder="Enter image filename like 'dump.png'" className="form-control" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-end">
              <button type="submit" className="btn btn-primary" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit Resources"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}