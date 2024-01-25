import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import makeApiRequest from '../../../api/axios';
import Layout from './../Layout';

const fetUserAttendance = async (user, setUserAttendanceData) => {
  const makeParams = {
    method: 'get',
    url: `/user/userattendance/${user._id}`,
    reqType: 'getattendance',
  };

  const { success, resData } = await toast.promise(makeApiRequest(makeParams), {
    pending: 'Fetching Details',
  });
  if (success) {
    setUserAttendanceData(resData);
  }
};

const UserAttendancePage = () => {
  const user = useSelector(state => state.user);
  const [userAttendanceData, setUserAttendanceData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      await fetUserAttendance(user, setUserAttendanceData);
    };
    fetchData();
  }, []);
  return (
    <Layout>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontSize: '1.5rem', fontWeight: '500' }}>
                Date
              </TableCell>
              <TableCell
                style={{ fontSize: '1.5rem', fontWeight: '500' }}
                align="right"
              >
                Status
              </TableCell>
              <TableCell
                style={{ fontSize: '1.5rem', fontWeight: '500' }}
                align="right"
              >
                Leave Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userAttendanceData?.map(data => (
              <TableRow
                key={data?.date}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{ fontSize: '1.2rem' }}
                >
                  <b> {data?.date}</b>
                </TableCell>
                <TableCell align="right" style={{ fontSize: '1.2rem' }}>
                  {data?.isPresent ? 'Present' : 'Leave Submitted'}
                </TableCell>

                <TableCell align="right" style={{ fontSize: '1.2rem' }}>
                  {data?.leaveStatus ? data.leaveStatus : '--'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default UserAttendancePage;
