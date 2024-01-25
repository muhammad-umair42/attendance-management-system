/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import makeApiRequest from '../../../../api/axios';
import './UserNavbar.css';

const UserNavbar = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state?.user);
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const reqParams = {
      method: 'get',
      url: `/auth/logout/${user._id}`,
      reqType: 'logout',
      dispatch,
    };

    const { success, resData } = await toast.promise(
      makeApiRequest(reqParams),
      {
        pending: 'Logging out',
      },
    );
    if (success) {
      toast.success('successfully logged out');
      return navigate('/login');
    } else {
      return navigate('/login');
    }
  };
  return (
    <section className="user-navbar">
      <h2>Welcome! {user.fullName}</h2>
      <div className="usernav__links">
        {!isHomepage && (
          <Link to={'/'} className="usernav__link">
            Home
          </Link>
        )}
        <div onClick={handleLogout} className="usernav__link">
          Logout
        </div>
      </div>
    </section>
  );
};

export default UserNavbar;
