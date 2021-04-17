import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthState } from '../atom/auth';
import RegisterComponent from '../components/Register';

function Register() {
  const [authentication] = useAuthState();
  const history = useHistory();

  useEffect(() => {
    if (authentication.authenticated) history.push('/');
  }, [authentication, history]);

  return (
    <div>
      <RegisterComponent />
    </div>
  );
}

export default Register;
