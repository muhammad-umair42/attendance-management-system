import { useSelector } from 'react-redux';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import './App.css';
import AdminHomePage from './pages/Admin/AdminHomePage/AdminHomePage';
import AttendancePage from './pages/Admin/AttendancesPage/AttendancePage';
import SingleUserAttendancePage from './pages/Admin/AttendancesPage/UserAttendancePage/SingleUserAttendancePage';
import GradePage from './pages/Admin/GradesPage/GradePage';
import LeavesPage from './pages/Admin/LeavesPage/LeavesPage';
import SystemReportPage from './pages/Admin/SystemReportPage/SystemReportPage';
import LoginPage from './pages/Auth/LoginPage/LoginPage';
import RecoverAccountPage from './pages/Auth/RecoverAccountPage/RecoverAccountPage';
import RegisterPage from './pages/Auth/RegisterPage/RegisterPage';
import UserHomePage from './pages/User/UserHomePage/UserHomePage';
import UserAttendancePage from './pages/User/userAttendancePage/UserAttendancePage';

const App = () => {
  const user = useSelector(state => state?.user);
  return (
    <Router>
      <Routes>
        {user ? (
          <>
            {user.isAdmin ? (
              <>
                <Route path="/" element={<AdminHomePage />} />
                <Route path="/attendances" element={<AttendancePage />} />
                <Route path="/leaves" element={<LeavesPage />} />
                <Route path="/systemreport" element={<SystemReportPage />} />
                <Route path="/grades" element={<GradePage />} />
                <Route
                  path="attendance/:id"
                  element={<SingleUserAttendancePage />}
                />

                <Route path="*" element={<Navigate to={'/'} />} />
              </>
            ) : (
              <>
                <Route path="/" element={<UserHomePage />} />
                <Route
                  path="/user-attendance"
                  element={<UserAttendancePage />}
                />
                <Route path="*" element={<Navigate to={'/'} />} />
              </>
            )}
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/recoveraccount" element={<RecoverAccountPage />} />
            <Route path="*" element={<Navigate to={'/login'} />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
