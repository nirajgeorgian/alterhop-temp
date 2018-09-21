import {
  USER_AUTH_START,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAILURE
} from '../actionType/user.action.type'

/*
  loading: true *=> we have to set this in the state
 */
export const checkUserStatus = payload => {
  return {
    type: USER_AUTH_START,
    payload
  }
}

/*
  payload = { loggedIn: true, username: 'somevalue' }
 */
export const checkUserStatusSuccess = payload => {
  return {
    type:  USER_AUTH_SUCCESS,
    payload
  }
}

/*
  payload.user = { loggedIn: false, username: null }
  payload.error = "some error message"
 */
export const checkUerStatusFailure = payload => {
  return {
    type: USER_AUTH_FAILURE,
    user: payload.user,
    error: payload.error
  }
}
