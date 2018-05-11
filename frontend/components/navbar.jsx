import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class NavBar extends React.Component {

  render () {
    const search = <i class="fas fa-search"></i>;
    return (
      <div className="nav-bar">
        <div className="nav-left">
          <Link to="/">
            <i className="fab fa-instagram fa-2x"></i>
          </Link>
          <div className="nav-pipe"></div>
          <Link to="/">
            <div className="nav-title">Definitely Not Instagram</div>
          </Link>
        </div>

        <input type="search" className="nav-search" placeholder="&#xf002; Search" />

        <div className="nav-right">
          <i className="far fa-compass fa-lg"></i>
          <i className="far fa-heart fa-lg"></i>
          <Link to={`/users/${this.props.sessionId}`}>
            <i className="far fa-user fa-lg"></i>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({session}) => {
  return({
    sessionId: session.id
  });
};

export default connect(mapStateToProps)(NavBar);
