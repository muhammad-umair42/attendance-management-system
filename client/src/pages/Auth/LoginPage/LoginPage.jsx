import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import loginImage from '../../../../assets/LoginImage.png';
import './LoginPage.css';

const LoginPage = () => {
  //Form Info And Errors States
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({
    username: { message: 'Username is required.', status: false },
    password: { message: 'password is required', status: false },
  });

  //Handle Form Submit
  const handleSubmit = e => {
    e.preventDefault();
    //Validating and setting errors
    if (loginInfo.username == '') {
      setErrors(prevErrors => ({
        ...prevErrors,
        username: {
          ...prevErrors.username,
          status: true,
        },
      }));
    }
    if (loginInfo.password == '') {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: {
          ...prevErrors.password,
          status: true,
        },
      }));
    }

    return null;
  };
  return (
    <section className="login">
      <div className="login__coverImage">
        <h1>Web Attendance Management System</h1>
        <img src={loginImage} alt="" />
      </div>

      <div className="login__form --font-btn">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="form__input-container">
            <div className="form__input">
              <input
                type="text"
                placeholder="Enter Username"
                value={loginInfo.username}
                onChange={e =>
                  setLoginInfo({ ...loginInfo, username: e.target.value })
                }
              />
              <PersonIcon
                className="input-container__icon"
                fontSize="inherit"
              />
            </div>
            {errors?.username.status && (
              <div className="--auth-error">{errors?.username.message}</div>
            )}
          </div>

          <div className="form__input-container">
            <div className="form__input">
              <input
                type="password"
                placeholder="Enter Password"
                value={loginInfo.password}
                onChange={e =>
                  setLoginInfo({ ...loginInfo, password: e.target.value })
                }
              />
              <LockIcon className="input-container__icon" />
            </div>
            {errors?.password.status && (
              <div className="--auth-error">{errors?.password.message}</div>
            )}
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
