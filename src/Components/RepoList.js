import React, { Component } from 'react';

import RepoItem from './RepoItem';
import './RepoList.css';

import $ from 'jquery';

class RepoList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      repoList: [], // This list of commits for this repo
      pageNum: 1,     // The page number we're on (30 items per page)
      loading: false  // Whether or not we're in the process of getting more
    };
  };

  getRepos(gitUser, pageNum) {

    // Ensure we actually have a good user
    if(gitUser.login) {
      this.setState({loading: true}, function() {
        // Try and get that username...
        $.get(`https://api.github.com/users/${gitUser.login}/repos?visibility=public&sort=updated&direction=desc&page=${pageNum}`,

          // If we get a good response...
          (success, text, obj) => {

            this.state.repoList = this.state.repoList.concat(success);

            // Append the new repos to the old repos, and update the pageNum
            this.setState({repoList: this.state.repoList, pageNum: pageNum, loading:false}, function() {
              console.log(this.state);
            });

          })

          // If we get anything else...
          .fail((failure, text, error) => {
            
          });
      });
    }
  }

  /* Only get repos if we have a new username, and if it's good */
  componentWillReceiveProps(nextProps) {
    if(nextProps.gitUser) {

      this.getRepos(nextProps.gitUser, 1);
    }

    // Even if no good username, reset the list
    this.setState({repoList: [], pageNum: 1}, function() {});
  };

  render() {
    return (
      <div id="repoList">
        {this.state.repoList.map(item => (
          <RepoItem key={item.url} repo={item}>
            
          </RepoItem>
          
        ))}

        {/* A button that is used to get additional repos, only shown when there is a valid user, and when not loading */}
        <div id="getMore" onClick={() => this.getRepos(this.props.gitUser, this.state.pageNum+1)} className={this.props.gitUser && this.state.repoList.length < this.props.gitUser.public_repos && !this.state.loading ? '' : 'hidden'}>
          <i id="getMoreIcon"  className="fa fa-arrow-circle-o-down"></i>
          <div id="getMoreText">Get More?</div>
        </div>
      </div>
    );
  }
}

RepoList.propTypes = {
  gitUser: React.PropTypes.object
}

export default RepoList;
