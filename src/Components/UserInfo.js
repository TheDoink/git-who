import React, { Component } from 'react';
import './UserInfo.css';

class UserInfo extends Component {

  getUserIconStyle = () => {

    // Define a box where the image will go 
    let ret = {
      'width':'22vw',
      'height':'22vw',
      'backgroundPosition':'center',
      'backgroundSize':'contain',
      'backgroundRepeat': 'no-repeat',
      'display':'inline-block',
      'position':'relative'
    };

    // If we have a user...
    if(this.props.gitUser.avatar_url) {
      
      // Display that user's image
      ret['backgroundImage'] = `url('${this.props.gitUser.avatar_url}')`;
    } else {

      // Otherwise hide it
      ret.display = "none";
    }

    return ret;
  };

  render() {
    
    return (
        <div>
          <div id="iconRow">

            {/*A user's avatar*/}
            <div id="userIcon" style={this.getUserIconStyle()}></div>

            {/*The placeholder icon*/}
            <div id="personIcon" className={this.props.gitUser.login ? 'hidden' : ''}>
              <i className="fa fa-user"></i>
            </div>

          </div>

          {/*Fun facts about the user, only displaying the ones they have*/}
          <div id="userInfo" className={this.props.gitUser.login ? '' : 'hidden'}>
            <div id="userName">{this.props.gitUser.login}</div>
            <div id="realName" className={this.props.gitUser.name ? '' : 'hidden'}>({this.props.gitUser.name})</div>
            <div id="location" className={this.props.gitUser.location ? '' : 'hidden'}>From - {this.props.gitUser.location}</div>
          </div>
        </div>
    );
  }
}

export default UserInfo;
