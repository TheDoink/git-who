import React, { Component } from 'react';
import NameInput from './Components/NameInput';
import UserInfo from './Components/UserInfo';
import RepoList from './Components/RepoList';
import CommitList from './Components/CommitList';
import './index.css';

import $ from 'jquery';

class App extends Component {

  constructor() {
    super();
    this.state = {
      gitUser: {},
      mode: "user",
      repoName: "",
      repoOrGist: "repo",
      searchMessage: "Search For A Git User Above"
    }
  }

  componentWillMount() {
    // Determine which "mode" we should jump into
    let pathParts = window.location.pathname.split("/");
    

    // If we're just at a normal location...
    if(pathParts[1] == "") {
      console.log("user mode");
      this.setState({gitUser: {}});

    } else if(pathParts[1] == "gist") {
      console.log("repo mode");
      // if we have a gist, start that process
      // TODO: Add gist stuff
    } else {
      // if we have 'something else' (probably a repo)...
      console.log("repo mode");
      this.setState({mode: "commit", repoName: pathParts[1]}, function() {});
    }
  }

  // When one of our children sets the gitUser, set it here
  handleSetUser = (response) => {
    
    // If everything was okay
    if(response.status == 200) {
      this.setState({gitUser: response.data, searchMessage: ""}, function() {
        console.log(this.state);
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

          {/*The buttons that determine whether we are looking at repos or gists*/}
          <div id="modeButtons">
            <div id="repoMode" className={`modeButton ${this.state.repoOrGist === "repo" ? 'selected' : ''}`}>
              <div className="buttonText">Repositories ({this.state.gitUser.public_repos})</div>
            </div>
            <div id="gistMode" className={`modeButton ${this.state.repoOrGist === "gist" ? 'selected' : ''}`}>
              <div className="buttonText">Gists ({this.state.gitUser.public_gists})</div>
            </div>
          </div>

          {/* Repo Info */}
          <RepoList gitUser={this.state.gitUser} shouldHide={typeof this.state.gitUser.login != undefined && this.state.repoOrGist === "repo" ? 'false' : 'true'}>
          </RepoList>

          {/* Gist Info */}
          <RepoList gitUser={this.state.gitUser} shouldHide={typeof this.state.gitUser.login != undefined && this.state.repoOrGist === "gist" ? 'false' : 'true'}>
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