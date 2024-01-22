/* eslint-disable no-unused-vars */
// import { setUser } from '../app/Slices/userSlice';

import { setUser } from '../redux/UserSlice/userSlice';

export const apiDataHandler = (reqType, data, dispatch) => {
  let resData = null;

  switch (reqType) {
    case 'LOGIN':
      dispatch(setUser({ user: data.data.user }));
      break;
    default:
      console.log('no reqType matched to handle Data');
      resData = null;
      break;
  }
  return resData;
};
