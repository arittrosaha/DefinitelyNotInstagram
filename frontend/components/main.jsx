import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';

import NavBar from './navbar';
import User from './user';
import UserEdit from './user_edit';
import Feed from './feed';
import PostImage from './post_image';



const Main = () => {
  return (
    <div className="main">
      <NavBar />
      <Switch>
        <Route path='/users/edit' component={UserEdit} />
        <Route path="/users/edit/posts/new" component={PostImage}></Route>
        <Route exact path='/users/:userId' component={User} />
        <Route component={Feed} />
      </Switch>
    </div>
  );
};

export default withRouter(Main);
