/* eslint-disable no-unused-vars */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import makeApiRequest from '../../../api/axios';
import AdminLayout from '../AdminLayout';
import './SystemReportPage.css';

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

const SystemReportPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [from, setFrom] = useState(null);
  const [reports, setReports] = useState([]);
  const [to, setTo] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      const reqParams = {
        method: 'get',
        url: '/admin/getreports',
        reqType: 'getreports',
      };

      const { success, resData } = await makeApiRequest(reqParams);
      if (success) {
        setReports(resData);
      }
    };
    fetchReports();
    console.log(reports);
  }, []);
  const handleGenerateReport = async e => {
    e.preventDefault();
    const reqParams = {
      method: 'post',
      url: '/admin/createreport',
      reqType: 'createreport',
      reqData: {
        from,
        to,
        message,
      },
    };
    const { success, resData } = await makeApiRequest(reqParams);
    if (success) {
      handleClose();
      location.reload();
    }
  };
  return (
    <AdminLayout>
      <div className="system-reports">
        <h1>System Reports</h1>
        <button onClick={handleOpen}>CreateReport</button>
        {reports.map(report => (
          <div key={report?._id} className="report-card">
            <h3>Report</h3>
            <div className="users">
              <h2>Users</h2>
              <div className="users_box">
                {report?.users?.map((user, i) => (
                  <span key={i}>{user.fullName}</span>
                ))}
              </div>
            </div>
            <div className="dates">
              <span>From :{report.from}</span>
              <span>To :{report.to}</span>
            </div>
            <div className="report-message">
              <h4>Report Message</h4>
              <span>{report.report}</span>
            </div>
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
          <div className="report">
            <div className="report__date-box">
              <div className="report__date">
                <span>From</span>
                <input type="date" onChange={e => setFrom(e.target.value)} />
              </div>
              <div className="report__date">
                <span>To</span>
                <input type="date" onChange={e => setTo(e.target.value)} />
              </div>
            </div>
            <div className="report__message">
              <span>Report</span>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
                placeholder="Message"
                onChange={e => setMessage(e.target.value)}
                value={message}
              />
            </div>
            <div className="report__btns">
              <button onClick={handleGenerateReport}>Generate</button>
              <button onClick={handleClose}>Go Back</button>
            </div>
          </div>
        </Box>
      </Modal>
    </AdminLayout>
  );
};

export default SystemReportPage;
