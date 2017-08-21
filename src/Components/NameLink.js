import React, { Component } from 'react';

class NameLink extends Component {

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
