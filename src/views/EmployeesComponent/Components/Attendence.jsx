import React, { useEffect, useRef, useState } from 'react';
import './Component.css';
import { toast } from 'react-toastify';
import { useTheme } from '../../component/ThemeContext';

//LEAFLET MAP
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

//ICON
import { RiCameraAiFill } from "react-icons/ri";

// Fix leaflet's default icon paths
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
//   iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
//   shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
// });


export default function Attendence() {
  const { darkMode } = useTheme();
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

  // Open camera
  const fileInputRef = useRef(null);
  const openCamera = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No file selected.");
      return;
    }

    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    // Create preview image
    const preview = URL.createObjectURL(file);
    setImage(preview);

    // Read file as base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result);
      console.log("Base64 ready");
    };
    reader.readAsDataURL(file);
  };


  // Submit attendance
  const handlePunchIn = async () => {
    if (!position || !base64Image) {
      toast.error("Please allow location and take a selfie.");
      return;
    }

    const [latitude, longitude] = position;
    const payload = {
      latitude,
      longitude,
      timestamp: new Date().toISOString(),
      photo: base64Image,
    };

    try {
      const res = await fetch('http://localhost:5000/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        toast.success('Punch in successful!');
      } else {
        toast.error('Failed to submit punch.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error while sending data.');
    }
  };

  return (
    <>
      <div className="container-fluid my-4">
        <h1 className='mb-3'>My Attendance</h1>
        <div className="maps">
          {position ? (
            <MapContainer center={position} zoom={16} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
              <TileLayer attribution='&copy; <NavLink to="https://www.openstreetmap.org/">OpenStreetMap</NavLink> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={position}>
                <Popup>You are here</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div className="d-flex justify-content-center" style={{ margin: "9rem" }}>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>

        <div className="row mt-5">
          <div className="col-md-6">
            <input ref={fileInputRef} type="file" accept="image/*" capture="user" className='d-none' onChange={handleImageChange} />

            <button className="btn btn-danger me-4 mb-2" style={{width:"150px", height:"150px"}} onClick={openCamera} data-bs-theme={darkMode ? 'dark' : 'light'}>
              <RiCameraAiFill className="cameraUpload" />
            </button>

            {/* Image Preview */}
            {image && (
              <img src={image} alt="Selfie preview" className="selfie-preview mb-2" />
            )}
          </div>

          <div className="col-md-6">
            <div className="mt-4">
              <button className="btn btn-success" onClick={handlePunchIn}>
                Morning Punch In
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}