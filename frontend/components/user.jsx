import React from 'react';
import { connect } from 'react-redux';

const User = (props) => {
  return (
    <div>
      <img src={props.user.avatar_url} />
    </div>
  );
};

const mapStateToProps = (state, ownParams) => {
  return ({
    user: state.entities.users[ownParams.match.params.userId]
  });
};

export default connect(mapStateToProps)(User);
