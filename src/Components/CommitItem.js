import React, { Component } from 'react';
import './RepoItem.css'; // There's some reuse of styles here
import './CommitItem.css';

import $ from 'jquery';

class RepoItem extends Component {

  constructor(props) {
    super(props);
  };
  
  render() {
    
    return (
        <div className="repoItem">
          <span className="repoSuperScript">
            <span className="commitAuthor">
              {this.props.commit.author.login}
            </span>
          </span>
          <div className="repoDescription">{this.props.commit.commit.message}</div>
          <span className="repoSubScript">
            <span className="commitSha">{this.props.commit.sha}</span>
          </span>
        </div>
    );
  }
}

export default RepoItem;