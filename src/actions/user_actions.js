import firebase from 'firebase';
import { db } from '../actions';

import {
  USER_FETCH_SUCCESS,
  USER_HUMAN_FETCH_SUCCESS,
  USER_ZOMBIE_FETCH_SUCCESS,
  USER_DEAD_FETCH_SUCCESS,
  USER_ALPHA_FETCH_SUCCESS
} from './types';


////////////////////////////////////////
////  Getting Human users count
////
export const humanUsersCountFetch = () => {
  var count = 0;
  return (dispatch) => {
    firebase.database().ref().child('users').orderByChild('status').equalTo('Human').on('child_added', snapshot => {
        count++;
        dispatch({ type: USER_HUMAN_FETCH_SUCCESS, payload: count });
    });
  };
};

////////////////////////////////////////
////  Getting Alpha users count
////
export const alphaUsersCountFetch = () => {
  var count = 0;
  return (dispatch) => {
    firebase.database().ref().child('users').orderByChild('status').equalTo('Alpha').on('child_added', snapshot => {
        count++;
        dispatch({ type: USER_ALPHA_FETCH_SUCCESS, payload: count });
    });
  };
};

////////////////////////////////////////
////  Getting Zombie users count
////
export const zombieUsersCountFetch = () => {
  var count = 0;
  return (dispatch) => {
    firebase.database().ref().child('users').orderByChild('status').equalTo('Zombie').on('child_added', snapshot => {
        count++;
        dispatch({ type: USER_ZOMBIE_FETCH_SUCCESS, payload: count });
    });
  };
};

////////////////////////////////////////
////  Getting Dead user count
////
export const deadUsersCountFetch = () => {
  return (dispatch) => {
    firebase.database().ref().child('users').orderByChild('status').equalTo('Dead').on('child_added', snapshot => {
        dispatch({ type: USER_DEAD_FETCH_SUCCESS, payload: snapshot.numChildren() });
    });
  };
};

////////////////////////////////////////
////  Getting user data
////
export const usersFetch = () => {
  return (dispatch) => {
    firebase.database().ref(`users/`)
      .on('value', snapshot => {
        //console.log("sending snapshot");
        //console.log(snapshot.val());
        //console.log("numChildren: " + snapshot.numChildren());
        dispatch({ type: USER_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

////////////////////////////////////////
////  Enter Kill query
////

export const enterKill = () => {
  return () => {
    firebase.database().ref().child('users/ujfjq1').on('value', snapshot =>{
      snapshot.ref.update({ status: "Zombie"})
      console.log('Killed the player');
    });
  };
};