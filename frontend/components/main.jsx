import React from 'react';
import { Route } from 'react-router-dom';

import NavBar from './navbar';
import User from './user';


export default () => {
  return (
    <div className="main">
      <NavBar />
      <Route exact path='/users/:userId' component={User} />
    </div>
  );
};
