import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';
import RegisterImg from '../../../../assets/Register Image.png';
import './Register.css';
const RegisterPage = () => {
  return (
    <section className="register">
      <div className="register__form">
        <h2>Register</h2>

        <form action="">
          <div className="form__input-container">
            <input type="text" placeholder="Enter Full Name" />
            <LockIcon className="input-container__icon" />
          </div>

          <div className="form__input-container">
            <input type="text" placeholder="Enter Username" />
            <LockIcon className="input-container__icon" />
          </div>

          <div className="form__input-container">
            <input type="text" placeholder="Enter Recovery Key" />
            <LockIcon className="input-container__icon" />
          </div>

          <div className="form__input-container">
            <input type="password" placeholder="Enter Password" />
            <LockIcon className="input-container__icon" />
          </div>

          <div className="form__input-container">
            <input type="password" placeholder="Confirm Password" />
            <LockIcon className="input-container__icon" />
          </div>

          <button className="--auth-btn">Register Now</button>
        </form>
        <div className="register__other-links">
          <Link to={'/login'} className="--auth-link">
            Login
          </Link>

          <Link to={'/recoveraccount'} className="--auth-link">
            Forget Password?
          </Link>
        </div>
      </div>
      <div className="register__coverImage">
        <h1>Join Our Attendance Management System</h1>
        <img src={RegisterImg} alt="" />
      </div>
    </section>
  );
};

export default RegisterPage;
