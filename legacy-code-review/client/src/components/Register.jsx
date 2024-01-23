import React, { useState } from 'react';
import auth from '../utils/auth';
import apiService from '../ApiService';
import { useNavigate } from 'react-router-dom';

const initialState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};

const Register = (props) => {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // send a request to the API service /register
    const { email, password, firstName, lastName } = state;
    const user = { email, password, firstName, lastName };
    const res = await apiService.register(user);
    if (res.error) {
      alert(`${res.message}`);
      setState(initialState);
    } else {
      // This sets isAuthenticated = true and redirects to profile
      props.setIsAuthenticated(true);
      auth.login(() => navigate('/'));
    }
  };

  const validateForm = () => {
    return (
      !state.email || !state.password || !state.firstName || !state.lastName
    );
  };

  return (
    <section>
      <h2>Register</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name@mail.com"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="supersecretthingy"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Name"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Nameson"
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
        />
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Register&nbsp;
        </button>
      </form>
    </section>
  );
};

export default Register;
