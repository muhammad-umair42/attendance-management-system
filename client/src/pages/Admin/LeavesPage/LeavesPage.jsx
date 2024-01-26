import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import LeaveModel from '../../../components/LeaveModel/LeaveModel';
import AdminLayout from '../AdminLayout';
import { makeApiRequest } from './../../../api/axios';
import './LeavesPage.css';

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
const LeavesPage = () => {
  const [leaves, setLeaves] = useState(null);
  const [open, setOpen] = useState(false);
  const [changedLeave, setChangedLeave] = useState(null);
  const [status, setStatus] = useState('approved');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const getLeaves = async () => {
      const reqParams = {
        method: 'get',
        reqType: 'getallleaves',
        url: '/admin/getleaves',
      };
      const { success, resData } = await makeApiRequest(reqParams);
      if (success) {
        return setLeaves(resData);
      }
    };
    getLeaves();
  }, []);

  const handleLeaveStatusChange = async () => {
    const reqParams = {
      method: 'post',
      reqType: 'changeleavestatus',
      url: `/admin/changeleavestatus/${changedLeave?.user?._id}`,
      reqData: {
        leaveId: changedLeave?.leaveHistory[0]?._id,
        status,
      },
    };
    const { success } = await makeApiRequest(reqParams);
    if (success) {
      handleClose();
      return location.reload();
    }
  };

  return (
    <AdminLayout>
      <div className="all-leaves">
        {leaves?.map(leave => (
          <div
            key={leave?.user?._id}
            className="leave"
            onClick={() => {
              setChangedLeave(leave);
              handleOpen();
            }}
          >
            <h3>User Name : {leave?.user?.fullName}</h3>
            <LeaveModel currentLeave={leave?.leaveHistory[0]} />
          </div>
        ))}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="change-leave">
            <h3>Change Leave Status</h3>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Status"
              onChange={e => setStatus(e.target.value)}
            >
              <MenuItem value={'approved'}>Approve</MenuItem>
              <MenuItem value={'rejected'}>Reject</MenuItem>
            </Select>
            <button onClick={handleLeaveStatusChange}>Change Status</button>
            <button onClick={handleClose}>Go Back</button>
          </div>
        </Box>
      </Modal>
    </AdminLayout>
  );
};

export default LeavesPage;
