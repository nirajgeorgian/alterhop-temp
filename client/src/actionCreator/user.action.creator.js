import {
  USER_AUTH_START, USER_AUTH_SUCCESS, USER_AUTH_FAILURE,
  USER_SIGNUP_START, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILURE,
  PASSWORD_TOKEN_SUCCESS, PASSWORD_TOKEN_START, PASSWORD_TOKEN_FAILURE,
  CONFIRM_TOKEN_START, CONFIRM_TOKEN_SUCCESS, CONFIRM_TOKEN_FAILURE,
  RESET_PASSWORD_START, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE
} from '../actionType/user.action.type'

/*
  loading: true *=> we have to set this in the state
 */
export const userAuthStartAction = payload => {
  return {
    type: USER_AUTH_START,
    payload
  }
}

export const userSignupStartAction = payload => {
  return {
    type: USER_SIGNUP_START,
    payload
  }
}

export const passwordTokenStartAction = payload => {
  return {
    type: PASSWORD_TOKEN_START,
    payload
  }
}

export const confirmTokenStartAction = payload => {
  return {
    type: CONFIRM_TOKEN_START,
    payload
  }
}

export const resetPasswordStartAction = payload => {
  return {
    type: RESET_PASSWORD_START,
    payload
  }
}

/*
  payload = { loggedIn: true, username: 'somevalue' }
 */
export const userAuthSuccessAction = payload => {
  return {
    type:  USER_AUTH_SUCCESS,
    payload
  }
}

export const userSignupSuccessAction = payload => {
  return {
    type: USER_SIGNUP_SUCCESS,
    payload
  }
}

export const passwordTokenSuccessAction = payload => {
  return {
    type: PASSWORD_TOKEN_SUCCESS,
    payload
  }
}

export const confirmTokenSuccessAction = payload => {
  return {
    type: CONFIRM_TOKEN_SUCCESS,
    payload
  }
}

export const resetPasswordSuccessAction = payload => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload
  }
}

/*
  payload.user = { loggedIn: false, username: null }
  payload.error = "some error message"
 */
export const userAuthFailureAction = payload => {
  return {
    type: USER_AUTH_FAILURE,
    user: payload.user,
    error: payload.error
  }
}

export const userSignupFailureAction = payload => {
  return {
    type: USER_SIGNUP_FAILURE,
    user: payload.user,
    error: payload.error
  }
}

export const passwordTokenFailureAction = payload => {
  return {
    type: PASSWORD_TOKEN_FAILURE,
    error: payload.error
  }
}

export const confirmTokenFailureAction = payload => {
  return {
    type: CONFIRM_TOKEN_FAILURE,
    payload
  }
}

export const resetPasswordFailureAction = payload => {
  return {
    type: RESET_PASSWORD_FAILURE,
    payload
  }
}
