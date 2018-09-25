// import { Observable } from 'rxjs'
import { mergeMap, map } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { ofType } from 'redux-observable'
import {
  USER_AUTH_START,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAILURE
} from '../actionType/user.action.type'
import { checkUserStatusSuccess, checkUerStatusFailure } from '../actionCreator/user.action.creator'

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
          return checkUserStatusSuccess(loginResponse.response)
        } else {
          const res = {
            error: loginResponse.response.data,
            user: action.payload.username
          }
          return checkUerStatusFailure(res)
        }
      })
    )
  })
)
