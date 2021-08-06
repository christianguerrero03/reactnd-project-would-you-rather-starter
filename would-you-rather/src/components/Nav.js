import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';

class Nav extends Component {
  handleLogout() {}
  render() {
    const { dispatch, name, authedUser } = this.props;

    function handleLogout() {
      dispatch(setAuthedUser(null));
    }

    return (
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" activeClassName="active">
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" activeClassName="active">
              Leaderboard
            </NavLink>
          </li>
        </ul>
        {authedUser && (
          <div className="p-2 mx-4 nav-user">
            <div className="mx-2 mt-1">
              <p>Hello {name}</p>
            </div>
            <div className="mx-2">
              <button className="login-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    name: users[authedUser] ? users[authedUser].name : '',
    authedUser,
  };
}

export default withRouter(connect(mapStateToProps)(Nav));
