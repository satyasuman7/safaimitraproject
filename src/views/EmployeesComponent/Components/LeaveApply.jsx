import React, { useEffect, useState, useActionState } from 'react';
import { useTheme } from '../../component/ThemeContext';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LeaveApply() {
  const { darkMode } = useTheme();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    user_name: '',
    employee_code: '',
    mobile: '',
    area_id: '',
    leave_type: '',
    leave_start_date: '',
    leave_end_date: '',
    no_of_days: '',
    reason_of_leave: '',
  });

  // Fetch employee details and merge into formData
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:3000/employees/${id}`);
        if (!response.ok) throw new Error('Failed to fetch employee');
        const data = await response.json();

        setFormData((prev) => ({
          ...prev,
          user_name: data.user_name || '',
          employee_code: data.employee_code || '',
          mobile: data.mobile || '',
          area_id: data.area_id || '',
        }));
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-calculate number of days if start and end dates are valid
    const leave_start_date = (name === 'leave_start_date' ? value : formData.leave_start_date);
    const leave_end_date = (name === 'leave_end_date' ? value : formData.leave_end_date);
    if (
      (name === 'leave_start_date' || name === 'leave_end_date') &&
      (name === 'leave_start_date' ? value : formData.leave_start_date) &&
      (name === 'leave_end_date' ? value : formData.leave_end_date)
    ) {
      const start = new Date(name === 'leave_start_date' ? value : formData.leave_start_date);
      const end = new Date(name === 'leave_end_date' ? value : formData.leave_end_date);

      if (end >= start) {
        const diff = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
        setFormData((prev) => ({ ...prev, no_of_days: diff }));
      }
    }
  };

  // Submit using useActionState
  const [state, submitAction, isPending] = useActionState(async () => {
    
    try {
      const response = await fetch('http://localhost:3000/leave_apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      toast.success('Leave applied successfully!');
      return { success: true };
    } catch (error) {
      console.error('Error submitting leave:', error);
      return { success: false, error: error.message };
    }
  }, { success: false });

  return (
    <>
      <div className="container-fluid my-4">
        <div className="card shadow">
          <div className={`card-header px-md-5 px-sm-4 ${darkMode ? 'bg-dark' : 'bg-white'}`}>
            <h3 className="my-2">Apply Leave</h3>
          </div>
          <div className="card-body p-4 px-md-5 px-sm-4">
            <form action={submitAction}>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" value={formData.user_name} readOnly />
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label">Employee ID / Code</label>
                  <input type="text" className="form-control" value={formData.employee_code} readOnly />
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label">Mobile Number</label>
                  <input type="tel" className="form-control" value={formData.mobile} readOnly />
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label">Ward / Area Assigned</label>
                  <input type="text" className="form-control" value={formData.area_id} readOnly />
                </div>
              </div>

              <hr />
              <h5 className="mb-3">📆 Leave Details</h5>

              <div className="mb-3">
                <label className="form-label">Type of Leave</label>
                <select className="form-select" name="leave_type" value={formData.leave_type} onChange={handleChange} required>
                  <option value="">Select Leave Type</option>
                  {["Casual Leave", "Sick Leave", "Emergency Leave", "Others"].map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="row mb-3">
                <div className="col-md-4">
                  <label className="form-label">Leave Start Date</label>
                  <input type="date" className="form-control" name="leave_start_date" value={formData.leave_start_date} onChange={handleChange} required />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Leave End Date</label>
                  <input type="date" className="form-control" name="leave_end_date" value={formData.leave_end_date} onChange={handleChange} required />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Number of Days</label>
                  <input type="number" className="form-control" name="no_of_days" value={formData.no_of_days} readOnly />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Reason for Leave</label>
                <textarea className="form-control" name="reason_of_leave" rows="3" value={formData.reason_of_leave} onChange={handleChange} placeholder="Enter reason" required></textarea>
              </div>

              <button type="submit" className="btn btn-success mt-3" disabled={isPending}>
                {isPending ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}