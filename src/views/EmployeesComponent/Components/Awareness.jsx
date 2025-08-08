import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '../../component/ThemeContext';
import { FaCamera } from "react-icons/fa";

export default function Awareness() {
  //DARK MODE
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

  //FOR LOCATION
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    // Fetch locations from API
    fetch('http://localhost:3000/location')
      .then((response) => response.json())
      .then((data) => setLocations(data))
      .catch((error) => console.error('Error fetching locations:', error));
  }, []);

  const locationhandleChange = (e) => {
    setSelectedLocation(e.target.value);
  };
  return (
    <>
      <div className="container-fluid my-4">
        <div className="card shadow">
          <div className={`card-header px-md-5 px-sm-4 ${darkMode ? 'bg-dark' : 'bg-white'}`}>
            <h3 className="my-2">Awareness</h3>
          </div>
          <div className="card-body p-4 px-md-5 px-sm-4">
            <form action="">
              <div className="row">
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
                  <label className='mb-2 ms-1'>Gathering Range (Approx)</label>
                  <select className="form-select" name="gathering_range" required>
                    <option value="">Select an option</option>
                    {['0 - 50 people', '50 - 100 people', '100+ people'].map(option => (
                      <option key={option} value={option}> {option} </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 col-sm-12 col-12 mb-4">
                  <label className="mb-2 ms-1">Gathering Location</label>
                  <select className="form-select" name="gathering_location" required value={selectedLocation} onChange={locationhandleChange}>
                    <option value="">Select an location</option>
                    {locations.map((location) =>
                      location.cities.map((city) =>
                        city.wards.map((ward) =>
                          ward.areas.map((area, index) => (
                            <option key={`${ward.ward}-${index}`} value={`${ward.ward} - ${area}`}>
                              {ward.ward} - {area}
                            </option>
                          ))
                        )
                      )
                    )}
                  </select>
                </div>

                <div className="col-md-12 col-sm-12 col-12 mb-4">
                  <label className="mb-2 ms-1">Reason of Gathering</label>
                  <textarea name="reason_of_gathering" className="form-control" rows="5" placeholder="Reason of Gathering"></textarea>
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
