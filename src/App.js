import React, { Component } from 'react';
import NameInput from './Components/NameInput';
import UserInfo from './Components/UserInfo';
import RepoList from './Components/RepoList';
import $ from 'jquery';

class App extends Component {

  constructor() {
    super();
    this.state = {
      gitUser: {},
      searchMessage: "Search For A Git User Above"
    }


  }

  componentWillMount() {
    this.setState({gitUser: {}});
  }

  // When one of our children sets the gitUser, set it here
  handleSetUser = (response) => {

    console.log(response);
    
    // If everything was okay
    if(response.status == 200) {
      this.setState({gitUser: response.data, searchMessage: ""}, function() {});

    } else if(response.status == 404) {
      // If we can't find that user...
      this.setState({gitUser: {}, searchMessage: "User Not Found!"}, function() {});
      
    } else {
      // Othwerise, we have a big problem
      this.setState({gitUser: {}, searchMessage: "Something Went Wrong, Try Again Later!"}, function() {});
    }
  }



  render() {

    return (
      <div className="App">

        <NameInput setUser={this.handleSetUser.bind(this)}>
        </NameInput>

        {/* User Info */}
        <UserInfo gitUser={this.state.gitUser}>
        </UserInfo>

        {/* Repo Info */}
        <RepoList gitUser={this.state.gitUser}>
        </RepoList>

        <div id="searchMessage">
          {this.state.searchMessage}
        </div>
        


      </div>
    );
  }
}

export default App;