import React, { Component } from 'react';
import './GistItem.css';
import GistFileItem from './GistFileItem';

import $ from 'jquery';

class GistItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gist: {         // The gist object
        files: []
      },          
      loading: false,  // Whether or not we're in the process of getting more
      failure: false,
    };
  };

  // Getting the contents of the gist
  getGist(gistId) {

    // Ensure we actually have a good user
    if(gistId) {
      this.setState({loading: true}, function() {
        // Try and get that username...
        $.get(`https://api.github.com/gists/${gistId}`,

          // If we get a good response...
          (success, text, obj) => {

            // Convert the files object to an array for easier iterating
            success.files = Object.keys(success.files).map((obj) => {
              let ret = success.files[obj];
              ret.content.replace(" ", "&nbsp;");
              ret.content = ret.content.split("\n");
              return ret;
            });

            // Set the contents
            this.setState({gist: success, loading:false, failure: false}, function() {});

          })

          // If we get anything else...
          .fail((failure, text, error) => {
            this.setState({failure: true, loading:false});
          });
      });
    }
  }

  /* Only get repos if we have a new username, and if it's good */
  componentWillReceiveProps(nextProps) {
    if(nextProps.gistId) {

      this.getGist(nextProps.gistId);
    }

    // Even if no good gist, reset the data
    this.setState({gist: {files: []}}, function() {});
  };

  componentWillMount() {
    this.getGist(this.props.gistId);
  }

  // Quick function to error check and see who owns the gist
  getOwner() {
    let ret = "";
    if(this.state.gist && this.state.gist.owner) {
      ret = this.state.gist.owner.login
    }
    
    return ret;
  }

  render() {
    
    return (

        // {/* Always hide while loading */}
        <div className={this.state.loading ? 'hidden' : ''}>

          {/* Always hide if there was an error */}
          <div className={this.state.failure ? 'hidden' : ''}>

            {/* Gist title info */}
            <div id="gistTitle">
              <div>Gist: {this.state.gist.id}</div>
              <div>By: {this.getOwner.bind(this)()}</div>
            </div>

            {/* Listing out the files */}
            <div>
              {this.state.gist.files.map(item => (
                <GistFileItem key={item.filename} file={item} numLines={item.content.length.toString().length}>
                  
                </GistFileItem>
                
              ))}
            </div>
          </div>

          {/*Error message if there's a problem */}
          <div className={!this.state.failure ? 'hidden' : ''}>
            <div className="failText">
              A problem occured getting this gist!
            </div>
          </div>
        </div>
    );
  }
}

export default GistItem;
