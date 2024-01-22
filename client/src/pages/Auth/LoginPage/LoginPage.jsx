import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import loginImage from '../../../../assets/LoginImage.png';
import './LoginPage.css';
const LoginPage = () => {
  return (
    <section className="login">
      <div className="login__coverImage">
        <h1>Web Attendance Management System</h1>
        <img src={loginImage} alt="" />
      </div>

      <div className="login__form --font-btn">
        <h2>Login</h2>

        <form action="">
          <div className="form__input-container">
            <input type="text" placeholder="Enter Username" />
            <PersonIcon className="input-container__icon" fontSize="inherit" />
          </div>

          <div className="form__input-container">
            <input type="password" placeholder="Enter Password" />
            <LockIcon className="input-container__icon" />
          </div>

          <button type="submit" className="--auth-btn">
            Sign in
          </button>
        </form>

        <div className="login__otherlinks">
          <Link to={'/register'} className="--auth-link">
            SignUp?
          </Link>

          <Link to={'/recoveraccount'} className="--auth-link">
            Forgot Password
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
