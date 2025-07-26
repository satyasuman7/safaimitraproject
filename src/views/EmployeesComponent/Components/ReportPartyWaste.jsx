import React, { useRef, useState, useActionState } from 'react';
import { toast } from 'react-toastify';
import { RiCameraAiFill } from "react-icons/ri";
import { useTheme } from '../../component/ThemeContext';

export default function ReportPartyWaste() {
  const { darkMode } = useTheme();
  const functionTypes = ["Marriage", "Reception", "Birthday", "Marriage Anniversary", "Death Anniversary", "Thread Ceremony", "Religious Events", "Cultral Programme", "Institutional Event", "Picnic Party", "In-House Party"];
  const foodingTypes = ["Lunch", "Dinner", "Both"];

  const submitForm = async (prevState, formData) => {
    const data = {
      partyOrganised: formData.get('partyOrganised'),
      venuename: formData.get('venuename'),
      venuecontact: formData.get('venuecontact'),
      functiontype: formData.get('functiontype'),
      foodingtype: formData.get('foodingtype'),
      bookedfromapp: formData.get('bookedfromapp'),
      noofguests: formData.get('noofguests'),
      customername: formData.get('customername'),
      image: formData.get('image'),
    };

    try {
      const res = await fetch('http://localhost:3000/reportpartywaste', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error('Failed to submit');

      toast.success('Form submitted successfully');
      fileInputRef.current.value = '';
      setImagePreview(null);
      setImageBase64('');
      return { success: true };
    } catch (err) {
      toast.error('Submission failed');
      return { success: false, message: err.message };
    }
  };

  const [state, formAction] = useActionState(submitForm, { success: null });

  //FOR IMAGE PREVIEW & UPLOAD
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState('');
  const openCamera = (e) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Invalid image file.");
      return;
    }

    const preview = URL.createObjectURL(file);
    setImagePreview(preview);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="container-fluid my-4">
        <h1 className='mb-3'>Report Party Waste</h1>
        <form action={formAction}>
          <h5>Party Organised At?</h5>
          <div className="row">
            <div className="col-md-6 col-sm-12 col-12">
              {['Private', 'BMC', 'Hotel', 'Convention Hall', 'Open Field'].map(option => (
                <div className="form-check me-3 mb-2" key={option}>
                  <input className="form-check-input" type="radio" name="partyOrganised" value={option} required />
                  <label className="form-check-label">{option}</label>
                </div>
              ))}
            </div>

            <div className="col-md-6 col-sm-12 col-12">
              <label className='mb-2'>Upload Photo</label>
              <input ref={fileInputRef} type="file" accept="image/*" capture="user" name="image_file" className="d-none" onChange={handleImageChange} />
              <input type="hidden" name="image" value={imageBase64} />
              <button type="button" className="btn border-0 mx-3" onClick={openCamera}>
                <RiCameraAiFill size={70} data-bs-theme={darkMode ? 'dark' : 'light'} />
              </button>
              {imagePreview && <img src={imagePreview} alt="Preview" className="selfie-preview mb-2" />}
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-4 mb-4">
              <label className='mb-2 ms-1'>Venue Name</label>
              <input type="text" name="venuename" className="form-control" placeholder="Enter Venue Name" />
            </div>
            <div className="col-md-4 mb-4">
              <label className='mb-2 ms-1'>Venue Contact Number</label>
              <input type="number" name="venuecontact" className="form-control" placeholder="Contact Number" />
            </div>
            <div className="col-md-4 mb-4">
              <label className='mb-2 ms-1'>Function Type</label>
              <select name="functiontype" className="form-select" defaultValue="">
                <option value="" disabled>Select Function Type</option>
                {functionTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4 mb-4">
              <label className='mb-2 ms-1'>Fooding Type</label>
              <select name="foodingtype" className="form-select" defaultValue="">
                <option value="" disabled>Select Fooding Type</option>
                {foodingTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4 mb-4">
              <label className='mb-2 ms-1'>Booked from App</label>
              <select name="bookedfromapp" className="form-select" defaultValue="">
                <option value="" disabled>Booked from Safai-Mitra App</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="col-md-4 mb-4">
              <label className='mb-2 ms-1'>Number of Guests</label>
              <input type="nymber" name="noofguests" className="form-control" placeholder="Approx Number of Guests" />
            </div>
            <div className="col-md-4 mb-4">
              <label className='mb-2 ms-1'>Customer Name</label>
              <input type="text" name="customername" className="form-control" placeholder="Enter Customer Name" />
            </div>
          </div>

          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    </>
  );
}