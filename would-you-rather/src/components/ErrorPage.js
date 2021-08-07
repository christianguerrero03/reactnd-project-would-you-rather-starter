import React, { Component } from 'react';

class ErrorPage extends Component {
  render() {
    return (
      <div className="center">
        <br></br>
        <h1 className="center">404: Page Not Found</h1>
        <br></br>
        <h3>The page you are attempting to reach does not exist.</h3>
      </div>
    );
  }
}

export default ErrorPage;
