import React, { useEffect, useState, useActionState } from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { toast } from 'react-toastify';

export default function ConservancyReport() {
  const [checked, setChecked] = useState(false); // Switch ON/OFF
  const [areaOptions, setAreaOptions] = useState([]);
  const [selectedAreaIndex, setSelectedAreaIndex] = useState('');
  const [sweeperCount, setSweeperCount] = useState('');
  const [errors, setErrors] = useState({});

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
      .catch(err => toast.error('Failed to fetch location data:', err));
  }, []);

  // Get user's geolocation
  const [position, setPosition] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => { setPosition([pos.coords.latitude, pos.coords.longitude]) },
      () => console.error('Failed to retrieve location')
    );
  }, []);

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (selectedAreaIndex === '') newErrors.area = 'Please select a conservancy lane.';
    if (!sweeperCount || parseInt(sweeperCount) <= 0)
      newErrors.sweeper = 'Enter a valid sweeper count.';
    if (!position) newErrors.location = 'Location not available. Enable GPS.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // useActionState for form submission
  const [state, submitAction, isPending] = useActionState(async prevState => {
    if (!validateForm()) return prevState;

    const selectedArea = areaOptions[selectedAreaIndex];

    const conservancyReport = {
      a_id: 2,
      area: selectedArea.area,
      ward_no: selectedArea.ward,
      city: selectedArea.city,
      latitude: position[0],
      longitude: position[1],
      sweeper_present: parseInt(sweeperCount),
      is_clean: checked,
      date: new Date().toISOString().split('T')[0],
    };

    try {
      const response = await fetch('http://localhost:5000/conservancyreport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(conservancyReport),
      });

      if (response.ok) {
        toast.success('Report submitted successfully!');
        // ✅ Reset form after submission
        setSelectedAreaIndex('');
        setSweeperCount('');
        setChecked(false);
        setErrors({});
        return { success: true };
      } else {
        toast.error('Failed to submit report.');
        return { success: false };
      }
    } catch (err) {
      console.error('Error submitting report:', err);
      toast.error('Server error occurred.');
      return { success: false };
    }
  }, { success: false });

  return (
    <>
      <div className='container-fluid my-4'>
        <h1 className="mb-3">Conservancy Lane Report</h1>

        <div className="maps mb-4">
          {position ? (
            <MapContainer center={position} zoom={16} scrollWheelZoom={true} className='map_card'>
              <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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

        {errors.location && <div className="alert alert-warning">{errors.location}</div>}

        <form action={submitAction}>
          <div className="row">
            {/* Conservancy Lane */}
            <div className="col-md-6 mb-4">
              <label htmlFor="conservancylane" className="mb-2 ms-1">Conservancy Lane</label>
              <select name="conservancylane" id="conservancylane" className={`form-select ${errors.area ? 'is-invalid' : ''}`} value={selectedAreaIndex} onChange={e => setSelectedAreaIndex(e.target.value)}>
                <option value="" disabled>Select Conservancy Lane</option>
                {areaOptions.map((item, index) => (
                  <option key={index} value={index}> {item.area} ({item.ward}) </option>
                ))}
              </select>
              {errors.area && <div className="invalid-feedback">{errors.area}</div>}
            </div>

            {/* Sweeper Count */}
            <div className="col-md-6 mb-4">
              <label htmlFor="sweeper_present" className="mb-2 ms-1">Sweepers Present</label>
              <input type="number" name="sweeper_present" className={`form-control ${errors.sweeper ? 'is-invalid' : ''}`} id="sweeper_present" placeholder="No. of Sweepers Present" value={sweeperCount} onChange={e => setSweeperCount(e.target.value)} />
              {errors.sweeper && <div className="invalid-feedback">{errors.sweeper}</div>}
            </div>

            {/* Lane Clean Switch */}
            <div className="col-md-6 mb-4 d-flex align-items-center">
              <label className="me-3">Conservancy Lane Clean?</label>
              <InputSwitch checked={checked} onChange={e => setChecked(e.value)} />
            </div>
          </div>

          <button type="submit" className="btn btn-success" disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  )
}