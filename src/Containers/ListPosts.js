import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getPosts, savePost, deletePost} from '../Actions/PostActions';
import { Field, reduxForm, reset } from 'redux-form';
import './ListPosts.css';
import PostCard from '../Components/PostCard';
import {getUser, logout} from '../Actions/UserActions';
import Link from 'react-router-dom/es/Link';

class ListPosts extends Component {
 
  renderPosts() {
    return _.map(this.props.posts, (post, key) => {
      return(
        <PostCard key={key}>
          <Link to={`/${key}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>{post.body}</p>
          <button onClick={() => {this.props.deletePost(key)}} className="btn btn-danger">Delete</button>
        </PostCard>
        )
    })
  }

  renderField(field) {
    return(
        <input type="text" {...field.input} placeholder={`Please enter a ${field.label}`} 
        className="form-control" />
      )
  }

  onSubmit(values) {
    this.props.savePost(values).then(this.props.dispatch(reset('NewPost')));
  }


  render() {
    const {handleSubmit} = this.props;
    return (
      <div className="navbar">
        <button className="btn btn-danger" onClick={() => {this.props.logout()}}>Sign Out</button>
      
      <div className="container">
        <div className="row">
          <h1 className="text-center">React_Redux + Firebase</h1>
          <div>{this.renderPosts()}</div>
          <div className="text-center col-sm-12 abc">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="form-inline">
              <div className="form-group ">
                <Field
                  name="title"
                  component={this.renderField}
                  label="Title"
                />
                <Field
                  name="body"
                  component={this.renderField}
                  label="body"
                />
                <button type="submit" className="btn btn-success">Add Post</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

let form = reduxForm({
  form: 'NewPost'
})(ListPosts);

form = connect((state, ownProps) => ({
    posts: state.posts,
    user: state.user
  }), {getPosts, savePost, deletePost, getUser, logout}
)(form);

export default form;
