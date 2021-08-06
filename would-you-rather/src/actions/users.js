import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const UPDATE_USER = 'UPDATE_USER';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function updateUserVote({ authedUser, qid, answer }) {
  return {
    type: UPDATE_USER,
    authedUser,
    qid,
    answer,
  };
}

export function handleUserVote({ qid, answer }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return new Promise((res, rej) => {
      dispatch(updateUserVote({ authedUser, qid, answer }));
      res();
    }).then(dispatch(hideLoading()));
  };
}
