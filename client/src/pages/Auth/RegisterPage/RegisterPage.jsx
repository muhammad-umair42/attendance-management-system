/* eslint-disable no-unused-vars */
import BadgeIcon from '@mui/icons-material/Badge';
import KeyIcon from '@mui/icons-material/Key';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import RegisterImg from '../../../../assets/Register Image.png';
import makeApiRequest from '../../../api/axios';
import './Register.css';
const RegisterPage = () => {
  //states for errors and info
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

  //other variables and states
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //Handle Form Submit
  const handleRegisterSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    //Validating
    if (
      registerInfo.fullName === '' ||
      registerInfo.username === '' ||
      registerInfo.key === '' ||
      registerInfo.password === '' ||
      cpassword === '' ||
      registerInfo.password !== cpassword
    ) {
      setErrors(prevErrors => ({
        ...prevErrors,
        fullName: registerInfo.fullName === '',
        username: registerInfo.username === '',
        key: registerInfo.key === '',
        password: registerInfo.password === '',
        cpassword: cpassword === '',
        samepassword: registerInfo.password !== cpassword || cpassword === '',
      }));
      return;
    }

    //Making request
    const reqParams = {
      method: 'post',
      reqType: 'register',
      url: '/auth/register',
      reqData: registerInfo,
    };

    const { success, reqData } = await toast.promise(
      makeApiRequest(reqParams),
      {
        pending: 'Loading',
      },
    );

    if (success) {
      setIsLoading(false);
      toast.success('Registered Successfully');
      return navigate('/login');
    } else {
      setIsLoading(false);
      return;
    }
  };
  return (
    <section className="register">
      <div className="register__form">
        <h2>Register</h2>

        {/*-------------------- Form---------------- */}
        <form onSubmit={handleRegisterSubmit}>
          <div className="form__input-container">
            <div className="form__input">
              {/* Inputs */}
              <input
                type="text"
                placeholder="Enter Full Name"
                value={registerInfo.fullName}
                onChange={e =>
                  setRegisterInfo({ ...registerInfo, fullName: e.target.value })
                }
                autoComplete="fullName"
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
                autoComplete="username"
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
                autoComplete="key"
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
                autoComplete="password"
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
                autoComplete="confirmpassword"
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
          {/*------------ Submit Btn --------------*/}
          <button className="--auth-btn" type="submit">
            Register Now
          </button>
        </form>
        {/* -----------------Other Links-------------- */}
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
