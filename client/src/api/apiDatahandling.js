/* eslint-disable no-unused-vars */
// import { setUser } from '../app/Slices/userSlice';

import { useSelector } from 'react-redux';
import { deleteUser, setUser } from '../redux/UserSlice/userSlice';

export const apiDataHandler = (reqType, data, dispatch) => {
  let resData = null;

  switch (reqType) {
    case 'LOGIN':
      dispatch(setUser({ user: data?.data?.user }));
      break;
    case 'getallleaves':
      resData = data?.data?.leaves;
      break;
    case 'getreports':
      resData = data.data.reports;
      break;
    case 'logout':
      dispatch(deleteUser());
      break;
    case 'userHomepage':
      resData = data?.data;

      break;
    case 'adminHomePage':
      resData = data?.data?.loginHistory;
      break;
    case 'getusergrade':
      resData = data?.data?.grade;
      break;
    case 'singleUserAttendance':
      resData = data?.data?.userAttendance;
      break;
    case 'attendancesHome':
      resData = data?.data?.Attendances;
      break;
    case 'updateuser':
      dispatch(setUser({ user: data?.data?.user }));
      break;
    case 'getattendance':
      resData = data?.data?.userAttendance;
      break;
    case 'updateprofilepicture':
      dispatch(setUser({ user: data.data.user }));
      resData = data?.data?.user;
      break;
    case 'getSingleuser':
      resData = data?.data?.user;
      break;

    default:
      console.log('no reqType matched to handle Data');
      resData = null;
      break;
  }
  return resData;
};
