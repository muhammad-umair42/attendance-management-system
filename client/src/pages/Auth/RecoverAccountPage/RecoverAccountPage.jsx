import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';
import RecoverAccountImage from '../../../../assets/forgetpassword.png';
import './RecoverAccountPage.css';
const RecoverAccountPage = () => {
  return (
    <section className="recovery">
      <div className="recovery__coverImg">
        <h1>Recover Account Access </h1>
        <img src={RecoverAccountImage} alt="" />
      </div>

      <div className="recovery__form">
        <h2>Regain Access</h2>

        <form action="">
          <div className="form__input-container">
            <input type="password" placeholder="Enter Recovery Key" />
            <LockIcon className="input-container__icon" />
          </div>

          <div className="form__input-container">
            <input type="password" placeholder="Enter Username" />
            <LockIcon className="input-container__icon" />
          </div>

          <div className="form__input-container">
            <input type="password" placeholder="Enter New Password" />
            <LockIcon className="input-container__icon" />
          </div>

          <div className="form__input-container">
            <input type="password" placeholder="Confirm New Password" />
            <LockIcon className="input-container__icon" />
          </div>

          <button className="--auth-btn">Recover</button>
        </form>

        <div className="recovery__other-links">
          <Link to={'/register'} className="--auth-link">
            Register
          </Link>

          <Link to={'/login'} className="--auth-link">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecoverAccountPage;
