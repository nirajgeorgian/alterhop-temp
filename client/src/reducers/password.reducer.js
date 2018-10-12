import {
  PASSWORD_TOKEN_START, PASSWORD_TOKEN_SUCCESS, PASSWORD_TOKEN_FAILURE,
  CONFIRM_TOKEN_START, CONFIRM_TOKEN_SUCCESS, CONFIRM_TOKEN_FAILURE,
  RESET_PASSWORD_START, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE
} from '../actionType/user.action.type'

const initialState = {
  password_token: null,
  confirm_token: null
}

export const passwordReducer = (state = initialState, action) => {
  switch(action.type) {
    case PASSWORD_TOKEN_START:
      return {
        ...state
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
          ...state
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
            ...state
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
    default:
      return state
  }
}
