import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DriverProfile = () => {
  const { id, firstname } = useParams();
  const [driver, setDriver] = useState({
    id: null,
    firstname: null,
    lastname: null,
    phone: null,
    vehicle: null,
    cdl: null,
    status: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const [editableFields, setEditableFields] = useState({
    phone: false,
    vehicle: false,
    cdl: false,
    status: false,
  });

  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8090/api/collections/Drivers/records/${id}`);
        const data = await response.json();

        console.log('API Response:', data);

        setDriver({
          id: data.id,
          firstname: data.firstname,
          lastname: data.lastname,
          phone: data.phone || 'set phone',
          vehicle: data.vehicle || 'assign a vehicle',
          cdl: data.cdl || 'add cdl',
          status: data.status, // Keep the original boolean value
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchDriverDetails();
  }, [id, firstname]);

  const handleEdit = (field) => {
    setEditableFields({ ...editableFields, [field]: true });
  };

  const handleSave = async (field) => {
    try {
      const payload = {};
  
      // Map the field names to the expected keys in the payload
      switch (field) {
        case 'firstname':
          payload['firstname'] = driver[field];
          break;
        case 'lastname':
          payload['lastname'] = driver[field];
          break;
        case 'email':
          payload['email'] = driver[field];
          break;
        case 'Drivers':
          payload['Drivers'] = driver[field];
          break;
        case 'phone':
          payload['phone'] = driver[field];
          break;
        case 'vehicle':
          payload['vehicle'] = driver[field];
          break;
        case 'cdl':
          payload['cdl'] = driver[field];
          break;
        case 'status':
          payload['status'] = !driver[field]; // Toggle the boolean value
          break;
        default:
          break;
      }
  
      const response = await fetch(`http://127.0.0.1:8090/api/collections/Drivers/records/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        // If the update is successful, set the editable field to false
        setEditableFields({ ...editableFields, [field]: false });
      } else {
        console.error('Failed to update data:', response.status);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-50% mx-auto overflow-hidden bg-base-100 shadow-inherit rounded-md mt-8 p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">Driver Profile</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <tbody>
            <tr>
              <th className="text-white">ID</th>
              <td>{driver.id}</td>
            </tr>
            <tr>
              <th className="text-white">First Name</th>
              <td>{driver.firstname}</td>
            </tr>
            <tr>
              <th className="text-white">Last Name</th>
              <td>{driver.lastname}</td>
            </tr>
            <tr>
              <th className="text-white">Phone</th>
              <td>
                {driver.phone}
                {editableFields.phone ? (
                  <>
                    <input
                    className=' border rounded px-2 py-1 focus:outline-none focus:border-blue-500'
                      type="text"
                      value={driver.phone}
                      onChange={(e) => setDriver({ ...driver, phone: e.target.value })}
                    />
                    <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 focus:outline-none" onClick={() => handleSave('phone')}>Save</button>
                  </>
                ) : (
                  <button className=' bg-slate-700 text-white ml-12 active:bg-slate-600 font-bold  text-sm px-3 py-1  rounded-2xl shadow hover:shadow-lg outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:underline focus:outline-none ' onClick={() => handleEdit('phone')}>Edit</button>
                )}
              </td>
            </tr>
            <tr>
              <th className="text-white">Vehicle Assigned</th>
              <td>
                {driver.vehicle}
                {editableFields.vehicle ? (
                  <>
                    <input
                      className='border rounded px-2 py-1 focus:outline-none focus:border-blue-500'
                      type="text"
                      value={driver.vehicle}
                      onChange={(e) => setDriver({ ...driver, vehicle: e.target.value })}
                    />
                    <button className="bg-green-500  text-white px-2 py-1 rounded hover:bg-green-600 focus:outline-none" onClick={() => handleSave('vehicle')}>Save</button>
                  </>
                ) : (
                  <button className=' bg-slate-700 text-white ml-12 active:bg-slate-600 font-bold  text-sm px-3 py-1  rounded-2xl shadow hover:shadow-lg outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:underline focus:outline-none ' onClick={() => handleEdit('vehicle')}>Edit</button>
                )}
              </td>
            </tr>
            <tr>
              <th className="text-white">CDL</th>
              <td>
                {driver.cdl}
                {editableFields.cdl ? (
                  <>
                    <input
                    className='border rounded px-2 py-1 focus:outline-none focus:border-blue-500'
                      type="text"
                      value={driver.cdl}
                      onChange={(e) => setDriver({ ...driver, cdl: e.target.value })}
                    />
                    <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 focus:outline-none" onClick={() => handleSave('cdl')}>Save</button>
                  </>
                ) : (
                  <button className=' bg-slate-700 text-white active:bg-slate-600 ml-12 font-bold  text-sm px-3 py-1  rounded-2xl shadow hover:shadow-lg outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:underline focus:outline-none ' onClick={() => handleEdit('cdl')}>Edit</button>
                )}
              </td>
            </tr>
            <tr>
  <th className="text-white">Status</th>
  <td>
    {editableFields.status ? (
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          className="toggle"
          checked={driver.status}
          onChange={() => setDriver({ ...driver, status: !driver.status })}
        />
        <button onClick={() => handleSave('status')}>Save</button>
      </div>
    ) : (
      <input type="checkbox" className="toggle"  />
    )}
  </td>
</tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverProfile;
