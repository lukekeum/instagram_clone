import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useAuthState } from './atom/auth';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [{ authenticated: auth }] = useAuthState();
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute auth={auth} path="/" exact component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
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
