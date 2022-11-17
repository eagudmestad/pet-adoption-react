import { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
// import jwt from 'jsonwebtoken';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function onClickSubmit(evt) {
    evt.preventDefault();
    setError('');
    setSuccess('');

    axios(`${process.env.REACT_APP_API_URL}/api/user/login`, {
      method: 'post',
      data: { email, password },
    })
      .then((res) => {
        console.log(res);
        setSuccess(res.data.message);
        // const authPayload = jwt.decode(res.data.token);
        const auth = {
          email,
          userId: res.data.userId,
          token: res.data.token,
          role:res.data.role,
          // payload: authPayload,
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
        <div className="mb-3">
          <label className="form-label" htmlFor="txtEmail">
            Email
          </label>
          <input
            className="form-control"
            id="txtEmail"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            value={email}
            onChange={(evt) => setEmail(evt.currentTarget.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="txtPassword">
            Password
          </label>
          <input
            className="form-control"
            id="txtPassword"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(evt) => setPassword(evt.currentTarget.value)}
          />
        </div>
        <div className="mb-3">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={(evt) => onClickSubmit(evt)}
          >
            Login
          </button>
        </div>
        {error && <div className="mb-3 text-danger">{error}</div>}
        {success && <div className="mb-3 text-success">{success}</div>}
      </form>
    </div>
  );
}

export default LoginForm;
