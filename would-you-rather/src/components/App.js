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
import PrivateRoute from './PrivateRoute';

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
              <div>
                <Route path="/" exact component={Dashboard} />
                <Route path="/login" component={LoginPage} />

                <PrivateRoute path="/question/:id" isAuthed={loggedIn}>
                  <QuestionPage />
                </PrivateRoute>
                <PrivateRoute path="/add" isAuthed={loggedIn}>
                  <NewQuestion />
                </PrivateRoute>
                <PrivateRoute path="/leaderboard" isAuthed={loggedIn}>
                  <Leaderboard />
                </PrivateRoute>
              </div>
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
