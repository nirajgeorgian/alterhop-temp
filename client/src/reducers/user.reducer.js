import {
  USER_AUTH_FAILURE, USER_AUTH_START, USER_AUTH_SUCCESS,
  USER_SIGNUP_FAILURE, USER_SIGNUP_START,
  RESET_USER
} from '../actionType/user.action.type'

const initialState = {
  token: null,
  loggedIn: false,
  user: '',
  error: ''
}

export const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case USER_AUTH_START:
    case USER_SIGNUP_START:
      return {
        ...state
      }
    case USER_AUTH_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case USER_AUTH_FAILURE:
    case USER_SIGNUP_FAILURE:
      return {
        ...state,
        ...action.payload
      }
    case RESET_USER:
      return initialState
    default:
      return state
  }
}
