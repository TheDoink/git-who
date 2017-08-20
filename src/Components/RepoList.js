import React, { Component } from 'react';

import RepoItem from './RepoItem';
import './RepoList.css';

import $ from 'jquery';

class RepoList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      repoList: [],
      pageNum: 0,
    }
  };

  getRepos(userName, pageNum) {

    // Try and get that username...
    $.get(`https://api.github.com/users/${userName}/repos?visibility=public&sort=updated&direction=desc`,

      // If we get a good response...
      (success, text, obj) => {

        let tmpRepos = this.state.repoList;
        tmpRepos.concat(success);

        console.log(success);

        // Append the new repos to the old repos, and update the pageNum
        this.setState({repoList: success, pageNum: tmpRepos.length%30}, function() {
          console.log(this.state);
        });

      })

      // If we get anything else...
      .fail((failure, text, error) => {
        
      });
  }

  /* Only get repos if we have a new username, and if it's good */
  componentWillReceiveProps(nextProps) {
    if(nextProps.userName) {

      this.getRepos(nextProps.userName, 0);
    }

    // Even if no good username, reset the list
    this.setState({repoList: [], pageNum: 0}, function() {});
  };

  render() {
    return (
      <div id="repoList">
        {this.state.repoList.map(item => (
          <RepoItem key={item.url} repo={item}>
            
          </RepoItem>
          
        ))}
      </div>
    );
  }
}

export default RepoList;
