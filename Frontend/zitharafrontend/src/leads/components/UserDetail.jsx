import DriverProfile from './DriverProfile';  // Assuming DriverProfile is in the same directory

import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react'
import { useDispatch } from 'react-redux'

import { setPageTitle } from '../../common/headerSlice';
import UserBehavior from './UserBehavior';
import UpcomingTrip from './UpcomingTrip';
function DriverDetail() {
    const { id, firstname } = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : `Drivers > ${firstname}` }))
      }, [dispatch, firstname])

    return(
        <div className="flex-1 mr-2 flex flex-col md:flex-row ">
            <div className="flex-1 mb-4 md:mr-4 md:mb-0">
          <DriverProfile />
          <UserBehavior />
            </div>
        <div className="flex-1">
          <UpcomingTrip />
        </div>
      </div>
    )
}

export default DriverDetail;

