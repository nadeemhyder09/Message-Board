import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, reset} from 'redux-form';
import {required} from '../Helpers/ReduxFormValidation'
import {errStyle} from '../Helpers/ReduxFormValidation'
import {saveComment} from '../Actions/PostActions';

class SumbitComment extends Component {
  commentComponent(field) {
    const {meta: touched, error} = field;
    return(
        <div>
          <input className="form-control" style={touched && error ? errStyle : null} {...field.input} />
        </div>
      )
  }

  onSubmit(values) {
    const {saveComment, id, uid, dispatch} = this.props;
    saveComment(id, values, uid).then(() => {
      dispatch(reset("SumbitCommentForm"));
    })
  }

  render() {
    const {handleSubmit} = this.props;
    return(
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            name="content"
            component={this.commentComponent}
            validate={required}
          />
          <button type="submit" className="btn btn-success btn-small">Comment</button>
        </form>
      )
  }
}

function mapToStateProps(state, ownProps) {
  return {
    uid: state.user.uid,
  };
}

export default reduxForm({
  form: 'SumbitCommentForm'
})(
  connect(mapToStateProps, {saveComment})(SumbitComment)
)