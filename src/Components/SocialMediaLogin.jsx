import React from 'react';
import '../bootstrap-social.css';
import '../ListPosts.css';

const SocialMediaLogin = (props) => {
  const {facebookLogin, googleLogin} = props;
  return(
      <div className="d-flex justify-content-between mt-1">
        <a href="#" className="btn btn-google" onClick={googleLogin}>
          <span className="fa fa-google">Sign In with Google</span>
        </a>
         <a href="#" className="btn btn-facebook" onClick={facebookLogin}>
          <span className="fa fa-facebook">Sign In with Facebook</span>
        </a>
      </div>
    )
} 

export default SocialMediaLogin;