import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import makeApiRequest from '../../../../api/axios';
import AdminLayout from '../../AdminLayout';
import GradeCard from './../../../../components/GradeCard/GradeCard';
import UserCard from './../../../../components/UserCard/UserCard';
import './SingleUserAttendancePage.css';

const SingleUserAttendancePage = () => {
  const { id } = useParams();
  const [userAttendance, setUserAttendance] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const [newDate, setNewDate] = useState(null);
  const handleClose2 = () => setOpen2(false);
  const [selectedDetails, setSelectedDetails] = useState();
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {
    const fetchData = async () => {
      const reqParams = {
        url: `/admin/attendance/${id}`,
        method: 'get',
        reqType: 'singleUserAttendance',
      };
      const { success, resData } = await makeApiRequest(reqParams);
      if (success) {
        setUserAttendance(resData);
      }
    };
    fetchData();
  }, []);

  const handleCreateAttendance = async e => {
    e.preventDefault();
    let ReqDate = new Date(newDate);
    ReqDate = ReqDate.toISOString();
    console.log(ReqDate);
    const reqParams = {
      url: `/admin/createattendance/${id}`,
      method: 'post',
      reqType: 'createAttendance',
      reqData: { ReqDate },
    };
    const { success, resData } = await makeApiRequest(reqParams);
    if (success) {
      return location.reload();
    }
  };

  const handleDeleteAttendance = async e => {
    e.preventDefault();
    handleClose();
    console.log(selectedDetails?._id, userAttendance?.user?._id);
    const reqParams = {
      url: `/admin/deleteattendance/${userAttendance?.user?._id}`,
      method: 'put',
      reqType: 'deleteAttendance',
      reqData: {
        attendanceid: selectedDetails?._id,
      },
    };
    const { success, resData } = await makeApiRequest(reqParams);
    if (success) {
      return location.reload();
    }
  };
  return (
    <AdminLayout>
      <div className="user-attendance__admin">
        {userAttendance?.user && (
          <div className="user-attendance__admin-pc">
            <GradeCard userId={userAttendance?.user?._id} />
            <UserCard user={userAttendance?.user} />
          </div>
        )}
        <div className="create-attendance">
          <button onClick={handleOpen2} className="create-attendance-btn">
            Create Attendance
          </button>
          <Modal
            open={open2}
            onClose={handleClose2}
            aria-labelledby="modal-modal-titlw"
            aria-describedby="modal-modal-descriptionw"
          >
            <Box sx={style}>
              <div className="create-date">
                <input type="date" onChange={e => setNewDate(e.target.value)} />
                <button onClick={handleCreateAttendance}>
                  Create Attendance
                </button>
                <button onClick={handleClose2}>Go Back</button>
              </div>
            </Box>
          </Modal>
        </div>
        <div className="user-attendance-table">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead style={{ backgroundColor: '#3498db' }}>
                <TableRow>
                  <TableCell style={{ fontSize: '1.4rem' }}>Date</TableCell>
                  <TableCell style={{ fontSize: '1.4rem' }} align="right">
                    Time
                  </TableCell>
                  <TableCell style={{ fontSize: '1.4rem' }} align="right">
                    Status
                  </TableCell>
                  <TableCell style={{ fontSize: '1.4rem' }} align="right">
                    Leave
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userAttendance?.attendance?.map(attendance => (
                  <TableRow
                    key={attendance?._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    className="table-row"
                    onClick={() => {
                      setSelectedDetails(attendance);
                      handleOpen();
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {attendance?.date}
                    </TableCell>
                    <TableCell align="right">{attendance?.time}</TableCell>
                    <TableCell align="right">
                      {attendance?.isPresent ? 'Present' : 'Leave'}
                    </TableCell>
                    <TableCell align="right">
                      {attendance?.isLeaveSubmitted ? 'Submitted' : '--'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {!userAttendance && <h3>No Attendance History</h3>}
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="attendance-update">
              <div className="attendance-update-details">
                <span>Name: {userAttendance?.user?.fullName}</span>
                <span>Date: {selectedDetails?.date}</span>
                <span>Time: {selectedDetails?.time}</span>
              </div>
              <button onClick={handleDeleteAttendance}>
                Delete Attendance
              </button>
              <button onClick={handleClose}>Go Back</button>
            </div>
          </Box>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default SingleUserAttendancePage;
