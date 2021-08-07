import React, { Component } from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends Component {
  render() {
    const { isAuthed, children, ...rest } = this.props;
    console.log('isAuthed', isAuthed);
    console.log('children', children);
    return (
      <Route
        {...rest}
        render={({ location }) => {
          console.log('location: ', location);
          return isAuthed ? (
            children
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: location } }} />
          );
        }}
      />
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  return {};
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));
