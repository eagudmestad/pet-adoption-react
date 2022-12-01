import { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import InputField from './InputField';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router-dom';

function LoginForm({ onLogin, showError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const emailError = !email
    ? 'Email is required.'
    : !email.includes('@')
    ? 'Email must include @ sign.'
    : '';

  const passwordError = !password
    ? 'Password is required.'
    : password.length < 8
    ? 'Password must be at least 8 characters,'
    : '';

  function onClickSubmit(evt) {
    evt.preventDefault();
    setError('');
    setSuccess('');

    if (emailError || passwordError) {
      showError('Please fix errors above.');
      setError('Please fix errors above.');
      return;
    }

    axios(`${process.env.REACT_APP_API_URL}/api/user/login`, {
      method: 'post',
      data: { email:email, password:password },
    })
      .then((res) => {
        console.log(res);
        setSuccess(res.data.message);
        console.log(`Res.data.token : ${res.data.token}`);
        const authPayload = jwt.decode(res.data.token);
        const auth = {
          email,
          userId: res.data.userId,
          token: res.data.token,
          role: res.data.role,
          payload: authPayload,
        };
        console.log(auth);
        onLogin(auth);
      })
      .catch((err) => {
        console.error(err);
        const resError = err?.response?.data?.error;
        //const errDetails = err?.response?.data?.error?.details;
        //console.log(errDetails);
        if (resError) {
          if (typeof resError === 'string') {
            setError(resError);
            showError(resError);
          } else if (resError.details) {
            setError(_.map(resError.details, (x) => <div>{x.message}</div>));
          } else {
            setError(JSON.stringify(resError));
          }
        } else {
        }
        // if (errDetails) {
        //   setError(
        //     _.map(errDetails, (x) => (
        //       <div>{x.message}</div>
        //     ))
        //   );
        // } else{
        setError(err.message);
        showError(err.message);
        // }
      });
    // if(email === 'admin@example.com' && password === 'password'){
    //   setSuccess('Valid Credentials');
    //   const auth = {
    //     email,
    //   };
    //   onLogin(auth);
    // }else {
    //   setError('Invalid Credentials');
    // }
  }

  return (
    <div>
      <h1>Login</h1>
      <form>
        <InputField
          label="Email"
          id="txtEmail"
          type="email"
          autoComplete="email"
          value={email}
          className="form-control"
          onChange={(evt) => setEmail(evt.currentTarget.value)}
          error={emailError}
        />
        <InputField
          label="Password"
          id="txtPassword"
          type="password"
          autoComplete="current-password"
          className="form-control"
          placeholder=""
          value={password}
          onChange={(evt) => setPassword(evt.currentTarget.value)}
          error={passwordError}
        />
        <div className="mb-3 d-flex align-items-center">
          <button
            className="btn btn-primary me-3"
            type="submit"
            onClick={(evt) => onClickSubmit(evt)}
          >
            Login
          </button>
          <div>
            <div>Don't have an account yet?</div>
            <Link to="/register">Register Here</Link>
          </div>
          <div></div>
        </div>
        {error && <div className="mb-3 text-danger">{error}</div>}
        {success && <div className="mb-3 text-success">{success}</div>}
      </form>
    </div>
  );
}

export default LoginForm;
