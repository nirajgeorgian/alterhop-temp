// import { Observable } from 'rxjs'
import { switchMap, map } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { ofType } from 'redux-observable'
import {
  USER_AUTH_START,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAILURE
} from '../actionType/user.action.type'

export const loginUserEpic = action$ => action$.pipe(
  ofType(USER_AUTH_START),
  switchMap(action => {
    // const { username, password } = action.payload
    const headers = { 'Content-Type': 'application/json' }
    return ajax.post('/api/auth/login', action.payload, headers).pipe(
      map(loginResponse => {
        // call the success reducer
        console.log(loginResponse)
      })
    )
  })
)
