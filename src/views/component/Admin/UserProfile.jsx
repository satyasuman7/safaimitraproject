import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function UserProfile() {
  //TAB state
  const [tab, setTab] = useState('overview');
  const renderTabContent = () => {
    switch (tab) {
      case 'overview':
        return "<OverviewU />";
      case 'taskreport':
        return "<TaskReports />";
      case 'notifications':
        return "<Notifications />";
      case 'inbox':
        return "<Inbox />";
      case 'reports':
        return "<Reports />";
      default:
        return null;
    }
  };

  return (
    <>
      <div className="container">

        {/* Userprofile section */}
        <div className="row my-4">
          <div className="col lg-12 col-md-12 col-sm-12 col-12">
            <div className="card my-5">
              <div className="row p-4">
                <div className="col-md-2">
                  <img src="/300-1.jpg" className="img-fluid rounded-3" alt="..." />
                </div>
                <div className="col-md-10">
                  <div className="card-body">
                    <div className='d-flex justify-content-between mb-4'>
                      <div>
                        <h4 className='mb-3'>
                          <Link to="#" className="text-decoration-none hoverss">
                            Max Stane <i className="bi bi-patch-check-fill text-primary"></i>
                          </Link>
                        </h4>
                        <div>
                          <span className='me-4 fs-6'>
                            <Link to="#" className="text-decoration-none details_icon">
                              <i className="bi bi-person-circle"></i> Supervisor
                            </Link>
                          </span>
                        </div>
                      </div>
                      <div>
                        <i class="bi bi-gear-wide-connected details_icon fs-4"></i>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <div className="d-flex justify-content-between">
                        <div className="border border-light-subtle p-2 rounded-3 me-3">
                          <h5 className='text-center'> <i class="bi bi-check-circle"></i> </h5>
                          <span className='text-secondary'>Complain Resolved</span>
                        </div>
                        <div className="border border-light-subtle p-2 rounded-3 me-3">
                          <h5 className='text-center'> <i class="bi bi-clock-history"></i> </h5>
                          <span className='text-secondary'>Complain Pending</span>
                        </div>
                        <div className="border border-light-subtle p-2 rounded-3 me-3">
                          <h5 className='text-center'> <i class="bi bi-envelope-arrow-up-fill"></i> </h5>
                          <span className='text-secondary'>Complain Received</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Tab Buttons */}
                <ul className="nav nav-underline p-3">
                  <li className="nav-item me-3">
                    <button className={`nav-link ${tab === 'overview' ? 'active' : ''}`} onClick={() => setTab('overview')}> Overview </button>
                  </li>
                  <li className="nav-item me-3">
                    <button className={`nav-link ${tab === 'taskreport' ? 'active' : ''}`} onClick={() => setTab('taskreport')}> Task Reports </button>
                  </li>
                  <li className="nav-item me-3">
                    <button className={`nav-link ${tab === 'notifications' ? 'active' : ''}`} onClick={() => setTab('notifications')}> Notifications </button>
                  </li>
                  <li className="nav-item me-3">
                    <button className={`nav-link ${tab === 'inbox' ? 'active' : ''}`} onClick={() => setTab('inbox')}> Inbox </button>
                  </li>
                  <li className="nav-item me-3">
                    <button className={`nav-link ${tab === 'reports' ? 'active' : ''}`} onClick={() => setTab('reports')}> Reports </button>
                  </li>
                </ul>

                {/* Tab Content */}
                <div className="mt-3">
                  {tab === 'overview' && <p>This is Overview tab content.</p>}
                  {tab === 'taskreport' && <p>This is Task Reports tab content.</p>}
                  {tab === 'notifications' && <p>This is Notifications tab content.</p>}
                  {tab === 'inbox' && <p>This is Inbox tab content.</p>}
                  {tab === 'reports' && <p>This is Reports tab content.</p>}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
