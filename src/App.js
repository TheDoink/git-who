import React, { Component } from 'react';
import NameInput from './Components/NameInput';
import UserInfo from './Components/UserInfo';


class App extends Component {

  constructor() {
    super();
    this.state = {
      gitUser: {},
      searchMessage: "Search For A Git User Above"
    }
  }

  componentWillMount() {
    this.setState({gitUser: {}});
  }

  // When one of our children sets the gitUser, set it here
  handleAddUser = (response) => {

    console.log(response);
    
    // If everything was okay
    if(response.status == 200) {
      this.setState({gitUser: response.data, searchMessage: ""}, function() {});

    } else if(response.status == 404) {
      // If we can't find that user...
      this.setState({gitUser: {}, searchMessage: "User Not Found!"}, function() {});
      
    } else {
      // Othwerise, we have a big problem
      this.setState({gitUser: {}, searchMessage: "Something Went Wrong, Try Again Later!"}, function() {});
    }
  }



  render() {
    let showUserIcon = this.state.gitUser.avatar_url ? "none": "visible";
    this.state.showRealName = this.state.gitUser.name ? {display: 'visible'} : {display: 'none'};
    return (
      <div className="App">

        <NameInput setUser={this.handleAddUser.bind(this)}>
        </NameInput>

        {/* User Info */}
        <UserInfo gitUser={this.state.gitUser}>
        </UserInfo>

        <div id="searchMessage">
          {this.state.searchMessage}
        </div>
        


      </div>
    );
  }
}

export default App;