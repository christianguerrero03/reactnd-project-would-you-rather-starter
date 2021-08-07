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

class Question extends Component {
  handleVote = (answer, active, e) => {
    e.preventDefault();
    const { dispatch, question } = this.props;
    if (!active) {
      dispatch(
        handleQuestionAnswer({
          qid: question.id,
          answer: answer,
        })
      );
      dispatch(
        handleUserVote({
          qid: question.id,
          answer: answer,
        })
      );
    }
  };

  render() {
    const { authedUser, question, users, disableVote } = this.props;

    if (question === null) {
      return <p>This Question Doesn't exist</p>;
    }

    const { author, timestamp, optionOne, optionTwo, id } = question;
    const { name, avatarURL } = users[author];

    let { activeOne, activeTwo } = false;
    if (question.optionOne.votes.includes(authedUser)) {
      activeOne = true;
    } else if (question.optionTwo.votes.includes(authedUser)) {
      activeTwo = true;
    }
    const active = activeOne || activeTwo;

    const optionOneVotes = optionOne.votes.length;
    const optionTwoVotes = optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;

    return (
      <Link
        to={{ pathname: `/question/${id}`, state: { id } }}
        className="question center"
      >
        <div className="container">
          <div className="row">
            <div className="col">
              <img
                src={avatarURL}
                alt={`Avatar of ${name}`}
                className="avatar"
              />
            </div>
            <div className="col">
              <span>{name}</span>
              <div>{formatDate(timestamp)}</div>
            </div>
          </div>
          <div className="row">
            <div className="question-info">
              <div className="center">
                <button
                  className={`btn ${activeOne ? 'active' : ''}`}
                  onClick={(e) => this.handleVote('optionOne', active, e)}
                  disabled={disableVote || active}
                >
                  {optionOne.text}
                </button>
                {active && (
                  <p>
                    {optionOneVotes}/{totalVotes}
                  </p>
                )}
                <h3>OR</h3>
                <button
                  className={`btn ${activeTwo ? 'active' : ''}`}
                  onClick={(e) => this.handleVote('optionTwo', active, e)}
                  disabled={disableVote || active}
                >
                  {optionTwo.text}
                </button>
                {active && (
                  <p>
                    {optionTwoVotes}/{totalVotes}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, { id }) {
  const question = questions[id];
  return {
    authedUser,
    question: question,
    users,
  };
}

export default withRouter(connect(mapStateToProps)(Question));
