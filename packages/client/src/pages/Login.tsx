import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthState } from '../atom/auth';
import LoginComponent from '../components/Login';

function Login() {
  const [authentication] = useAuthState();
  const history = useHistory();

  useEffect(() => {
    if (authentication.authenticated) history.push('/');
  }, [authentication, history]);

  return (
    <div>
      <LoginComponent />
    </div>
  );
}

export default Login;
