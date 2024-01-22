import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import './App.css';
import LoginPage from './pages/Auth/LoginPage/LoginPage';
import RecoverAccountPage from './pages/Auth/RecoverAccountPage/RecoverAccountPage';
import RegisterPage from './pages/Auth/RegisterPage/RegisterPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const App = () => {
  const isLoggedIn = false;

  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <></>
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
