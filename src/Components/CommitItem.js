import React, { Component } from 'react';
import NameLink from './NameLink';
import './RepoItem.css'; // There's some reuse of styles here
import './CommitItem.css';

class RepoItem extends Component {

  // Quick function to error check and see who owns the item
  getAuthor() {
    let ret = "";
    if(this.props.commit && this.props.commit.author) {
      ret = this.props.commit.author.login;
    }
    
    return ret;
  }

  getMessage() {
    let ret = "";
    if(this.props.commit && this.props.commit.commit) {
      ret = this.props.commit.commit.message
    }
    
    return ret;
  }
  
  render() {
    
    return (
        <div className="repoItem">
          <div className="repoSuperScript">
            <div className="commitAuthor">
              <NameLink userName={this.getAuthor.bind(this)()}></NameLink>
            </div>
          </div>
          <div className="repoDescription">{this.getMessage.bind(this)()}</div>
          <span className="repoSubScript">
            <span className="commitSha">{this.props.commit.sha}</span>
          </span>
        </div>
    );
  }
}

export default RepoItem;
