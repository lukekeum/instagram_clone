import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import useAuthAtom from './atom/auth';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  const [{ authenticated: auth }] = useAuthAtom();
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute auth={auth} path="/" exact component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

interface IProtectedRouteProps {
  auth: boolean;
  component: React.FC;
  path: string;
  exact: boolean;
}

function ProtectedRoute({
  auth,
  component: Component,
  path,
  exact = false,
}: IProtectedRouteProps) {
  return (
    <Route
      path={path}
      exact={exact}
      render={() => (auth ? <Component /> : <Redirect to="/login" />)}
    />
  );
}

export default App;
