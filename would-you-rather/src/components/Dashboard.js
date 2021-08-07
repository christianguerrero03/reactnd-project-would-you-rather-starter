import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class Dashboard extends Component {
  state = {
    activeList: 'unans',
  };

  handleActiveList(activeList, e) {
    console.log('handleacctivelist');
    e.preventDefault();
    this.setState(() => ({
      activeList,
    }));
  }

  render() {
    console.log(this.state);
    console.log(this.props);
    const { activeList } = this.state;
    const { questionIds, user } = this.props;
    // let activeList = 'unans';

    let activeQuestionIds = questionIds.filter((id) => {
      if (user) {
        if (activeList === 'unans') {
          return user.answers[id] ? null : id;
        } else {
          return user.answers[id] ? id : null;
        }
      } else {
        return questionIds;
      }
    });
    console.log(activeQuestionIds);

    return (
      <div>
        <h1 className="center">Would You Rather?</h1>
        <div>
          <ul
            className="center"
            style={{ justifyContent: 'center', display: 'flex' }}
          >
            <li>
              <button
                className={`btn ${activeList === 'unans' ? 'active' : ''}`}
                type="button"
                onClick={(e) => this.handleActiveList('unans', e)}
              >
                Unanswered
              </button>
            </li>
            <li>
              <button
                className={`btn ${activeList === 'ans' ? 'active' : ''}`}
                type="button"
                onClick={(e) => this.handleActiveList('ans', e)}
              >
                Answered
              </button>
            </li>
          </ul>
        </div>
        <ul className="dashboard-list">
          {activeQuestionIds.map((id) => (
            <li key={id}>
              <Question id={id} disableVote={true} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  const user = users[authedUser];
  return {
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
    user,
  };
}

export default connect(mapStateToProps)(Dashboard);
