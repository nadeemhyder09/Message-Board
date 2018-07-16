import React, {Component} from 'react';

class SimpleBox extends Component {
  render() {
    const {title, body, footer} = this.props;
    return(
        <div className="container">
          <div className="d-flex justify-content-center align-self-center">
            <div className="post col-sm-5">
              <div className="text-center">
                <h3>{title}</h3>
              </div>
              <div className="text-center">
                {body}
              </div>
            </div>
          </div>
        </div>
      )
  }
}

export default SimpleBox;
