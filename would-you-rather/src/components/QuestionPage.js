import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import { withRouter } from 'react-router-dom';

class QuestionPage extends Component {
  render() {
    const { id } = this.props;
    return (
      <div>
        <h1 className="center">Would You Rather?</h1>
        <Question id={id} />
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  console.log('QP props:', props);
  const { id } = props.match.params;
  return {
    id,
  };
}

export default withRouter(connect(mapStateToProps)(QuestionPage));
