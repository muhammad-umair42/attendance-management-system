import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import makeApiRequest from '../../../../api/axios';
import './AdminNavbar.css';
const AdminNavbar = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state?.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const reqParams = {
      method: 'get',
      url: `/auth/logout/${user._id}`,
      reqType: 'logout',
      dispatch,
    };

    const { success } = await toast.promise(makeApiRequest(reqParams), {
      pending: 'Logging out',
    });
    if (success) {
      toast.success('successfully logged out');
      return navigate('/login');
    } else {
      return navigate('/login');
    }
  };
  return (
    <nav className="admin-navbar">
      <h3>Admin Control Center</h3>
      <div className="admin-links">
        <NavLink
          to={'/'}
          className={({ isActive }) => (isActive ? 'nav-active' : 'admin-link')}
        >
          Users Login
        </NavLink>
        <NavLink
          to={'/attendances'}
          className={({ isActive }) => (isActive ? 'nav-active' : 'admin-link')}
        >
          Attendances
        </NavLink>
        <NavLink
          to={'/leaves'}
          className={({ isActive }) => (isActive ? 'nav-active' : 'admin-link')}
        >
          Leaves
        </NavLink>
        <NavLink
          to={'/systemreport'}
          className={({ isActive }) => (isActive ? 'nav-active' : 'admin-link')}
        >
          SystemReports
        </NavLink>
        <NavLink
          to={'/grades'}
          className={({ isActive }) => (isActive ? 'nav-active' : 'admin-link')}
        >
          Grades
        </NavLink>
      </div>
      <div className="admin-btns">
        <button className="admin-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
