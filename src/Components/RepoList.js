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
      loading: false,  // Whether or not we're in the process of getting more
      morePages: true, // whether or not we are going to get more pages
      failure: false  // whether or not we've had a catastrophic page failure
    };
  };

  getRepos(gitUser, pageNum, repoOrGist) {

    // Ensure we actually have a good user
    if(gitUser.login) {
      this.setState({loading: true}, function() {
        // Try and get that username...
        $.get(`https://api.github.com/users/${gitUser.login}/${repoOrGist}s?visibility=public&sort=updated&direction=desc&page=${pageNum}`,

          // If we get a good response...
          (success, text, obj) => {

            let morePages = true;
            if(success.length < 30) {
              morePages = false;
            }

            let tmpList = this.state.repoList;

            tmpList = tmpList.concat(success);

            // Append the new repos to the old repos, and update the pageNum
            this.setState({repoList: tmpList, pageNum: pageNum, failure: false, loading:false, morePages: morePages}, function() {
            });

          })

          // If we get anything else...
          .fail((failure, text, error) => {
            this.setState({failure: true, loading: false});
          });
      });
    }
  }

  /* Only get repos if we have a new username, and if it's good */
  componentWillReceiveProps(nextProps) {
    if(nextProps.gitUser) {

      this.getRepos(nextProps.gitUser, 1, nextProps.repoOrGist);
    }

    // Even if no good username, reset the list
    this.setState({repoList: [], pageNum: 1}, function() {});
  };

  render() {
    return (

      <div>
        {/* Always Hide if there was a failure*/}
        <div className={this.state.failure}>
          <div className={`repoList ${this.props.shouldHide==="true" ? 'hidden': ''}`}>
            {this.state.repoList.map(item => (
              <RepoItem key={item.url} repo={item} repoOrGist={this.props.repoOrGist}>
                
              </RepoItem>
              
            ))}

            {/*Display is we have no items in our list*/}
            <div className={`noItems ${this.props.gitUser && !this.state.loading && this.state.repoList.length === 0 ? '' : 'hidden'}`}>
              This user has no {this.props.repoOrGist}s yet!
            </div>

            {/* A button that is used to get additional repos, only shown when there is a valid user, and when not loading */}
            <div onClick={() => this.getRepos(this.props.gitUser, this.state.pageNum+1, this.props.repoOrGist)} className={`getMore ${this.props.gitUser && this.state.morePages && !this.state.loading ? '' : 'hidden'}`}>
              <i className="fa fa-arrow-circle-o-down getMoreIcon"></i>
              <div className="getMoreText">Get More?</div>
            </div>
          </div>
        </div>

        {/*Error message if there's a problem */}
        <div className={!this.state.failure ? 'hidden' : ''}>
          <div className="failText">
            A problem occured!
          </div>
        </div>
      </div>
    );
  }
}

export default RepoList;