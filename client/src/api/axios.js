import axios from 'axios';
// import { toast } from 'react-toastify';
import { apiDataHandler } from './dataController';

//Axios file instance for JSON DATA Requests
const instance = axios.create({
  baseURL: `http://localhost:4000/api/v1`,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

//Api File Instance for File Requests
const fileInstance = axios.create({
  baseURL: `http://localhost:4000/api/v1`,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Dynamic Req Function
export const makeApiRequest = async ({
  method,
  url,
  reqData = {},
  reqType = '',
  dispatch = null,
}) => {
  let success = false;
  let resData = null;

  try {
    let data = null;

    if (reqType === 'updateprofilepicture') {
      const { data: fileData } = await fileInstance[method](url, reqData);
      data = fileData;
    } else {
      const { data: fileData } = await instance[method](url, reqData);
      data = fileData;
    }

    resData = apiDataHandler(reqType, data, dispatch);
    success = true;

    return { success, resData };
  } catch (error) {
    //Error Mesage is in HTML format so we need to trim only message
    console.log(error);
    // const parser = new DOMParser();
    // const doc = parser.parseFromString(error?.response?.data, 'text/html');
    // const errorUnTrimmedMessage = doc.body.textContent.trim();
    // const regex = /Error: (.+?)\s+at/;
    // const match = regex.exec(errorUnTrimmedMessage);
    // const errorMessage = match ? match[1] : 'Could not connect to server';

    // //SHOWING ERROR
    // toast.error(errorMessage);
    return { success, resData };
  }
};

export default makeApiRequest;
