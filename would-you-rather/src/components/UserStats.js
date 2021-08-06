import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate, formatQuestion } from '../utils/helpers';
import {
  TiArrowBackOutline,
  TiHeartOutline,
  TiHeartFullOutline,
} from 'react-icons/ti';
import { handleQuestionAnswer } from '../actions/questions';
import { Link, withRouter } from 'react-router-dom';
import { handleUserVote } from '../actions/users';

class UserStats extends Component {
  render() {
    const { authedUser, user } = this.props;

    const { answers, avatarURL, id, name, questions } = user;
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
