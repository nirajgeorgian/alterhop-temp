import {
  USER_AUTH_START,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAILURE
} from '../actionType/user.action.type'

const initialState = {
  user: {
    username: null,
    loggedIn: false,
  },
  loading: false,
  error: null
}

export const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case USER_AUTH_START:
      return {
        ...state,
        loading: true,
        error: null
      }
    case USER_AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null
      }
    case USER_AUTH_FAILURE:
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        error: action.payload.error
      }
    default:
      return state
  }
}
