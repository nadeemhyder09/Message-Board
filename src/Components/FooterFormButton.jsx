import React from 'react';
import '../Containers/ListPosts.css';

const FooterFormButton = (props) => {
  const {submitLabel, otherLabel, goToLink, history} = props;
  return(
      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary btn-l">{submitLabel}</button>
        <button type="button" className="btn btn-info btn-r" onClick={() => {
          history.push(goToLink);
          }}>{otherLabel}</button>
      </div>
    )
}

export default FooterFormButton;