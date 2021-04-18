import React, { useEffect, useMemo } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';
import { useAuthState } from './atom/auth';
import useCheckLogin from './hooks/useCheckLogin';
import LoadingBar from 'react-top-loading-bar';
import useLoadingbar from './hooks/useLoadingbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [authentication] = useAuthState();
  const { checkLogin } = useCheckLogin();
  const { loading } = useLoadingbar();
  const history = useHistory();

  const auth = useMemo(() => authentication.authenticated, [authentication]);

  useEffect(() => {
    checkLogin();
    return () => {
      console.log('clean up');
    };
  }, [checkLogin]);

  useEffect(() => {}, [history]);

  return (
    <BrowserRouter>
      <LoadingBar progress={loading * 100} color="#2998ff" />
      <Switch>
        <ProtectedRoute auth={auth} path="/" exact component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
      <LoadingBar />
    </BrowserRouter>
  );
}

interface IProtectedRouteProps {
  auth: boolean;
  component: React.FC;
}

function ProtectedRoute({
  auth,
  component: Component,
  ...rest
}: IProtectedRouteProps & Record<string, any>) {
  return (
    <Route
      {...rest}
      render={() => (auth ? <Component /> : <Redirect to="/login" />)}
    />
  );
}

export default App;
