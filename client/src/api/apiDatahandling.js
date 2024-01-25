/* eslint-disable no-unused-vars */
// import { setUser } from '../app/Slices/userSlice';

import { useSelector } from 'react-redux';
import { deleteUser, setUser } from '../redux/UserSlice/userSlice';

export const apiDataHandler = (reqType, data, dispatch) => {
  let resData = null;

  switch (reqType) {
    case 'LOGIN':
      dispatch(setUser({ user: data.data.user }));
      break;
    case 'logout':
      dispatch(deleteUser());
      break;
    case 'userHomepage':
      resData = data.data;

      break;
    case 'updateuser':
      dispatch(setUser({ user: data.data.user }));
      break;
    case 'getattendance':
      resData = data.data.userAttendance;
      break;
    case 'updateprofilepicture':
      dispatch(setUser({ user: data.data.user }));
      resData = data.data.user;
      break;
    default:
      console.log('no reqType matched to handle Data');
      resData = null;
      break;
  }
  return resData;
};
