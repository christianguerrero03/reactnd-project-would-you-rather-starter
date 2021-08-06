import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitalData } from '../actions/shared';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading';
import NewQuestion from './NewQuestion';
import QuestionPage from './QuestionPage';
import Nav from './Nav';
import LoginPage from './LoginPage';
import Leaderboard from './Leaderboard';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitalData());
  }
  render() {
    const { loggedIn } = this.props;
    return (
      <div>
        <Router>
          <Fragment>
            <LoadingBar />
            <div className="container">
              <Nav />
              {!loggedIn ? (
                <LoginPage />
              ) : (
                <div>
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/questions/:id" component={QuestionPage} />
                  <Route path="/add" component={NewQuestion} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route path="/login" component={LoginPage} />
                </div>
              )}
            </div>
          </Fragment>
        </Router>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  console.log('authedUser: ', authedUser);
  return {
    loggedIn: authedUser && authedUser !== '',
  };
}

export default connect(mapStateToProps)(App);
