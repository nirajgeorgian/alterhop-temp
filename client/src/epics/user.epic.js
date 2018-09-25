// import { Observable } from 'rxjs'
import { mergeMap, map } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { ofType } from 'redux-observable'
import {
  USER_AUTH_START,
  USER_SIGNUP_START
} from '../actionType/user.action.type'
import {
  userAuthSuccessAction, userAuthFailureAction,
  userSignupSuccessAction, userSignupFailureAction
} from '../actionCreator/user.action.creator'

export const loginUserEpic = (action$, state$) => action$.pipe(
  ofType(USER_AUTH_START),
  mergeMap(action => {
    // const { username, password } = action.payload
    const headers = { 'Content-Type': 'application/json' }
    // check that user is logged in or not
    return ajax.post('/api/auth/login', action.payload, headers).pipe(
      map(loginResponse => {
        // call the success reducer
        if(loginResponse.status === 200 && loginResponse.response.success) {
          return userAuthSuccessAction(loginResponse.response)
        } else {
          const res = {
            error: loginResponse.response.data,
            user: action.payload.username
          }
          return userAuthFailureAction(res)
        }
      })
    )
  })
)

export const signupUserEpic = (action$, state$) => action$.pipe(
  ofType(USER_SIGNUP_START),
  mergeMap(action => {
    const headers = { 'Content-Type': 'application/json' }
    return ajax.post('/api/auth/signup', action.payload, headers).pipe(
      map(signupResponse => {
        if(signupResponse.status === 200 && signupResponse.response.success) {
          return userSignupSuccessAction(signupResponse.response)
        } else {
          const res = {
            error: signupResponse.response.data,
            user: action.payload.username
          }
          return userSignupFailureAction(res)
        }
      })
    )
  })
)
