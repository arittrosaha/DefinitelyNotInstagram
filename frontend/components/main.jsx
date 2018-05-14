import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';

import NavBar from './navbar';
import User from './user';
import UserEdit from './user_edit';


const Main = () => {
  return (
    <div className="main">
      <NavBar />
      <Switch>
        <Route path='/users/edit' component={UserEdit} />
        <Route path='/users/:userId' component={User} />
      </Switch>
    </div>
  );
};

export default withRouter(Main);
