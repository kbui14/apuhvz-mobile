import {
  USER_FETCH_SUCCESS,
  USER_HUMAN_FETCH_SUCCESS,
  USER_ALPHA_FETCH_SUCCESS,
  USER_ZOMBIE_FETCH_SUCCESS,
  USER_DEAD_FETCH_SUCCESS,
  USER_ON_TEXT_CHANGE
} from '../actions/types';

const INITIAL_STATE = {
  humanCount: 0,
  alphaCount: 0,
  zombieCount: 0,
  deadCount: 0,
  killCode: '',
  user: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_HUMAN_FETCH_SUCCESS:
      return { ...state, humanCount: action.payload };
    case USER_ALPHA_FETCH_SUCCESS:
      return { ...state, alphaCount: action.payload };
    case USER_ZOMBIE_FETCH_SUCCESS:
      return { ...state, zombieCount: action.payload };
    case USER_DEAD_FETCH_SUCCESS:
      return { ...state, deadCount: action.payload };
    case USER_FETCH_SUCCESS:
    //console.log(action);
    //console.log('in user_reducer');
    //console.log(action.payload);
      return { ...state, user: action.payload };
    case USER_ON_TEXT_CHANGE:
      return { ...state, killCode: action.payload};
    default:
      return state;
  }
};