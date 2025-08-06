import React, { useActionState, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { FaCamera } from "react-icons/fa";
import { useTheme } from '../../component/ThemeContext';


export default function CndWaste() {
  const { darkMode } = useTheme();
  const constructionTypes = ["Building", "Road", "Drain", "Others"];
  const cndTypes = ["Debris", "Materials", "Both"];

  const submitForm = async (prevState, formData) => {
    const data = {
      cndWaste: formData.get('cndWaste'),
      image: formData.get('image'),
      locationname: formData.get('locationname'),
      authorizedperson: formData.get('authorizedperson'),
      constructiontype: formData.get('constructiontype'),
      cndtype: formData.get('cndtype'),
      bookedfromapp: formData.get('bookedfromapp'),
      amountofwaste: formData.get('amountofwaste'),
      customername: formData.get('customername'),
    };

    try {
      const res = await fetch('http://localhost:3000/cndwaste', {
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
        <div className="card shadow">
          <div className={`card-header px-md-5 px-sm-4 ${darkMode ? 'bg-dark' : 'bg-white'}`}>
            <h3 className="my-2">CND Waste Report</h3>
          </div>
          <div className="card-body p-4 px-md-5 px-sm-4">
            <form action={formAction}>
              <h5>CnD Waste By?</h5>
              <div className="row">
                <div className="col-md-6 col-sm-12 col-12">
                  {['Private', 'Public Place', 'State', 'Central'].map(option => (
                    <div className="form-check me-3 mb-2" key={option}>
                      <input className="form-check-input" type="radio" name="cndWaste" value={option} required />
                      <label className="form-check-label">{option}</label>
                    </div>
                  ))}
                </div>

                <div className="col-md-6 col-sm-12 col-12">
                  <label className='mb-2'>Upload Photo</label>
                  <input ref={fileInputRef} type="file" accept="image/*" capture="user" name="image_file" className="d-none" onChange={handleImageChange} />
                  <input type="hidden" name="image" value={imageBase64} />
                  <button type="button" className="btn border-0 mx-3" onClick={openCamera}>
                    <FaCamera size={40} data-bs-theme={darkMode ? 'dark' : 'light'} />
                  </button>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="selfie-preview mb-2" />
                  ) : (
                    <img src='../../../../noImage.jpeg' alt="Preview" className="selfie-preview mb-2" />
                  )}
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-4 mb-4">
                  <label className='mb-2 ms-1'>Customer Name</label>
                  <input type="text" name="customername" className="form-control" placeholder="Enter Customer Name" />
                </div>
                <div className="col-md-4 mb-4">
                  <label className='mb-2 ms-1'>Authorised Person Contact Number</label>
                  <input type="number" name="authorizedperson" className="form-control" placeholder="Enter Authorised Contact No." />
                </div>
                <div className="col-md-4 mb-4">
                  <label className='mb-2 ms-1'>Location Name</label>
                  <input type="text" name="locationname" className="form-control" placeholder="Enter Location Name" />
                </div>
                <div className="col-md-4 mb-4">
                  <label className='mb-2 ms-1'>Construction Type</label>
                  <select name="constructiontype" className="form-select" defaultValue="">
                    <option value="" disabled>Select Construction Type</option>
                    {constructionTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4 mb-4">
                  <label className='mb-2 ms-1'>CnD Type</label>
                  <select name="cndtype" className="form-select" defaultValue="">
                    <option value="" disabled>Select CnD Type</option>
                    {cndTypes.map(type => (
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
                  <label className='mb-2 ms-1'>Amount of Waste (Ton)</label>
                  <input type="number" name="amountofwaste" className="form-control" placeholder="Approx Amount of Waste" />
                </div>
              </div>

              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}