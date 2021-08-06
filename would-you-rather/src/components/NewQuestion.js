import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom';

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false,
  };

  handleChangeOne = (e) => {
    const optionOne = e.target.value;

    this.setState(() => ({
      optionOne,
    }));
  };

  handleChangeTwo = (e) => {
    const optionTwo = e.target.value;

    this.setState(() => ({
      optionTwo,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOne, optionTwo } = this.state;
    const { dispatch } = this.props;

    console.log('New Question: ', optionOne, ' or ', optionTwo);

    dispatch(handleQuestion(optionOne, optionTwo));

    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      toHome: true,
    }));
  };

  render() {
    const { optionOne, optionTwo, toHome } = this.state;

    if (toHome) {
      return <Redirect to="/" />;
    }

    const charsLeftOne = 280 - optionOne.length;
    const charsLeftTwo = 280 - optionTwo.length;

    return (
      <div>
        <h3 className="center">Compose New Question</h3>
        <form className="new-question" onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Option One"
            value={optionOne}
            onChange={this.handleChangeOne}
            className="textarea"
            maxLength={280}
          ></textarea>
          {charsLeftOne <= 100 && (
            <div className="question-length">{charsLeftOne}</div>
          )}
          <textarea
            placeholder="Option Two"
            value={optionTwo}
            onChange={this.handleChangeTwo}
            className="textarea"
            maxLength={280}
          ></textarea>
          {charsLeftTwo <= 100 && (
            <div className="question-length">{charsLeftTwo}</div>
          )}
          <button
            className="btn"
            type="submit"
            disabled={optionOne === '' || optionTwo === ''}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ questions }) {
  return {
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(NewQuestion);
