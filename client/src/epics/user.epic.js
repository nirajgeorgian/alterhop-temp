import {filter, map, switchMap, catchError, mergeMap, takeUntil} from 'rxjs/operators'
import {concat, of, merge} from 'rxjs'
import {ajax} from 'rxjs/ajax'
import {ofType} from 'redux-observable'
import {USER_AUTH_START, CANCEL_REQUEST, USER_SIGNUP_START, PASSWORD_TOKEN_START, RESET_PASSWORD_START, CONFIRM_TOKEN_START} from '../actionType/user.action.type'
import {
  userAuthFailureAction, userAuthSuccessAction,
  userSignupFailureAction, userSignupSuccessAction,
  passwordTokenFailureAction, passwordTokenSuccessAction,
  resetPasswordSuccessAction, resetPasswordFailureAction,
  confirmTokenFailureAction, confirmTokenSuccessAction
} from '../actionCreator/user.action.creator'
import {loadingFalse, loadingTrue} from "../actionCreator/loading.action.creator";

export const loginUserEpic = (action$, state$) => {
  return action$.pipe(
    ofType(USER_AUTH_START),
    filter(action => action.payload.username !== '' && action.payload.password !== ''),
    switchMap(({payload}) => {
      const headers = {'Content-Type': 'application/json'}
      const loadingOn = of(loadingTrue(true))
      const request = ajax.post('http://localhost:3000/api/auth/login', payload, headers).pipe(
        map(loginResponse => {
          // call the success reducer
          if (loginResponse.status === 200 && loginResponse.response.success) {
            const res = {
              loggedIn: true,
              token: loginResponse.response.data
            }
            return userAuthSuccessAction(res)
          } else {
            const res = {
              error: loginResponse.response.data,
              user: payload.username
            }
            return userAuthFailureAction(res)
          }
        }),
        catchError(error => {
          const res = {
            error: error.response.data,
            user: payload.username
          }
          return of(userAuthFailureAction(res))
        }),
        takeUntil(action$.pipe(
          ofType(CANCEL_REQUEST)
        ))
      )
      const loadingOff = of(loadingFalse(false))
      // merge both the result's
      return concat(
        loadingOn,
        request,
        loadingOff
      )
    })
  );
}

export const signupUserEpic = (action$, state$) => action$.pipe(
  ofType(USER_SIGNUP_START),
  switchMap(action => {
    const loadingOn = of(loadingTrue(true))
    const headers = { 'Content-Type': 'application/json' }
    const request = ajax.post('http://localhost:3000/api/auth/signup', action.payload, headers).pipe(
      map(signupResponse => {
        if(signupResponse.status === 201 && signupResponse.response.success) {
          return userSignupSuccessAction(signupResponse.response)
        } else {
          const res = {
            error: signupResponse.response.data,
            user: action.payload.username
          }
          return userSignupFailureAction(res)
        }
      }),
      catchError(error => {
        const res = {
          error: error.response.data,
          user: action.payload.username
        }
        return of(userSignupFailureAction(res))
      }),
      takeUntil(action$.pipe(
        ofType(CANCEL_REQUEST)
      ))
    );
    const loadingOff = of(loadingFalse(false))
    return concat(
      loadingOn,
      request,
      loadingOff
    )
  })
)

export const passwordTokenEpic = (action$, state$) => action$.pipe(
  ofType(PASSWORD_TOKEN_START),
  switchMap(action => {
    const loadingOn = of(loadingTrue(true))
    const headers = { 'Content-Type': 'application/json' }
    const request = ajax.post('http://localhost:3000/api/auth/password_token', action.payload, headers).pipe(
      map(tokenResponse => {
        if(tokenResponse.status === 200 && tokenResponse.response.success) {
          const username = action.payload.username ? action.payload.username : ''
          const email = action.payload.email ? action.payload.email : ''
          const res = {
            password_token: tokenResponse.response.data,
            username,
            email
          }
          return passwordTokenSuccessAction(res)
        } else {
          const res = {
            error: tokenResponse.response.data
          }
          return passwordTokenFailureAction(res)
        }
      }),
      catchError(error => {
        const res = {
          error: error.response.data
        }
        return of(passwordTokenFailureAction(res))
      }),
      takeUntil(action$.pipe(
        ofType(CANCEL_REQUEST)
      ))
    )
    const loadingOff = of(loadingFalse(false))
    return concat(
      loadingOn,
      request,
      loadingOff
    )
  })
);

export const resetPasswordEpic = (action$, state$) => action$.pipe(
  ofType(RESET_PASSWORD_START),
  switchMap(action => {
    const loadingOn = of(loadingTrue(true))
    const headers = { 'Content-Type': 'application/json' }
    const request = ajax.post('http://localhost:3000/api/auth/password_token', action.payload, headers).pipe(
      map(tokenResponse => {
        if(tokenResponse.status === 200 && tokenResponse.response.success) {
          const res = {
            password_token: tokenResponse.response.data,
            status: true
          }
          return resetPasswordSuccessAction(res)
        } else {
          const res = {
            error: tokenResponse.response.data
          }
          return resetPasswordFailureAction(res)
        }
      }),
      catchError(error => {
        const res = {
          error: error.response.data
        }
        return of(passwordTokenFailureAction(res))
      }),
      takeUntil(action$.pipe(
        ofType(CANCEL_REQUEST)
      ))
    )
    const loadingOff = of(loadingFalse(false))
    return concat(
      loadingOn,
      request,
      loadingOff
    )
  })
);

export const confirmTokenEpic = (action$, state$) => action$.pipe(
  ofType(CONFIRM_TOKEN_START),
  switchMap(action => {
    const loadingOn = of(loadingTrue(true))
    const headers = { 'Content-Type': 'application/json' }
    console.log(action.payload);
    // debugger
    const request = ajax.post('http://localhost:3000/api/auth/confirm_token', action.payload, headers).pipe(
      map(tokenResponse => {
        if(tokenResponse.status === 200 && tokenResponse.response.success) {
          const username = action.payload.username ? action.payload.username : ''
          const email = action.payload.email ? action.payload.email : ''
          const res = {
            confirm_token: tokenResponse.response.data,
            username,
            email,
            status: true
          }
          return confirmTokenSuccessAction(res)
        } else {
          const res = {
            error: tokenResponse.response.data
          }
          return confirmTokenFailureAction(res)
        }
      }),
      catchError(error => {
        const res = {
          error: error.response.data
        }
        return of(confirmTokenFailureAction(res))
      }),
      takeUntil(action$.pipe(
        ofType(CANCEL_REQUEST)
      ))
    )
    const loadingOff = of(loadingFalse(false))
    return concat(
      loadingOn,
      request,
      loadingOff
    )
  })
);
