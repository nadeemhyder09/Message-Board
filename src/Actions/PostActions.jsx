import {database} from '../Firebase/firebase';
export const FETCH_POSTS = 'fetch_posts';
export const POST_STATUS = 'post_status';
export function getPosts() {
  return dispatch => {
    dispatch({
      type: POST_STATUS,
      payload: true
    })
    database.on('value', snapshot => {
      dispatch({
        type: FETCH_POSTS,
        payload: snapshot.val()
      });
      dispatch({
        type: POST_STATUS,
        payload: false
      });
    }, () => {
      dispatch({
        type: POST_STATUS,
        payload: -1
      })
    })
  }
}

export function savePost(values) {
  return dispatch => database.push(values);
}

export function deletePost(id) {
  return dispatch => database.child(id).remove();
}

export function saveComment(postId, comment, uid) {
  return dispatch => database.child(postId).child('comments').push({
    content: comment.content, uid
  })
}

export function deleteComment(postId, commentId) {
  return dispatch => database.child(postId).child('comments').child(commentId).remove();
}

export function updateComment(postId, commentId, content) {
  return dispatch => database.child(postId).child('comments').child(commentId).update({
    content: content
  })
}
