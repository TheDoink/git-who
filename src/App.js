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
      this.setState({gitUser: {}});

    } else if(pathParts[1] == "gist") {
      this.setState({mode: "gist", repoName: pathParts[2]}, function() {});
    } else {
      // if we have 'something else' (probably a repo)...
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

  hideIfNoUser() {
    return this.state.gitUser.login ? '' : 'hidden';
  }

  getModeToRender() {
    if(this.state.mode == "user") {
      return (
        <div>
          {/* User Info */}
          <UserInfo gitUser={this.state.gitUser}>
          </UserInfo>

          {/*The buttons that determine whether we are looking at repos or gists*/}
          <div id="modeButtons" className={this.hideIfNoUser.bind(this)()}>
            <div id="repoMode" onClick={() => this.handleRepoOrGist("repo")} className={`modeButton ${this.state.repoOrGist === "repo" ? 'selected' : ''}`}>
              <div className="buttonText">Repositories ({this.state.gitUser.public_repos})</div>
            </div>
            <div id="gistMode" onClick={() => this.handleRepoOrGist("gist")} className={`modeButton ${this.state.repoOrGist === "gist" ? 'selected' : ''}`}>
              <div className="buttonText">Gists ({this.state.gitUser.public_gists})</div>
            </div>
          </div>

          <div className={this.hideIfNoUser.bind(this)()}>

            {/* Repo Info */}
            <RepoList gitUser={this.state.gitUser} repoOrGist="repo" shouldHide={this.state.repoOrGist === "repo" ? 'false' : 'true'}>
            </RepoList>

            {/* Gist Info */}
            <RepoList gitUser={this.state.gitUser} repoOrGist="gist" shouldHide={this.state.repoOrGist === "gist" ? 'false' : 'true'}>
            </RepoList>
          </div>

          <div id="searchMessage">
            {this.state.searchMessage}
          </div>
        </div>
      )
    } else if(this.state.mode == "commit") {
      {/*The 'view commits' mode*/}
      return (
        <div>
          <CommitList repoName={this.state.repoName} gitUser={this.state.gitUser}>
          </CommitList>
        </div>
      )
    } else if(this.state.mode == "gist") {
      {/*The 'view gist' mode*/}
      return (
        <div>
          <GistItem gistId={this.state.repoName}>
          </GistItem>
        </div>
      )
    }
  }



  render() {

    return (
      <div className="App">

        <NameInput setUser={this.handleSetUser.bind(this)}>
        </NameInput>

        
        {this.getModeToRender.bind(this)()}
      </div>
    );
  }
}

export default App;