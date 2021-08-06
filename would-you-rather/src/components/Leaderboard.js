import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import { NavLink } from 'react-router-dom';
import UserStats from './UserStats';

class Leaderboard extends Component {
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
    const { userIds } = this.props;

    return (
      <div>
        <h1 className="center">Leaderboard</h1>
        <br></br>
        <ul className="dashboard-list">
          <div className="container">
            <div className="row">
              <div className="col">User</div>
              <div className="col"></div>
              <div className="col">Asked</div>
              <div className="col">Answered</div>
            </div>
          </div>
          <hr></hr>
          {userIds.map((id) => (
            <li key={id}>
              <UserStats id={id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    userIds: Object.keys(users).sort(
      (a, b) =>
        Object.keys(users[b].answers).length +
        users[b].questions.length -
        (Object.keys(users[a].answers).length + users[a].questions.length)
    ),
  };
}

export default connect(mapStateToProps)(Leaderboard);
