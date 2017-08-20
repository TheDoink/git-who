import React, { Component } from 'react';
import NameInput from './Components/NameInput';
import UserInfo from './Components/UserInfo';
import RepoList from './Components/RepoList';
import CommitList from './Components/CommitList';
import GistItem from './Components/GistItem';
import './index.css';

import $ from 'jquery';

class App extends Component {

  constructor() {
    super();
    this.state = {
      gitUser: {}, // the FULL git user object
      mode: "user", // which kind of view we should be on, relates to path. Valid options are "user", "commit", "gist"
      repoName: "", // placeholder for the name of the repo we're going to examine
      repoOrGist: "repo", // what kind
      searchMessage: "Search For A Git User Above" // general placeholder message for error handling
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
      console.log("gist mode");
      this.setState({mode: "gist", repoName: pathParts[2]}, function() {});
    } else {
      // if we have 'something else' (probably a repo)...
      console.log("repo mode");
      this.setState({mode: "commit", repoName: pathParts[1]}, function() {});
    }
  }

  // Handling switching between gist and repo viewing
  handleRepoOrGist = (repoOrGist) => {
    this.setState({repoOrGist: repoOrGist});
  };

  // When one of our children sets the gitUser, set it here
  handleSetUser = (response) => {
    
    // If everything was okay
    if(response.status == 200) {
      this.setState({gitUser: response.data, searchMessage: ""}, function() {

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
            <div id="repoMode" onClick={() => this.handleRepoOrGist("repo")} className={`modeButton ${this.state.repoOrGist === "repo" ? 'selected' : ''}`}>
              <div className="buttonText">Repositories ({this.state.gitUser.public_repos})</div>
            </div>
            <div id="gistMode" onClick={() => this.handleRepoOrGist("gist")} className={`modeButton ${this.state.repoOrGist === "gist" ? 'selected' : ''}`}>
              <div className="buttonText">Gists ({this.state.gitUser.public_gists})</div>
            </div>
          </div>

          {/* Repo Info */}
          <RepoList gitUser={this.state.gitUser} repoOrGist="repo" shouldHide={typeof this.state.gitUser.login != undefined && this.state.repoOrGist === "repo" ? 'false' : 'true'}>
          </RepoList>

          {/* Gist Info */}
          <RepoList gitUser={this.state.gitUser} repoOrGist="gist" shouldHide={typeof this.state.gitUser.login != undefined && this.state.repoOrGist === "gist" ? 'false' : 'true'}>
          </RepoList>

          <div id="searchMessage">
            {this.state.searchMessage}
          </div>
        </div>
        
        {/*The 'view commits' mode*/}
        <div className={this.state.mode == "commit" ? '' : 'hidden'}>
          <CommitList repoName={this.state.repoName} gitUser={this.state.gitUser}>
          </CommitList>
        </div>

        {/*The 'view gist' mode*/}
        <div className={this.state.mode == "gist" ? '' : 'hidden'}>
          <GistItem gistId={this.state.repoName}>
          </GistItem>
        </div>

      </div>
    );
  }
}

export default App;