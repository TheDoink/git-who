import React, { Component } from 'react';
import './NameInput.css';
import $ from 'jquery';

class NameInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: ""
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


          // Set a cookie for later remembering
          document.cookie = `gitUser=${name}`;

          // This sets the user and propogates it up
          this.props.setUser({status: obj.status, data: success});
          this.setState({name: ""}, function() {});
        })

        // If we get anything else...
        .fail((failure, text, error) => {
          this.props.setUser({status: failure.status, data:{}});
        });
      
    }
  };

  componentWillMount() {
    // Find our user cookie
    let cookieParts = document.cookie.split(";");
    let tmp = cookieParts.find( (obj) => {
      obj = obj.trim();
      console.log(obj);
      let listParts = obj.split("=");

      return listParts[0] == "gitUser";
    });

    let tmpUser = "";
    if(tmp) {
      tmpUser = tmp.split("=")[1];

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

NameInput.propTypes = {
  name: React.PropTypes.string
}

export default NameInput;
