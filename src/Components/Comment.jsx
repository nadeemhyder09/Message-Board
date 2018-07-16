import React from 'react';
import PostCard from './PostCard';

const Comment = (props) => {
  return(
      <div className="post">
        <PostCard>
          {props.children}
        </PostCard>
      </div>
    )
}

export default Comment;