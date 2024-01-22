import BadgeIcon from '@mui/icons-material/Badge';
import KeyIcon from '@mui/icons-material/Key';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import RegisterImg from '../../../../assets/Register Image.png';
import './Register.css';
const RegisterPage = () => {
  //register info and errors state
  const [errors, setErrors] = useState({
    fullName: false,
    username: false,
    key: false,
    password: false,
    cpassword: false,
    samepassword: false,
  });

  const [registerInfo, setRegisterInfo] = useState({
    fullName: '',
    username: '',
    key: '',
    password: '',
  });
  const [cpassword, setCpassword] = useState('');

  //Handle Form Submit
  const handleRegisterSubmit = e => {
    e.preventDefault();
    //Validating
    setErrors(prevErrors => ({
      ...prevErrors,
      fullName: registerInfo.fullName === '',
      username: registerInfo.username === '',
      key: registerInfo.key === '',
      password: registerInfo.password === '',
      cpassword: cpassword === '',
      samepassword: registerInfo.password !== cpassword || cpassword === '',
    }));
  };
  return (
    <section className="register">
      <div className="register__form">
        <h2>Register</h2>

        <form onSubmit={handleRegisterSubmit}>
          <div className="form__input-container">
            <div className="form__input">
              <input
                type="text"
                placeholder="Enter Full Name"
                value={registerInfo.fullName}
                onChange={e =>
                  setRegisterInfo({ ...registerInfo, fullName: e.target.value })
                }
              />
              <BadgeIcon className="input-container__icon" />
            </div>
            {errors?.fullName && (
              <div className="--auth-error">Fullname is required</div>
            )}
          </div>

          <div className="form__input-container">
            <div className="form__input">
              <input
                type="text"
                placeholder="Enter Username"
                value={registerInfo.username}
                onChange={e =>
                  setRegisterInfo({ ...registerInfo, username: e.target.value })
                }
              />
              <PersonIcon className="input-container__icon" />
            </div>
            {errors?.username && (
              <div className="--auth-error">Username is required</div>
            )}
          </div>

          <div className="form__input-container">
            <div className="form__input">
              <input
                type="text"
                placeholder="Enter Recovery Key"
                value={registerInfo.key}
                onChange={e =>
                  setRegisterInfo({ ...registerInfo, key: e.target.value })
                }
              />
              <KeyIcon className="input-container__icon" />
            </div>
            {errors?.key && (
              <div className="--auth-error">Recovery key is required</div>
            )}
          </div>

          <div className="form__input-container">
            <div className="form__input">
              <input
                type="password"
                placeholder="Enter Password"
                value={registerInfo.password}
                onChange={e =>
                  setRegisterInfo({ ...registerInfo, password: e.target.value })
                }
              />
              <LockIcon className="input-container__icon" />
            </div>
            {errors?.password && (
              <div className="--auth-error">Password is required</div>
            )}
          </div>

          <div className="form__input-container">
            <div className="form__input">
              <input
                type="password"
                placeholder="Confirm Password"
                value={cpassword}
                onChange={e => setCpassword(e.target.value)}
              />
              <LockIcon className="input-container__icon" />
            </div>
            {errors?.cpassword && (
              <div className="--auth-error">Confirm Password is required</div>
            )}
            {errors?.samepassword && (
              <div className="--auth-error">Password do not matched</div>
            )}
          </div>

          <button className="--auth-btn" type="submit">
            Register Now
          </button>
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
