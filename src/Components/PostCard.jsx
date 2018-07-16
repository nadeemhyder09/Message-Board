import React, {Component} from 'react';

class PostCard extends Component {
  render() {
    return(
        <div>
          <div className="post">
            {this.props.children}
          </div>
        </div>
      )
  }
}

export default PostCard;