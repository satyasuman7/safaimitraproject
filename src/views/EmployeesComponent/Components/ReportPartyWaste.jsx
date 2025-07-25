import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function ReportPartyWaste() {
  const functionTypes = ["Marriage", "Reception", "Birthday", "Marriage Anniversary", "Death Anniversary", "Thread Ceremony", "Religious Events", "Cultral Programme", "Institutional Event", "Picnic Party", "In-House Party"];

  const foodingTypes = ["Lunch", "Dinner", "Both"];

  const [formData, setFormData] = useState({
    partyOrganised: '',
    venuename: '',
    venuecontact: '',
    functiontype: '',
    foodingtype: '',
    bookedfromapp: '',
    noofguests: '',
    customername: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e) => {
    setFormData(prev => ({ ...prev, partyOrganised: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/reportpartywaste', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      toast.success("Form submitted successfully!");
      setFormData({ partyOrganised: '', venuename: '', venuecontact: '', functiontype: '', foodingtype: '', bookedfromapp: '', noofguests: '', customername: '' });
    } else {
      toast.error("Submission failed.");
    }
  };

  return (
    <>
      <div className="container-fluid my-4">
        <h1 className='mb-3'>Report Party Waste</h1>
        <form onSubmit={handleSubmit}>
          <h5>Party Organised At?</h5>
          {/* <div className="d-flex flex-wrap"> */}
          {['Private', 'BMC', 'Hotel', 'Convention Hall', 'Open Field'].map((option) => (
            <div className="form-check me-3 mb-2" key={option}>
              <input className="form-check-input" type="radio" name="partyOrganised" value={option} checked={formData.partyOrganised === option} onChange={handleRadioChange}/>
              <label className="form-check-label">{option}</label>
            </div>
          ))}
          {/* </div> */}

          <div className="row mt-4">
            {/* Venue Name */}
            <div className="col-md-4 col-sm-12 col-12 mb-4">
              <label htmlFor="venuename" className='mb-2 ms-1'>Venue Name</label>
              <input type="text" name='venuename' className='form-control' id='venuename' placeholder='Enter Venue Name' value={formData.venuename} onChange={handleChange}/>
            </div>

            {/* Venue Contact Number */}
            <div className="col-md-4 col-sm-12 col-12 mb-4">
              <label htmlFor="venuecontact" className='mb-2 ms-1'>Venue Contact Number</label>
              <input type="text" name='venuecontact' className='form-control' id='venuecontact' placeholder='Add Venue Contact Number' value={formData.venuecontact} onChange={handleChange} />
            </div>

            {/* Function Type */}
            <div className="col-md-4 col-sm-12 col-12 mb-4">
              <label htmlFor="functiontype" className='mb-2 ms-1'>Function Type</label>
              <select name="functiontype" id="functiontype" className="form-select" value={formData.functiontype} onChange={handleChange}>
                <option value="" disabled>Select Function Type</option>
                {functionTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Fooding Type */}
            <div className="col-md-4 col-sm-12 col-12 mb-4">
              <label htmlFor="foodingtype" className='mb-2 ms-1'>Fooding Type</label>
              <select name="foodingtype" id="foodingtype" className="form-select" value={formData.foodingtype} onChange={handleChange}>
                <option value="" disabled>Select Fooding Type</option>
                {foodingTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Booked from App */}
            <div className="col-md-4 col-sm-12 col-12 mb-4">
              <label htmlFor="bookedfromapp" className='mb-2 ms-1'>Booked from App</label>
              <select name="bookedfromapp" id="bookedfromapp" className="form-select" value={formData.bookedfromapp} onChange={handleChange}>
                <option value="" disabled>Booked from Safai-Mitra App</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Number of Guests */}
            <div className="col-md-4 col-sm-12 col-12 mb-4">
              <label htmlFor="noofguests" className='mb-2 ms-1'>Number of Guests</label>
              <input type="text" name='noofguests' className='form-control' id='noofguests' placeholder='Approx Number of Guests' value={formData.noofguests} onChange={handleChange} />
            </div>

            {/* Customer Name */}
            <div className="col-md-4 col-sm-12 col-12 mb-4">
              <label htmlFor="customername" className='mb-2 ms-1'>Customer Name</label>
              <input type="text" name='customername' className='form-control' id='customername' placeholder='Enter Customer Name' value={formData.customername} onChange={handleChange} />
            </div>
          </div>

          <button type="submit" className='btn btn-primary'>Submit</button>
        </form>
      </div>
    </>
  );
}