import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Sigin from '../pages/SigIn';
import SigUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Sigin} />
    <Route path="/signup" exact component={SigUp} />
    <Route path="/dashboard" exact component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
