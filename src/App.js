import React, { Component } from 'react';
import NameInput from './Components/NameInput'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="personIcon">
          <i className="fa fa-user-circle-o"></i>
        </div>
        <NameInput>
          
        </NameInput>
      </div>
    );
  }
}

export default App;