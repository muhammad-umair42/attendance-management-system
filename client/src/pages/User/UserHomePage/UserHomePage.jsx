import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GradeCard from '../../../components/GradeCard/GradeCard';
import LeaveModel from '../../../components/LeaveModel/LeaveModel';
import UserProfileCard from '../../../components/userProfileCard/userProfileCard';
import { deleteUser } from '../../../redux/UserSlice/userSlice';
import Layout from '../Layout';
import { makeApiRequest } from './../../../api/axios';
import './UserHomePage.css';

//Signout out if session expired
const checkLoginSession = async ({ dispatch }) => {
  const cookie = await Cookies.get('loggedIn');
  if (cookie) {
    return true;
  } else {
    await dispatch(deleteUser());
    return false;
  }
};

//Fetch data for homepage
const fetchHomePageData = async (
  userId,
  setTodayAttendance,
  setCurrentLeave,
) => {
  //making request
  const reqParams = {
    method: 'get',
    url: `/user/${userId}/`,
    reqType: 'userHomepage',
  };
  const { success, resData } = await toast.promise(makeApiRequest(reqParams), {
    pending: 'Loading',
  });

  //Setting data to states
  if (success) {
    const { userLeave, userTodayAttendance } = resData;
    setTodayAttendance(userTodayAttendance);
    setCurrentLeave(userLeave);
  }
};

const UserHomePage = () => {
  //states
  const user = useSelector(state => state?.user);
  const dispatch = useDispatch();
  //Api data states
  const [todayAttendance, setTodayAttendance] = useState(false);
  const [currentLeave, setCurrentLeave] = useState();
  const [isLeaveOpen, setisLeaveOpen] = useState(false);
  const navigate = useNavigate();
  //On page load
  useEffect(() => {
    const handleHomePageStartUp = async () => {
      //Check if cookie is available
      const isCookieAvailable = await checkLoginSession({ dispatch });

      //Fetch data for homepage
      if (isCookieAvailable) {
        await fetchHomePageData(user._id, setTodayAttendance, setCurrentLeave);
      }
    };

    handleHomePageStartUp();
  }, []);

  const handleMarkAttendance = async e => {
    e.preventDefault();
    const reqParams = {
      method: 'get',
      url: `/user/markattendance/${user._id}`,
    };

    const { success } = await toast.promise(makeApiRequest(reqParams), {
      pending: 'Marking Attendance',
    });
    if (success) {
      return location.reload();
    }
  };
  return (
    <Layout>
      <section className="user-home">
        <section className="user-profile__section">
          <UserProfileCard />
        </section>

        <section className="user-home__dashboard">
          <GradeCard userId={user?._id} />

          <div className="user-interactions">
            <div className="user-interactions-btns">
              {!currentLeave && (
                <button
                  disabled={todayAttendance ? true : false}
                  onClick={handleMarkAttendance}
                >
                  {todayAttendance ? 'Already Marked' : 'Mark Attendance'}
                </button>
              )}

              {!todayAttendance && (
                <button
                  disabled={currentLeave ? true : false}
                  onClick={() => setisLeaveOpen(!isLeaveOpen)}
                >
                  {currentLeave ? 'Leave Marked' : 'Mark Leave'}
                </button>
              )}

              <button onClick={() => navigate('/user-attendance')}>
                View Attendance
              </button>
            </div>
          </div>

          {(currentLeave !== false || isLeaveOpen) && (
            <LeaveModel currentLeave={currentLeave} />
          )}
        </section>
      </section>
    </Layout>
  );
};

export default UserHomePage;
