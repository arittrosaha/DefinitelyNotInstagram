import * as LikesApiUtil from '../util/posts_likes_api_util';

export const RECEIVE_LIKE = 'RECEIVE_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';

export const receiveLike = (like) => {
  return ({
    type: RECEIVE_LIKE,
    like
  });
};

export const removeLike = (like) => {
  return ({
    type: REMOVE_LIKE,
    like
  });
};


export const createLike = postId => dispatch => {
  return LikesApiUtil.createLike(postId).then( like => {
    dispatch(receiveLike(like));
  });
};

export const deleteLike = likeId => dispatch => {
  return LikesApiUtil.deleteLike(likeId).then( (like) => {
    dispatch(removeLike(like));
  });
};
