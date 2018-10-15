import {
  PASSWORD_TOKEN_START, PASSWORD_TOKEN_SUCCESS, PASSWORD_TOKEN_FAILURE,
  CONFIRM_TOKEN_START, CONFIRM_TOKEN_SUCCESS, CONFIRM_TOKEN_FAILURE,
  RESET_PASSWORD_START, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_ERROR, RESET_PASSWORD
} from '../actionType/user.action.type'

const initialState = {
  password_token: null,
  username: '',
  email: '',
  confirm_token: null,
  error: '',
  status: false
}

export const passwordReducer = (state = initialState, action) => {
  switch(action.type) {
    case PASSWORD_TOKEN_START:
      return {
        ...state,
        status: false
      }
    case PASSWORD_TOKEN_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case PASSWORD_TOKEN_FAILURE:
      return {
        ...state,
        ...action.payload
      }
      case CONFIRM_TOKEN_START:
        return {
          ...state,
          status: false
        }
      case CONFIRM_TOKEN_SUCCESS:
        return {
          ...state,
          ...action.payload
        }
      case CONFIRM_TOKEN_FAILURE:
        return {
          ...state,
          ...action.payload
        }
        case RESET_PASSWORD_START:
          return {
            ...state,
            status: false
          }
        case RESET_PASSWORD_SUCCESS:
          return {
            ...state,
            ...action.payload
          }
        case RESET_PASSWORD_FAILURE:
          return {
            ...state,
            ...action.payload
          }
        case RESET_PASSWORD_ERROR:
            return {
              ...state,
              error: ''
            }
        case RESET_PASSWORD:
              return {
                ...state,
                initialState
              }
    default:
      return state
  }
}
