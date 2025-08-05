import React, { useRef, useState } from 'react'
import { FaCamera } from "react-icons/fa";
import { useTheme } from '../../component/ThemeContext';

export default function MoKhataSale() {
  const { darkMode } = useTheme();

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
            <h3 className='my-2'>Mo Khata Sale</h3>
          </div>
          <div className="card-body p-4 px-md-5 px-sm-4">
            <form action="">
              <div className="row">
                <div className="col-md-6 col-sm-12 col-12 mb-4">
                  <h5>Mo Khata Sold To ?</h5>
                  {['Commercial', 'Household'].map(option => (
                    <div className="form-check me-3 mb-2" key={option}>
                      <input className="form-check-input" type="radio" name="mokhatasold" value={option} required />
                      <label className="form-check-label">{option}</label>
                    </div>
                  ))}
                </div>

                <div className="col-md-6 col-sm-12 col-12 mb-4">
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

                <div className="col-md-6 col-sm-12 col-12 mb-4">
                  <label className='mb-2 ms-1'>Receipt No.</label>
                  <input type="text" name="receiptno" className="form-control" placeholder="Enter Receipt No." />
                </div>

                <div className="col-md-6 col-sm-12 col-12 mb-4">
                  <label className='mb-2 ms-1'>Quantity Sold</label>
                  <input type="text" name="quantitysold" className="form-control" placeholder="Enter Quantity Sold" />
                </div>

                <div className="col-md-6 col-sm-12 col-12 mb-4">
                  <label className='mb-2 ms-1'>Customer Name</label>
                  <input type="text" name="customername" className="form-control" placeholder="Enter Customer Name" />
                </div>

                <div className="col-md-6 col-sm-12 col-12 mb-4">
                  <label className='mb-2 ms-1'>Customer Phone</label>
                  <input type="text" name="customerphone" className="form-control" placeholder="Enter Customer Phone" />
                </div>
              </div>

              <button type='submit' className='btn btn-success w-25 mt-3'>Submit</button>
            </form>
          </div>
        </div>


      </div>
    </>
  )
}
