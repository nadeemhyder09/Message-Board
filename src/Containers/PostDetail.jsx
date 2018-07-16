import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'react-router-dom/es/Link';
import PostCard from '../Components/PostCard';
import SubmitComment from './SubmitComment';
import _ from 'lodash';
import Comment from '../Components/Comment';
import {deleteComment, updateComment} from '../Actions/PostActions';
import {Field, reduxForm, reset} from 'redux-form';
import {errStyle} from '../Helpers/ReduxFormValidation';
import {required} from '../Helpers/ReduxFormValidation';


class PostDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      comment: '',
      key: '',
      currentValue: '',
      isExpanded: false
    }
    this.renderForm = this.renderForm.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  onSubmit(postId, commentId, content) {
    const {updateComment, dispatch} = this.props;
    updateComment(postId, commentId, content).then(() => {
      this.setState({
        isEditing: false,
        comment: '',
        key: ''
      })
      dispatch(reset("SumbitCommentForm1"));

    })
  }
  updateInputValue(evt) {
    this.setState({
      currentValue: evt.target.value
    });
  }

   classToggle() {
    const {isExpanded} = this.state;
    this.setState({
      isExpanded: true
     
    })
  }

  toggleState1() {
    const {isEditing} = this.state;
    this.setState({
      isEditing: false,
       content: ''
    })
  }


  renderForm(comment,key) {
    const {post, content} = this.props;
    return(
        <div className="post">
          <input type="text" className="form-control" defaultValue={comment}
          onChange={evt => this.updateInputValue(evt)} name="content"/>
          <button 
              type="submit" className="btn btn-success btn-small" 
              onClick={() => this.onSubmit(this.props.match.params.id, key, 
              this.state.currentValue)}>Update
          </button>
          <button 
              type="submit" className="btn btn-primary btn-small" onClick={() => this.toggleState1()}
              >Cancel
          </button>
        </div>
      )
  }
  
  renderItem() {
    const {post} = this.props;
    return _.map(post.comments, (comment, key) => {
      return(
        <Comment key={key} id={key}>
          {comment.content}
          <button 
            onClick={() => {this.props.deleteComment(this.props.match.params.id, key)}} 
            className="btn btn-danger btn-small btn-r">Delete
          </button>
          <button 
            className="btn btn-primary btn-small btn-r" 
            onClick={() => this.toggleState(comment.content, key)}>Update
          </button>
        </Comment>
        ) 
    })

  }

  toggleState(content, key) {
    const {isEditing, comment} = this.state;
    this.setState({
      isEditing: !isEditing,
      comment: content,
      key: key
    })
  }

  renderComments() {
    const {isEditing, comment, key} = this.state;
    return(
        isEditing ? this.renderForm(comment, key) : this.renderItem()
      )
    
  }
  render() {
    const {post, match, comment, content} = this.props;
    return(
        <div>
          <div className="navbar">
            <Link to="/" className="btn btn-primary">
              Go HOME
            </Link>
          </div>
          <div className="container">
            <PostCard>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <SubmitComment id={match.params.id} />
            </PostCard>
            {this.renderComments()}
          </div>
        </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {post: state.posts[ownProps.match.params.id], 
    uid: state.user.uid
  }
}

export default reduxForm({
  form: 'SumbitCommentForm1'
})(
  connect(mapStateToProps, {deleteComment, updateComment})(PostDetail)
)