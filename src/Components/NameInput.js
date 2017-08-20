import React, { Component } from 'react';
import './NameInput.css';
import $ from 'jquery';

class NameInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      hasSet: false
    }
  }

  /* Validation for users typing in names */
  handleUpdate = (e) => {
    e.preventDefault();

    let val = e.target.value;

    /* Github has a maxLength of usernames for 38 chars */
    if(val.length <= 38) {
      this.setState({name: val}, function() {});
    }
  };

  handleSubmit = (e) => {

    // Prevent the usual behavior
    if(e) {
      e.preventDefault();
    }
    
    let name = this.state.name;

    /* Github regex found from: https://github.com/shinnn/github-username-regex
       Regex was also validated by github username requirements page */
    let githubUsernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

    // If we pass the regex...
    if(githubUsernameRegex.test(name)) {

      // Try and get that username...
      $.get(`https://api.github.com/users/${name}`,

        // If we get a good response...
        (success, text, obj) => {


          // Set a storage object for later remembering
          sessionStorage.setItem('gitUser', name);

          // This sets the user and propogates it up
          this.props.setUser({status: obj.status, data: success});

          if(this.state.hasSet && window.location.pathName != "") {
            window.location = "/";  
          }

          this.setState({name: "", hasSet: true}, function() {
          });
          
          
        })

        // If we get anything else...
        .fail((failure, text, error) => {
          this.props.setUser({status: failure.status, data:{}});
        });
      
    }
  };

  componentWillMount() {
    let tmpUser = sessionStorage.getItem('gitUser');
    if(tmpUser) {
      this.setState({name: tmpUser}, function() {this.handleSubmit();});
    }

  }

  render() {
    
    return (
      <form id="nameInputForm" onSubmit={this.handleSubmit.bind(this)}>
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

export default NameInput;
