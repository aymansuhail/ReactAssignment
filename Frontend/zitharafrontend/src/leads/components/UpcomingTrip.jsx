import React, { useState } from 'react';
import EditableField from '../../../components/Input/EditableField';

const UpcomingTrip = () => {
  const [tripDetails, setTripDetails] = useState({
    location: 'Destination City, Country',
    distance: '100 miles',
    arrivalTime: '12:00 PM',
  });

  const handlePlanTrip = () => {
    // Handle planning the trip logic here
    console.log('Planning the trip...');
  };

  // Placeholder map image URL
  const randomMapImageUrl = 'https://via.placeholder.com/800x600'; // Replace with your actual map image URL

  return (
    <div className="max-w-50% mx-auto overflow-hidden bg-base-100  shadow-inherit rounded-md mt-8 p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">Upcoming Trip</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <tbody>
            <tr>
              <th className="text-white">Upcoming Trip</th>
              <td>
                <EditableField
                  label="Upcoming Trip"
                  value={tripDetails.location || 'set location'}
                  onChange={(value) => setTripDetails({ ...tripDetails, location: value })}
                />
              </td>
            </tr>
            <tr>
              <th className="text-white">Distance</th>
              <td>{tripDetails.distance}</td>
            </tr>
            <tr>
              <th className="text-white">Arrival Time</th>
              <td>{tripDetails.arrivalTime}</td>
            </tr>
            <tr>
              <th className="text-white">Map</th>
              <td>
                <img
                  src={randomMapImageUrl}
                  alt="Map"
                  style={{ width: '100%', height: 'auto' }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="text-center">
                <button onClick={handlePlanTrip} className="bg-blue-500 text-white p-2 rounded-md">
                  Plan a Trip
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingTrip;
