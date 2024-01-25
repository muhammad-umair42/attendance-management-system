/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import makeApiRequest from '../../api/axios';
import './LeaveModel.css';

const LeaveModel = ({ currentLeave = null }) => {
  const [leaveMessage, setLeaveMessage] = useState('');
  const user = useSelector(state => state.user);
  const handleLeaveSubmit = async e => {
    e.preventDefault();

    const reqParams = {
      method: 'post',
      url: `/user/markleave/${user._id}`,
      reqData: { leaveMessage: leaveMessage },
      reqType: '',
    };
    console.log(leaveMessage);
    const { success } = await toast.promise(makeApiRequest(reqParams), {
      pending: 'Marking leave',
    });

    if (success) {
      return location.reload();
    }
  };
  return (
    <div className="user-leave">
      {currentLeave && (
        <>
          <div className="user-leave__header">
            <h4>Leave</h4>
            <div className="leave__header-timestamps">
              <span>Created: {currentLeave.date}</span>
              <span style={{ textTransform: 'capitalize', color: 'green' }}>
                Status: {currentLeave?.status}
              </span>
            </div>
          </div>
          <div className="leave__content">
            <h3>Leave Message</h3>
            <div className="leave__content-text">
              {currentLeave.leaveMessage}
            </div>
          </div>
        </>
      )}
      {!currentLeave && (
        <div className="make-leave">
          <h4 className="make-leave__heading">Send Leave</h4>

          <div className="make-leave__content">
            <h4>Leave Message</h4>
            <div className="make-leave__content">
              <textarea
                cols="30"
                rows="10"
                style={{ cursor: 'auto' }}
                value={leaveMessage}
                onChange={e => setLeaveMessage(e.target.value)}
              />
              <button
                className="make-leave__btn"
                onClick={handleLeaveSubmit}
                disabled={leaveMessage == '' ? true : false}
              >
                Submit Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveModel;
