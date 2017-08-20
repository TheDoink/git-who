import React, { Component } from 'react';
import './RepoItem.css';

import $ from 'jquery';

class RepoItem extends Component {

  constructor(props) {
    super(props);
  };


    /* display...
  repo name
  repo descriptionb
  programming language,
  number of watches
  number of forks */
  render() {
    
    return (
        <div className="repoItem">
          <span className="repoSuperScript">
            <i className="repoName">
              
              {/* The project name and link to the commits */}
              <a href={this.props.repo.name+"/commits"}>{this.props.repo.name}</a>
              
            </i>
            <span className="repoLanguage">{this.props.repo.language}</span>
          </span>
          <div className="repoDescription">{this.props.repo.description}</div>
          <span className="repoSubScript">
            <span className="repoWatchers" title="watchers">{this.props.repo.watchers_count}<i className="fa fa-eye"></i></span>
            &nbsp;
            <span className="repoForks" title="forks">{this.props.repo.forks_count}<i className="fa fa-code-fork"></i></span>
          </span>
        </div>
    );
  }
}

export default RepoItem;
