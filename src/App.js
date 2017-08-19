import React, { Component } from 'react';
import NameInput from './Components/NameInput'


class App extends Component {

  constructor() {
    super();
    this.state = {
      gitUser: {}
    }
  }

  // When one of our children sets the gitUser, set it here
  handleAddUser = (user) => {
    console.log("ADDING USER");

    console.log(user);
    this.setState({gitUser: user}, function() {

    });
  }

  getUserIconStyle = () => {

    // Define a box where the image will go 
    let ret = {
      'width':'32vw',
      'height':'32vw',
      'backgroundPosition':'center',
      'backgroundSize':'contain',
      'backgroundRepeat': 'no-repeat',
      'display':'inline-block',
      'position':'relative',
      // '-moz-border-radius': '15vw',
      // '-webkit-border-radius': '15vw',
      // 'border-radius': '30vw'
    };

    // If we have a user...
    if(this.state.gitUser.avatar_url) {
      
      // Display that user's image
      ret['backgroundImage'] = `url('${this.state.gitUser.avatar_url}')`;
    } else {

      // Otherwise hide it
      ret.display = "none";
    }

    return ret;
  }

  render() {
    let showUserIcon = this.state.gitUser.name ? "none": "visible";
    return (
      <div className="App">
        <div id="iconRow">
          <div id="userIcon" style={this.getUserIconStyle()}></div>
          <div className="personIcon" style={{display: showUserIcon}}>
            <i className="fa fa-user"></i>
          </div>
        </div>
        
        <NameInput setUser={this.handleAddUser.bind(this)}>

        <h2>{this.state.gitUser.login}</h2>
          
        </NameInput>


      </div>
    );
  }
}

export default App;