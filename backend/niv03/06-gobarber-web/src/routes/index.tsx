import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Sigin from '../pages/SigIn';
import SigUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Profile from '../pages/Profile';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Sigin} />
    <Route path="/sigin" exact component={Sigin} />
    <Route path="/signup" exact component={SigUp} />
    <Route path="/forgot-password" exact component={ForgotPassword} />
    <Route path="/reset-password" exact component={ResetPassword} />
    <Route path="/dashboard" exact component={Dashboard} isPrivate />
    <Route path="/profile" exact component={Profile} isPrivate />
  </Switch>
);

export default Routes;
