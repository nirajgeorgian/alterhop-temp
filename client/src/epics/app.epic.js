import { combineEpics } from 'redux-observable'
/*
  import all the epics and combine into one just like root reducer
 */
import { loginUserEpic, signupUserEpic, passwordTokenEpic, confirmTokenEpic, resetPasswordEpic } from './user.epic'

export const rootEpics = combineEpics(loginUserEpic, signupUserEpic, passwordTokenEpic, confirmTokenEpic, resetPasswordEpic)
