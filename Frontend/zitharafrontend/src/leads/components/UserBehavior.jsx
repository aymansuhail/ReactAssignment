import React, { useState } from 'react';
import EditableField from '../../../components/Input/EditableField';

const UserBehavior = () => {
  const [driverBehavior, setDriverBehavior] = useState({
    fuelEconomy: null,
    harshAcceleration: null,
    speedLimitExceeded: null,
    idlingRate: null,
  });

  return (
    <div className="max-w-50% mx-auto overflow-hidden bg-base-100  shadow-inherit rounded-md mt-8 p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">User Behavior</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <tbody>
            <tr>
              <th className="text-white">Driver Behavior</th>
              <td>
                <button onClick={() => console.log('View All')} className="text-white">
                  View All
                </button>
              </td>
            </tr>
            <tr>
              <th className="text-white">Fuel Economy</th>
              <td>
                <EditableField
                  label="Fuel Economy"
                  value={driverBehavior.fuelEconomy || 'set fuel economy'}
                  onChange={(value) => setDriverBehavior({ ...driverBehavior, fuelEconomy: value })}
                />
              </td>
            </tr>
            <tr>
              <th className="text-white">Harsh Acceleration</th>
              <td>
                <EditableField
                  label="Harsh Acceleration"
                  value={driverBehavior.harshAcceleration || 'set harsh acceleration'}
                  onChange={(value) => setDriverBehavior({ ...driverBehavior, harshAcceleration: value })}
                />
              </td>
            </tr>
            <tr>
              <th className="text-white">Speed Limit Exceeded</th>
              <td>
                <EditableField
                  label="Speed Limit Exceeded"
                  value={driverBehavior.speedLimitExceeded || 'set speed limit exceeded'}
                  onChange={(value) => setDriverBehavior({ ...driverBehavior, speedLimitExceeded: value })}
                />
              </td>
            </tr>
            <tr>
              <th className="text-white">Idling Rate</th>
              <td>
                <EditableField
                  label="Idling Rate"
                  value={driverBehavior.idlingRate || 'set idling rate'}
                  onChange={(value) => setDriverBehavior({ ...driverBehavior, idlingRate: value })}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserBehavior;
