import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      userErrors {
        message
      }
      user {
        id
        name
        email
      }
      token
    }
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data.userLogin.userErrors.length > 0) {
        setError(data.userLogin.userErrors[0].message);
      } else if (data.userLogin.user && data.userLogin.token) {
        // Store token and user info
        localStorage.setItem('token', data.userLogin.token);
        localStorage.setItem('user', JSON.stringify(data.userLogin.user));
        navigate('/games');
      }
    },
    onError: (error) => {
      setError('An error occurred during login');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    login({ variables: { email, password } });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to NFL Game Picks</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign up here</a>
        </p>
      </div>
    </div>
  );
}

export default Login; 