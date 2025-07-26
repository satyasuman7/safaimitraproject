import React, { useEffect, useState } from 'react'
import { InputSwitch } from 'primereact/inputswitch';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { toast } from 'react-toastify';

export default function ConservancyReport() {
  const [checked, setChecked] = useState(false); // Switch ON/OFF
  const [areaOptions, setAreaOptions] = useState([]);
  const [selectedAreaIndex, setSelectedAreaIndex] = useState('');
  const [sweeperCount, setSweeperCount] = useState('');

  // Fetch area/ward/city data
  useEffect(() => {
    fetch('http://localhost:3000/location')
      .then(res => res.json())
      .then(data => {
        const flattened = [];
        data.forEach(location => {
          location.cities.forEach(city => {
            city.wards.forEach(ward => {
              ward.areas.forEach(area => {
                flattened.push({
                  area,
                  ward: ward.ward,
                  city: city.city
                });
              });
            });
          });
        });
        setAreaOptions(flattened);
      })
      .catch(err => {
        console.error("Failed to fetch location data:", err);
      });
  }, []);

  // Get user's geolocation
  const [position, setPosition] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => { setPosition([pos.coords.latitude, pos.coords.longitude]) },
      () => console.error('Failed to retrieve location')
    );
  }, []);

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedArea = areaOptions[selectedAreaIndex];

    const conservancyReport = {
      area: selectedArea.area,
      ward: selectedArea.ward,
      city: selectedArea.city,
      latitude: position[0],
      longitude: position[1],
      sweepersPresent: sweeperCount,
      isClean: checked
    };

    const response = await fetch('http://localhost:3000/conservancyreport', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(conservancyReport)
    });

    if (response.ok) {
      toast.success('Report submitted successfully!');
      setSelectedAreaIndex(''); // Reset form
      setSweeperCount('');
      setChecked(true);
    } else {
      toast.error('Failed to submit report.');
    }
  };

  return (
    <>
      <div className='container-fluid my-4'>
        <h1 className="mb-3">Conservancy Lane Report</h1>

        <div className="maps mb-4">
          {position ? (
            <MapContainer center={position} zoom={16} scrollWheelZoom={true} style={{ height: '400px', width: '100%' }}>
              <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-4">
              <label htmlFor="commerciallane" className='mb-2 ms-1'>Conservancy Lane</label>
              <select name="commerciallane" id="commerciallane" className="form-select" value={selectedAreaIndex} onChange={(e) => setSelectedAreaIndex(e.target.value)}>
                <option value="" disabled>Select Conservancy Lane</option>
                {areaOptions.map((item, index) => (
                  <option key={index} value={index}>
                    {item.area} ({item.ward})
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-4">
              <label htmlFor="sweeperpresent" className='mb-2 ms-1'>Sweepers Present</label>
              <input type="number" name='sweeperpresent' className='form-control' id='sweeperpresent' placeholder='No. of Sweepers Present' value={sweeperCount} onChange={(e) => setSweeperCount(e.target.value)} />
            </div>

            <div className="col-md-6 mb-4 d-flex align-items-center">
              <label className='me-3'>Conservancy Lane Clean?</label>
              <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
            </div>
          </div>

          <button type="submit" className='btn btn-success'>Submit</button>
        </form>
      </div>
    </>
  )
}
