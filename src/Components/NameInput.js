import React, { Component } from 'react';
import './NameInput.css';

class NameInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: ""
    }
  }

  /* Validation for users typing in names */
  handleUpdate = (e) => {
    let val = e.target.value;

    /* Github regex found from: https://github.com/shinnn/github-username-regex
       Regex was also validated by github username requirements page */
    let githubUsernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

    /* Github has a maxLength of usersnames for 39 chars */
    if(val.length <= 38) {
      this.setState({name: val}, function() {
        console.log(this.state);
      });
    }
  };

  handleSubmit = (e) => {

  };

  render() {
    
    return (
      <form id="nameInputForm" >
        <div id="nameInputElement">
          <input id="nameInput" placeholder="Enter A Git Username" onChange={this.handleUpdate.bind(this)} type="text" value={this.state.name}/>
          <span id="submitButton" onClick={this.handleSubmit.bind(this)}>
            <i className="fa fa-arrow-circle-o-right"></i>
          </span>
        </div>
          
      </form>
    );
  }
}

NameInput.propTypes = {
  name: React.PropTypes.string
}

export default NameInput;
