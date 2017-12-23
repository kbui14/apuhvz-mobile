import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  LOGIN_EMAIL_CHANGED,
  LOGIN_PASSWORD_CHANGED,
  LOGIN_PASSWORD_RETYPE_CHANGED,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAIL,
  AUTH_USER_ATTEMPT,
  AUTH_SIGNOUT_USER,
  RESET_SIGNUP_LOGIN_PAGES,
  RESET_APP_STATE,
  SIGNUP_LIVINGAREA_CHANGED,
  SIGNUP_FNAME_CHANGED,
  SIGNUP_LNAME_CHANGED,
  SIGNUP_FINAL_ATTEMPT,
  SIGNUP_USER_FAIL,
  SIGNUP_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  passwordRetype: '',
  user: null,
  userAtt: null,
  error: '',
  loading: false,
  fname: '',
  lname: '',
  livingArea: 'Adams',
  alpha: false,
  profilePic: null,
  agreed: false,
  fb_token: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { ...state, fb_token: action.payload };
    case FACEBOOK_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload, fb_token: null };
    case LOGIN_EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case LOGIN_PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_PASSWORD_RETYPE_CHANGED:
      return { ...state, passwordRetype: action.payload };
    case AUTH_USER_ATTEMPT:
      return { ...state, loading: true, error: '' };
    case AUTH_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case AUTH_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        password: '',
        passwordRetype: '',
        loading: false
      };
    case RESET_APP_STATE:
    case AUTH_SIGNOUT_USER:
    case RESET_SIGNUP_LOGIN_PAGES:
      return INITIAL_STATE;
    case SIGNUP_LIVINGAREA_CHANGED:
      return { ...state, livingArea: action.payload };
    case SIGNUP_FNAME_CHANGED:
      return { ...state, fname: action.payload };
    case SIGNUP_LNAME_CHANGED:
      return { ...state, lname: action.payload };
    case SIGNUP_FINAL_ATTEMPT:
      return { ...state, loading: true, error: ''};
    case SIGNUP_USER_FAIL:
      return { ...state, error: action.payload, loading: false}
    case SIGNUP_USER_SUCCESS:
      return { ...state, userAtt: action.payload}
    default:
      return state;
  }
}
