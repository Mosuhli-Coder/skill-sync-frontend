// import axios from 'axios';

export const fetchUserData = () => async dispatch => {
  const response = await fetch('/api/user');
  dispatch({ type: 'FETCH_USER_DATA', payload: response.data });
};

export const fetchNotifications = () => async dispatch => {
  const response = await fetch('/api/notifications');
  dispatch({ type: 'FETCH_NOTIFICATIONS', payload: response.data });
};