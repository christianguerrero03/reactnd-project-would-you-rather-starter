import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  withRouter,
} from 'react-router-dom';
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
  console.log('props: ', props);
  // let id = null;
  // if (props.match) {
  //   id = props.match.params.id;
  // }
  return {
    // id,
    // replies: !questions[id]
    //   ? []
    //   : questions[id].replies.sort(
    //       (a, b) => questions[b].timestamp - questions[a].timestamp
    //     ),
  };
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));
