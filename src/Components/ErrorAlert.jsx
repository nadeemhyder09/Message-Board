import React from 'react';
import '../Containers/ListPosts.css';
const ErrorAlert = (props) => {
 return(
     <div className="alert alert-danger" role="alert">
      {props.children}
    </div>
  )
}

export default ErrorAlert;  