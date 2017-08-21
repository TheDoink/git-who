import React, { Component } from 'react';
import './GistFileItem.css';

class GistFileItem extends Component {

  padNum(num) {
    let ret = num;
    while(ret.toString().length < this.props.numLines) {
      ret = ' '+ret;
    }
    return ret;
  };

  render() {
    
    return (
        <div className="fileItem">
          <div className="fileNameHeader">
            {this.props.file.filename}
          </div>
          <div className="fileContent">
            {this.props.file.content.map((item, index) => (
              <div key={index} className="contentRow">
                <span className="rowNum">{this.padNum(index)}</span>
                <span className="rowContent">{item}</span>
              </div>
              
            ))}

            
          </div>
        </div>
    );
  }
}

export default GistFileItem;
