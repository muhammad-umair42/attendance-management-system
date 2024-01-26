import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import makeApiRequest from '../../../api/axios';
import AdminLayout from './../AdminLayout';
import './AttendancePage.css';
const AttendancePage = () => {
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const reqParams = {
        url: '/admin/attendances',
        method: 'get',
        reqType: 'attendancesHome',
      };

      const { success, resData } = await toast.promise(
        makeApiRequest(reqParams),
        {
          pending: 'Fetching',
        },
      );
      if (success) {
        return setUsers(resData);
      }
    };

    fetchData();
  }, []);
  return (
    <AdminLayout>
      <div className="admin-attendances">
        <h2>All Users</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  _id
                </TableCell>
                <TableCell
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                  align="right"
                >
                  UserName
                </TableCell>
                <TableCell
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                  align="right"
                >
                  FullName
                </TableCell>
                <TableCell
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                  align="right"
                >
                  Joining Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map(user => (
                <TableRow
                  key={user?._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  className="admin__attendances-tableRow"
                  onClick={() => navigate(`/attendance/${user._id}`)}
                >
                  <TableCell
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: '500',
                    }}
                    className="attendances__table-cell"
                    component="th"
                    scope="row"
                  >
                    {user?._id}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: '500',
                    }}
                    className="attendances__table-cell"
                    align="right"
                  >
                    {user?.username}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: '500',
                    }}
                    className="attendances__table-cell"
                    align="right"
                  >
                    {user?.fullName}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: '500',
                    }}
                    className="attendances__table-cell"
                    align="right"
                  >
                    {user?.createdAt.split('T')[0]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </AdminLayout>
  );
};

export default AttendancePage;
