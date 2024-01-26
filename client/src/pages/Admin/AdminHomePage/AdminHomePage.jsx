import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import makeApiRequest from '../../../api/axios';
import { deleteUser } from '../../../redux/UserSlice/userSlice';
import UserProfileCard from './../../../components/userProfileCard/UserProfileCard';
import AdminLayout from './../AdminLayout';
import './AdminHomePage.css';

const checkLoginSession = async ({ dispatch }) => {
  const cookie = await Cookies.get('loggedIn');
  if (cookie) {
    return true;
  } else {
    await dispatch(deleteUser());
    return false;
  }
};

const fetchAdminHomePage = async setLoginHistory => {
  const reqParams = {
    url: '/admin/home',
    method: 'get',
    reqType: 'adminHomePage',
  };

  const { success, resData } = await toast.promise(makeApiRequest(reqParams), {
    pending: 'Fetching',
  });
  if (success) {
    setLoginHistory(resData);
  }
  return;
};

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const [loginHistory, setLoginHistory] = useState();

  useEffect(() => {
    const handleHomePageStartUp = async () => {
      //Check if cookie is available
      const isCookieAvailable = await checkLoginSession({ dispatch });

      //Fetch data for homepage
      if (isCookieAvailable) {
        await fetchAdminHomePage(setLoginHistory);
        return;
      }
    };

    handleHomePageStartUp();
  }, []);
  return (
    <AdminLayout>
      <section className="admin-home">
        <section className="admin-profile">
          <UserProfileCard />
        </section>
        <section className="login-history">
          <h3>Today Login history</h3>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    Time
                  </TableCell>
                  <TableCell
                    style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                    align="right"
                  >
                    UserName
                  </TableCell>
                  <TableCell
                    style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                    align="right"
                  >
                    Full Name
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loginHistory?.map(row => (
                  <TableRow
                    key={row.time}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                    >
                      {row.time}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ color: 'green', fontSize: '1.2rem' }}
                    >
                      {row.user.username}
                    </TableCell>
                    <TableCell align="right">{row.user.fullName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </section>
      </section>
    </AdminLayout>
  );
};

export default AdminHomePage;
