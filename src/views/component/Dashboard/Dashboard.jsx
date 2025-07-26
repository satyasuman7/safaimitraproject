import React, { useEffect, useState } from 'react';
import PieChart from '../Charts/PieChart';
import BarChart from '../Charts/BarChart';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

const API_URL = "http://localhost:3000";

const Dashboard = () => {
  const { darkMode } = useTheme();
  const [counts, setCounts] = useState({
    complain: 0,
    resources: 0,
    toilet: 0,
    employees: 0,
  });

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [complainRes, resourcesRes, toiletRes, employeesRes] = await Promise.all([
          fetch(`${API_URL}/complain`),
          fetch(`${API_URL}/resources`),
          fetch(`${API_URL}/toilet`),
          fetch(`${API_URL}/employees`),
        ]);

        const [complain, resources, toilet, employees] = await Promise.all([
          complainRes.json(),
          resourcesRes.json(),
          toiletRes.json(),
          employeesRes.json(),
        ]);

        // Count summary
        setCounts({
          complain: complain.length,
          resources: resources.length,
          toilet: toilet.length,
          employees: employees.length,
        });

        // Sort complaints by latest date
        const sortedComplaints = [...complain].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setComplaints(sortedComplaints);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    }

    fetchCounts();
  }, []);

  return (
    <div className="container my-4" data-bs-theme={darkMode ? 'dark' : 'light'}>
      <div className="breadcrumbText">
        <h4>Dashboard</h4>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <NavLink to="#">Home</NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Dashboard
            </li>
          </ol>
        </nav>
      </div>

      <div className="row">
        {/* Count cards */}
        <div className="col-lg-3 col-md-3 col-sm-12 col-12">
          <div className="card mb-3 p-3 border-0">
            <div className="card-body text-center">
              <h5 className="card-title">{counts.complain}</h5>
              <p className="text-secondary">Total Complaints</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-3 col-sm-12 col-12">
          <div className="card mb-3 p-3 border-0">
            <div className="card-body text-center">
              <h5 className="card-title">{counts.resources}</h5>
              <p className="text-secondary">Total Vehicles</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-3 col-sm-12 col-12">
          <div className="card mb-3 p-3 border-0">
            <div className="card-body text-center">
              <h5 className="card-title">{counts.toilet}</h5>
              <p className="text-secondary">Total Toilets</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-3 col-sm-12 col-12">
          <div className="card mb-3 p-3 border-0">
            <div className="card-body text-center">
              <h5 className="card-title">{counts.employees}</h5>
              <p className="text-secondary">Total Users</p>
            </div>
          </div>
        </div>

        {/* Pie chart */}
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <div className="card mb-3 border-0">
            <div className="card-header fw-bold p-4">Complaints by Category</div>
            <div className="card-body p-4">
              <PieChart />
            </div>
          </div>
        </div>

        {/* Bar chart */}
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <div className="card mb-3 border-0">
            <div className="card-header fw-bold p-4">Waste Collected (This Month)</div>
            <div className="card-body p-4">
              <BarChart />
            </div>
          </div>
        </div>

        {/* Recent complaints */}
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="card mb-3 border-0">
            <div className="card-header fw-bold p-4">Recent Complaints</div>
            <div className="card-body p-4">
              <table className="table table-striped border">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Complaint ID</th>
                    <th scope="col">Category</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.slice(0, 5).map((complaint, index) => (
                    <tr key={complaint.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{index+1}</td>
                      <td>{complaint.category_name}</td>
                      <td>{new Date(complaint.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'})}
                      </td>
                    </tr>
                  ))}
                  {complaints.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center text-muted">No complaints found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Dashboard };
