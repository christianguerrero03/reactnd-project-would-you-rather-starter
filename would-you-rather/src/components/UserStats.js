import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class UserStats extends Component {
  render() {
    const { user } = this.props;

    const { answers, avatarURL, name, questions } = user;
    const numAsked = questions.length;
    const numAnswered = Object.keys(answers).length;

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
          </div>
          <div className="col">
            <span>{name}</span>
          </div>
          <div className="col">
            <span>{numAsked}</span>
          </div>
          <div className="col">
            <span>{numAnswered}</span>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }, { id }) {
  const user = users[id];
  return {
    authedUser,
    user,
  };
}

export default withRouter(connect(mapStateToProps)(UserStats));
