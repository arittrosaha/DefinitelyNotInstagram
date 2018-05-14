import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, Route, Switch } from 'react-router-dom';

import EditProfile from './edit_profile';
import EditPassword from './edit_password';


class UserEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <main className='user-edit'>
        <ul className='user-edit-ul'>
          <li>
            <NavLink className='user-edit-link' exact to={`/users/edit`} activeClassName="user-edit-active">Edit Profile</NavLink>
          </li>

          <li>
            <NavLink className='user-edit-link' to={`/users/edit/password`} activeClassName="user-edit-active">Edit Password</NavLink>
          </li>
        </ul>

        <article className='user-edit-article'>
          <Switch>
            <Route path="/users/edit/password" component={EditPassword}></Route>
            <Route component={EditProfile}></Route>
          </Switch>
        </article>
      </main>
    );
  }
}


const mapStateToProps = ({ui, session}) => {
  return ({
    userEdit: ui.userEdit,
    sessionId: session.id
  });
};

export default connect(mapStateToProps)(UserEdit);
