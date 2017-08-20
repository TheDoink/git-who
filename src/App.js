import React, { Component } from 'react';
import NameInput from './Components/NameInput';
import UserInfo from './Components/UserInfo';
import RepoList from './Components/RepoList';
import CommitList from './Components/CommitList';
// import CommitItem from './Components/CommitItem';



import $ from 'jquery';

class App extends Component {

  constructor() {
    super();
    this.state = {
      gitUser: {},
      mode: "user",
      repoName: "",
      searchMessage: "Search For A Git User Above"
    }
  }

  componentWillMount() {
    // Determine which "mode" we should jump into
    let pathParts = window.location.pathname.split("/");
    

    // If we're just at a normal location...
    if(pathParts[1] == "") {
      // continue as normal
      this.setState({gitUser: {}});

    } else if(pathParts[1] == "gist") {

      // if we have a gist, start that process
      // TODO: Add gist stuff
    } else {
      // if we have 'something else' (probably a repo)...

        this.setState({mode: "commit", repoName: pathParts[1]}, function() {});
    }
  }

  // When one of our children sets the gitUser, set it here
  handleSetUser = (response) => {
    
    // If everything was okay
    if(response.status == 200) {
      this.setState({gitUser: response.data, searchMessage: ""}, function() {
        if(window.location.pathname != "/") {
          // window.location="/";
        }
        
      });

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

        {/*Only show this stuff when we're looking at "user" info*/}
        <div className={this.state.mode == "user" ? '' : 'hidden'}>
          {/* User Info */}
          <UserInfo gitUser={this.state.gitUser}>
          </UserInfo>

          {/* Repo Info */}
          <RepoList gitUser={this.state.gitUser} className={typeof this.state.gitUser.login == undefined ? 'hidden' : ''}>
          </RepoList>

          <div id="searchMessage">
            {this.state.searchMessage}
          </div>
        </div>
        
        {/*Only show this stuff when we're looking at "commit" info*/}
        <div className={this.state.mode == "commit" ? '' : 'hidden'}>
          <CommitList repoName={this.state.repoName} gitUser={this.state.gitUser}>
          </CommitList>
        </div>

      </div>
    );
  }
}

export default App;