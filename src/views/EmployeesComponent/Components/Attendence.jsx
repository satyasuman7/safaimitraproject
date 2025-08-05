import { useEffect, useRef, useState } from 'react';
import './Component.css';
import { toast } from 'react-toastify';
import { useTheme } from '../../component/ThemeContext';

//LEAFLET MAP
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

//ICON
import { FaCamera } from "react-icons/fa";

// Fix leaflet's default icon paths
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
//   iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
//   shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
// });

export default function Attendence() {
  const { darkMode } = useTheme();

  const [position, setPosition] = useState(null);
  const [checkInLatLng, setCheckInLatLng] = useState(null);
  const [checkOutLatLng, setCheckOutLatLng] = useState(null);

  const [checkInImage, setCheckInImage] = useState(null);
  const [checkOutImage, setCheckOutImage] = useState(null);
  const [checkInFile, setCheckInFile] = useState(null);
  const [checkOutFile, setCheckOutFile] = useState(null);

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [checkInTime, setCheckInTime] = useState(null);
  const [a_id, setAId] = useState(null);

  const timerRef = useRef(null);
  const fileInputRef = useRef(null);

  const formatTime = (totalSeconds) => {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const startTimer = () => {
    setStartTime(Date.now());
    timerRef.current = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      () => toast.error('Failed to retrieve location')
    );

    const savedCheckIn = localStorage.getItem('checkInTime');
    const savedId = localStorage.getItem('a_id');

    if (savedCheckIn && savedId) {
      const parsedTime = new Date(savedCheckIn);
      const elapsed = Math.floor((Date.now() - parsedTime.getTime()) / 1000);
      setCheckInTime(parsedTime);
      setElapsedTime(elapsed);
      setIsCheckedIn(true);
      setAId(Number(savedId));
      startTimer();
    }
  }, []);

  const openCamera = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    if (!isCheckedIn) {
      setCheckInFile(file);
      setCheckInImage(URL.createObjectURL(file));
    } else {
      setCheckOutFile(file);
      setCheckOutImage(URL.createObjectURL(file));
    }
  };

  const imageSrc = isCheckedIn ? (checkOutImage || '../../../../noImage.jpeg') : (checkInImage || '../../../../noImage.jpeg');

  const handlePunchInOut = async () => {
    const [latitude, longitude] = position || [];

    if (!isCheckedIn) {
      if (!position || !checkInFile) {
        toast.error("Please allow location and take a selfie.");
        return;
      }

      const now = new Date();
      setCheckInTime(now);
      setCheckInLatLng({ latitude, longitude });

      const formData = new FormData();
      formData.append('a_id', 2);
      formData.append('latitude_check_in', latitude);
      formData.append('longitude_check_in', longitude);
      formData.append('check_in', now.toISOString());
      formData.append('photo', checkInFile);

      try {
        const res = await fetch('http://localhost:5000/attendence', {
          method: 'POST',
          body: formData
        });

        if (res.ok) {
          const data = await res.json();
          setAId(data.id);
          localStorage.setItem('a_id', data.id);
          localStorage.setItem('checkInTime', now.toISOString());
          setIsCheckedIn(true);
          startTimer();
          toast.success("Punch In successful!");
        } else {
          toast.error("Punch In failed.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error during Punch In.");
      }

    } else {
      if (!a_id || !checkOutFile) {
        toast.error("Please take a selfie for Punch Out.");
        return;
      }

      setCheckOutLatLng({ latitude, longitude });

      const formData = new FormData();
      formData.append('a_id', a_id);
      formData.append('check_out', new Date().toISOString());
      formData.append('latitude_check_out', latitude);
      formData.append('longitude_check_out', longitude);
      formData.append('photo', checkOutFile);

      try {
        const res = await fetch(`http://localhost:5000/attendence/${a_id}`, {
          method: 'PUT',
          body: formData
        });

        if (res.ok) {
          toast.success("Punch Out successful!");
          localStorage.removeItem('a_id');
          localStorage.removeItem('checkInTime');
          setIsCheckedIn(false);
          setElapsedTime(0);
          setCheckInImage(null);
          setCheckOutImage(null);
          setCheckInFile(null);
          setCheckOutFile(null);
          setCheckInTime(null);
          setAId(null);
          setCheckInLatLng(null);
          setCheckOutLatLng(null);
          stopTimer();
        } else {
          toast.error("Punch Out failed.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error during Punch Out.");
      }
    }
  };

  return (
    <>
      <div className="container-fluid my-4">
        <div class="card shadow">
          <div className={`card-header px-md-5 px-sm-4 ${darkMode ? 'bg-dark' : 'bg-white'}`}>
            <h3 className='my-2'>My Attendence</h3>
          </div>
          <div class="card-body p-4 px-md-5 px-sm-4">
            <div className="maps mb-4">
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

            <div className="row">
              <div className="col-md-6">
                <label className='mb-2'>{isCheckedIn ? "Punch Out Photo" : "Punch In Photo"}</label>
                <input ref={fileInputRef} type="file" accept="image/*" capture="user" className='d-none' onChange={handleImageChange} />
                <button className="btn me-4 mb-2" onClick={openCamera} data-bs-theme={darkMode ? 'dark' : 'light'}>
                  <FaCamera className="cameraUpload" size={40} />
                </button>
                <img src={imageSrc} alt="Selfie preview" className="selfie-preview mb-2" />
              </div>

              <div className="col-md-6">
                <div>
                  <button className="btn btn-success" onClick={handlePunchInOut}>
                    {isCheckedIn ? "Punch Out" : "Punch In"}
                  </button>
                </div>
                {isCheckedIn && (
                  <div className="mt-3">
                    <span className='fw-bold'> Hours Worked: {formatTime(elapsedTime)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}