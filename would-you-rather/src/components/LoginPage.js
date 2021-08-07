import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { Redirect, useLocation, withRouter } from 'react-router-dom';

class LoginPage extends Component {
  state = {
    selectedUser: '',
  };

  render() {
    const { dispatch, authedUser, users, history, location } = this.props;
    const { selectedUser } = this.state;
    const { state } = location;
    console.log('state: ', location);
    // dispatch(setAuthedUser(selectedUser));

    if (authedUser) {
      return <Redirect to={state ? state.from : '/'} />;
    }

    const handleSelect = (e) => {
      const selectedUser = e.target.value;
      this.setState(() => ({
        selectedUser,
      }));
    };

    const handleLogin = () => {
      dispatch(setAuthedUser(selectedUser));
    };

    return (
      <div className="center">
        <h1 className="center">Log In</h1>
        <br></br>
        <div>
          <select value={selectedUser} onInput={handleSelect}>
            <option disabled={true} value={''}>
              Select User
            </option>
            {Object.keys(users).map((id) => (
              <option key={id} value={id}>
                {users[id].name}
              </option>
            ))}
          </select>
        </div>

        {/* <label>Username</label>
        <input value={username} placeholder="Username"></input>
        <label>Password</label>
        <input value={password} placeholder="Password"></input> */}
        {/* <div class="mb-3">
          <label for="userInput" class="form-label">
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            id="userInput"
            value={username}
            placeholder="Username"
            ref={(username) => (this.username = username)}
          />
        </div>
        <div className="mb-3">
          <label for="passInput" class="form-label">
            Example textarea
          </label>
          <input
            type="email"
            className="form-control"
            id="passInput"
            value={password}
            placeholder="Password"
          />
        </div>*/}
        <div>
          <button
            className="btn"
            disabled={selectedUser === ''}
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export default withRouter(connect(mapStateToProps)(LoginPage));
