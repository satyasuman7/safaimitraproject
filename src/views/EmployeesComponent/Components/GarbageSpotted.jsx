import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '../../component/ThemeContext';
import { RiCameraAiFill } from "react-icons/ri";

//LEAFLET MAP
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


export default function GarbageSpotted() {
  const { darkMode } = useTheme();
  const [complaintType, setComplaintType] = useState('');

  // Get geolocation
  const [position, setPosition] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      () => toast.error('Failed to retrieve location')
    );
  }, []);

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
        <h1 className='mb-3'>Garbage Spotted</h1>
        <div className="maps">
          {position ? (
            <MapContainer center={position} zoom={16} scrollWheelZoom={true} className='map_card'>
              <TileLayer attribution='&copy; <NavLink to="https://www.openstreetmap.org/">OpenStreetMap</NavLink> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={position}>
                <Popup>You are here</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div className="d-flex justify-content-center no_map_card">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>

        <form action="">
          <div className="row mt-4">
            <div className="col-md-6 col-sm-12 col-12 mb-3">
              <h5>Select Garbage Cleaner Type</h5>
              {['Agency', 'NGO', 'Main Road', 'Janpath'].map(option => (
                <div className="form-check me-3 mb-2" key={option}>
                  <input className="form-check-input" type="radio" name="garbage_cleaner_type" value={option} required />
                  <label className="form-check-label">{option}</label>
                </div>
              ))}
            </div>

            <div className="col-md-6 col-sm-12 col-12 mb-3">
              <label className='mb-2'>Upload Photo</label>
              <input ref={fileInputRef} type="file" accept="image/*" capture="user" name="image_file" className="d-none" onChange={handleImageChange} />
              <input type="hidden" name="image" value={imageBase64} />
              <button type="button" className="btn border-0 mx-3" onClick={openCamera}>
                <RiCameraAiFill size={70} data-bs-theme={darkMode ? 'dark' : 'light'} />
              </button>
              {imagePreview && <img src={imagePreview} alt="Preview" className="selfie-preview mb-2" />}
            </div>

            <div className="col-md-4 col-sm-12 col-12 mb-3">
              <label htmlFor="complainttype" className="mb-2 ms-1">Complaint Type</label>
              <select name="complaint_type" id="complainttype" className='form-select' value={complaintType} onChange={(e) => setComplaintType(e.target.value)}>
                <option disabled selected>Select Complaint Type</option>
                {['Roads', 'Public Toilets', 'Drainage', 'Solid Waste', 'Dead Animal', 'Street Light'].map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="col-md-4 col-sm-12 col-12 mb-3">
              <label className='mb-2 ms-1'>Landmark</label>
              <input type="text" name="landmark" className="form-control" placeholder="Add Landmark" />
            </div>

            <div className="col-md-4 col-sm-12 col-12 mb-3">
              <label className='mb-2 ms-1'>Comment</label>
              <input type="text" name="comment" className="form-control" placeholder="Add Comment" />
            </div>
          </div>

          <button className='btn btn-success mt-4 w-25' type='submit'>Submit</button>
        </form>
      </div>
    </>
  )
}
