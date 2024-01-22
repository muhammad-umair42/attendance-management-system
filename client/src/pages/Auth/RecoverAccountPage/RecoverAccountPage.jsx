/* eslint-disable no-unused-vars */
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import RecoverAccountImage from '../../../../assets/forgetpassword.png';
import { makeApiRequest } from './../../../api/axios';
import './RecoverAccountPage.css';
const RecoverAccountPage = () => {
  //recover info and errors state
  const [errors, setErrors] = useState({
    key: false,
    username: false,
    password: false,
    cpassword: false,
    samePassword: false,
  });
  const [recoverInfo, setRecoverInfo] = useState({
    key: '',
    username: '',
    password: '',
  });
  const [cpassword, setCpassword] = useState('');

  //other variables
  const navigate = useNavigate();

  //handle recover submit
  const handleRecoverSubmit = async e => {
    e.preventDefault();

    //check if all fields are filled
    if (
      recoverInfo.key === '' ||
      recoverInfo.username === '' ||
      recoverInfo.password === '' ||
      cpassword === '' ||
      recoverInfo.password !== cpassword
    ) {
      setErrors(prevErrors => ({
        ...prevErrors,
        key: recoverInfo.key === '',
        username: recoverInfo.username === '',
        password: recoverInfo.password === '',
        cpassword: cpassword === '',
        samePassword: recoverInfo.password !== cpassword,
      }));
      return;
    }

    //send recover request
    const reqParams = {
      method: 'post',
      reqType: 'recoveraccount',
      url: '/auth/recoveraccount',
      reqData: recoverInfo,
    };

    const { success, resData } = await toast.promise(
      makeApiRequest(reqParams),
      { pending: 'Loading' },
    );

    if (success) {
      toast.success('Account Recoverd');
      return navigate('/login');
    } else {
      return;
    }
  };
  return (
    <section className="recovery">
      <div className="recovery__coverImg">
        <h1>Recover Account Access </h1>
        <img src={RecoverAccountImage} alt="" />
      </div>

      <div className="recovery__form">
        <h2>Regain Access</h2>

        <form onSubmit={handleRecoverSubmit}>
          <div className="form__input-container">
            <div className="form__input">
              <input
                type="text"
                placeholder="Enter Recovery Key"
                value={recoverInfo.key}
                onChange={e =>
                  setRecoverInfo({ ...recoverInfo, key: e.target.value })
                }
                autoComplete="key"
              />
              <LockIcon className="input-container__icon" />
            </div>
            {errors?.key && (
              <div className="--auth-error">Recovery Key is required</div>
            )}
          </div>

          <div className="form__input-container">
            <div className="form__input">
              <input
                type="text"
                placeholder="Enter Username"
                value={recoverInfo.username}
                onChange={e =>
                  setRecoverInfo({ ...recoverInfo, username: e.target.value })
                }
                autoComplete="username"
              />
              <LockIcon className="input-container__icon" />
            </div>
            {errors?.username && (
              <div className="--auth-error">Username is required</div>
            )}
          </div>

          <div className="form__input-container">
            <div className="form__input">
              <input
                type="password"
                placeholder="Enter New Password"
                value={recoverInfo.password}
                onChange={e =>
                  setRecoverInfo({ ...recoverInfo, password: e.target.value })
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
                placeholder="Confirm New Password"
                value={recoverInfo.cpassword}
                onChange={e => setCpassword(e.target.value)}
                autoComplete="password"
              />
              <LockIcon className="input-container__icon" />
            </div>
            {errors?.cpassword && (
              <div className="--auth-error">ConfirmPassword is required</div>
            )}
            {errors?.samePassword && (
              <div className="--auth-error">Passwords do not match</div>
            )}
          </div>

          <button className="--auth-btn" type="submit">
            Recover
          </button>
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
