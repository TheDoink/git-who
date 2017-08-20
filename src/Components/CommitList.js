import React, { Component } from 'react';
import CommitItem from './CommitItem';
import './CommitList.css';

import $ from 'jquery';

class CommitList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      commitList: [], // This list of commits for this repo
      pageNum: 1,     // The page number we're on (30 items per page)
      morePages: true,// If there are more pages to go (since we don't know the total number of commits)
      loading: false, // Whether or not we're in the process of getting more
      failure: false  // whether or not we've had a catastrophic page failure
    }
  };

  getCommits(gitUser, repoName, pageNum) {

    // Ensure we actually have a good user
    if(gitUser.login) {
      this.setState({loading: true}, function() {

        let since = new Date();
        since.setMonth(since.getMonth()-1);
        since = since.toISOString();

        // Try and get that username...
        $.get(`https://api.github.com/repos/${gitUser.login}/${repoName}/commits?since=${since}&page=${pageNum}`,

          // If we get a good response...
          (success, text, obj) => {

            let morePages = true;
            if(success.length < 30) {
              morePages = false;
            }

            this.state.commitList = this.state.commitList.concat(success);

            // Append the new repos to the old repos, and update the pageNum
            this.setState({commitList: this.state.commitList, pageNum: pageNum, failure: false, loading:false, morePages: morePages}, function() {
            });

          })

          // If we get anything else...
          .fail((failure, text, error) => {
            this.setState({failure: true, loading: false});
          });
      });
    }
  }

  /* Only get commits if we have a new username and a repo name*/
  componentWillReceiveProps(nextProps) {
    if(nextProps.gitUser && nextProps.repoName) {

      this.getCommits(nextProps.gitUser, nextProps.repoName, 1);
    }

    // Even if no good username, reset the list
    this.setState({commitList: [], pageNum: 1}, function() {});
  };

  render() {
    return (
      <div>
        {/* The repo title */}
        <div className="repoTitle">
          "{this.props.repoName}"
        </div>

        {/* Always Hide if there was a failure*/}
        <div className={this.state.failure}>

          {/* The list of commits */}
          {this.state.commitList.map(item => (
            <CommitItem key={item.sha} commit={item}>
              
            </CommitItem>
          ))}

          {/*Display is we have no items in our list*/}
          <div className={`noItems ${this.props.gitUser && !this.state.loading && this.state.commitList.length === 0 ? '' : 'hidden'}`}>
            <div>No commits to this repo in the last month!</div>
            <div><a href='/'>Back to {this.props.gitUser.login}</a></div>
          </div>

          {/* A button that is used to get additional repos, only shown when there is a valid user, and when not loading */}
          <div onClick={() => this.getCommits(this.props.gitUser, this.props.repoName, this.state.pageNum+1)} className={`getMore ${this.props.gitUser && !this.state.loading && this.state.morePages ? '' : 'hidden'}`}>
            <i className="fa fa-arrow-circle-o-down getMoreIcon"></i>
            <div className="getMoreText">Get More?</div>
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

export default CommitList;
