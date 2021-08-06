import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class QuestionPage extends Component {
  render() {
    const { id, replies } = this.props;
    return (
      <div>
        <h1 className="center">Would You Rather?</h1>
        <Question id={id} />
        {/* {replies.length !== 0 && <h3 className="center">Replies</h3>}
        <ul>
          {replies.map((replyId) => (
            <li key={replyId}>
              <Question id={replyId} />
            </li>
          ))}
        </ul> */}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  return {
    id,
    // replies: !questions[id]
    //   ? []
    //   : questions[id].replies.sort(
    //       (a, b) => questions[b].timestamp - questions[a].timestamp
    //     ),
  };
}

export default connect(mapStateToProps)(QuestionPage);
