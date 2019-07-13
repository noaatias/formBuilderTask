import './Navbar.css';

import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar ">
          <h1>{this.props.title}</h1>
        </nav>
      </div>
    );
  }
}
