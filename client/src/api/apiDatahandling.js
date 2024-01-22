// import { setUser } from '../app/Slices/userSlice';

export const apiDataHandler = (reqType, data, dispatch) => {
  let resData = null;

  switch (reqType) {
    default:
      console.log('no reqType matched to handle Data');
      resData = null;
      break;
  }
  return resData;
};
