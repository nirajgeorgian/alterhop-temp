import {userReducer} from "./user.reducer";
import {combineReducers} from "redux";
import {errorReducer} from "./error.reducer";
import {loadingReducer} from "./loading.reducer";
import {pageReducer} from "./page.reducer";
import {passwordReducer} from './password.reducer'


export const rootReducer = combineReducers({
  user: userReducer,
  error: errorReducer,
  loading: loadingReducer,
  page: pageReducer,
  password: passwordReducer
})
