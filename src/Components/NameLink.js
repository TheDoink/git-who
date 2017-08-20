import React, { Component } from 'react';

class NameLink extends Component {

  constructor(props) {
    super(props);
  }

  handleNameClick() {
    // Set a storage object for later remembering
    sessionStorage.setItem('gitUser', this.props.userName);

    window.location = "/";
  }  

  render() {
    
    return (
      <span>
        <a href="#" onClick={this.handleNameClick.bind(this)}>
          {this.props.userName}
        </a>
      </span>
    );
  }
}

export default NameLink;
