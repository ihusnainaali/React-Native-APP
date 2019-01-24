import firebase from 'firebase';
import {
  COMMENT_CREATE_UPDATE,
  COMMENT_CREATE_SAVE,
  COMMENT_EDIT_UPDATE,
  COMMENTS_FETCH_SUCCESS,
  COMMENT_SAVE_SUCCESS,
  COMMENT_DELETE
 } from './types';

export const commentCreateUpdate = ({ prop, value }) => {
  // const currentDate = new Date();
  // const month = currentDate.getMonth().toString();
  // const day = currentDate.getDay().toString();
  // const year = currentDate.getYear().toString();
  // const dateString = month + day + year;
  // console.log(dateString);

  return {
    type: COMMENT_CREATE_UPDATE,
    payload: { prop, value }
  };
};

export const commentCreateSave = ({ user, comment, postAuthorId, postId }) => {
  console.log(user, comment, postAuthorId, postId);
  return (dispatch) => {
    saveToFirebase(user, comment, postAuthorId, postId);
    // .then(() => dispatch({ type: COMMENT_CREATE_SAVE })
    // );
  };
};

const saveToFirebase = async (author, comment, postAuthorId, postId) => {
  const db = firebase.database();
  const userRef = db.ref(`/users/${postAuthorId}/posts/${postId}/comments`);
  const postRef = db.ref(`/posts/${postId}/comments`);
  const key = userRef.push().getKey();
  const createdOn = new Date().toString();
  const timestamp = -Date.now();

  try {
    await userRef.push({ author, comment, createdOn, timestamp, likes: 0 });
    await postRef.push({ author, comment, createdOn, timestamp, likes: 0 });
  } catch (err) {
    console.warn(err);
  }
};

export const commentEditUpdate = ({ prop, value }) => {
  return {
    type: COMMENT_EDIT_UPDATE,
    payload: { prop, value }
  };
};

export const commentEditSave = ({ commentText, commentId }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/comments/${commentId}`)
      .update({ content: commentText })
      .then(() => {
        dispatch({ type: COMMENT_SAVE_SUCCESS });
      });
  };
};

export const commentDelete = ({ commentId }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/comments/${commentId}`)
      .remove()
      .then(() => {
        dispatch({ type: COMMENT_DELETE });
    });
  };
};

export const commentsFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/comments`).orderByChild('timestamp')
      .on('value', snapshot => {
        dispatch({ type: COMMENTS_FETCH_SUCCESS, payload: snapshot.val() }
        );
      }
    );
  };
};