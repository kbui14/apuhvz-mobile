import { AsyncStorage } from 'react-native';
import { Facebook, SecureStore } from 'expo';
import firebase from 'firebase';
import { FACEBOOK_API_KEY } from '../constants/api_keys';
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  LOGIN_EMAIL_CHANGED,
  LOGIN_PASSWORD_CHANGED,
  LOGIN_PASSWORD_RETYPE_CHANGED,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAIL,
  AUTH_USER_ATTEMPT,
  RESET_APP_STATE,
  RESET_SIGNUP_LOGIN_PAGES,
  SIGNUP_LIVINGAREA_CHANGED,
  SIGNUP_FNAME_CHANGED,
  SIGNUP_LNAME_CHANGED,
  SIGNUP_FINAL_ATTEMPT,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL
} from './types.js';

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
/////////////////EMAIL/PASSWORD LOGIN METHODS///////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// Called when e-mail address is updated
export const emailChanged = text => ({
  type: LOGIN_EMAIL_CHANGED,
  payload: text
});

////////////////////////////////////////////////////////////////
// Called when password is updated
export const passwordChanged = text => ({
  type: LOGIN_PASSWORD_CHANGED,
  payload: text
});

////////////////////////////////////////////////////////////////
// Called when password retype is updated
export const passwordRetypeChanged = text => ({
  type: LOGIN_PASSWORD_RETYPE_CHANGED,
  payload: text
});

////////////////////////////////////////////////////////////////
// Called when password retype is updated
export const resetSignupLoginPages = () => ({
  type: RESET_SIGNUP_LOGIN_PAGES
});

////////////////////////////////////////////////////////////////
// Call appropriate FireBase method to login
export const loginUser = (email, password) => async dispatch => {
  try {
    // Dispatch event to trigger loading spinner
    dispatch({ type: AUTH_USER_ATTEMPT });

    // Attempt to login user
    const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
    //console.log(user);
    authUserSuccess(dispatch, user);
  } catch (err) {
    //console.error(err);
    loginUserFail(dispatch, 'Authentication Failed');
  }
};

////////////////////////////////////////////////////////////////
// Call appropriate FireBase method to signup user
export const signupUser = (email, password, passwordRetype) => async dispatch => {
  try {
    // Dispatch event to trigger loading spinner
    dispatch({ type: AUTH_USER_ATTEMPT });

    if (!email.match(/@apu.edu/)){
      return loginUserFail(dispatch, 'Please an @apu.edu email');
    }
    if (password !== passwordRetype) {
      return loginUserFail(dispatch, 'Passwords do not match');
    }

    // Attempt to signup new user
    const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
    //console.log(user);
    authUserSuccess(dispatch, user);
  } catch (err) {
    switch (err.code) {
      case 'auth/email-already-in-use':
        return loginUserFail(
          dispatch,
          `${email} already in use - Please try another e-mail address`
        );
      case 'auth/invalid-email':
        return loginUserFail(
          dispatch,
          `${email} is an invalid email address - Please ensure you typed your e-mail correctly`
        );
      case 'auth/weak-password':
        return loginUserFail(dispatch, 'Password is too weak - Please try again.');
      default:
        // console.log(err.message);
        return loginUserFail(dispatch, err.message);
    }
  }
};

////////////////////////////////////////////////////////////////
// Helper method for successful email/password login
const authUserSuccess = (dispatch, user) => {
  dispatch({
    type: AUTH_USER_SUCCESS,
    payload: user
  });
};

////////////////////////////////////////////////////////////////
// Helper method for failed email/password login
const loginUserFail = (dispatch, error = '') => {
  dispatch({
    type: AUTH_USER_FAIL,
    payload: error
  });
};

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
///////////////////SIGN UP METHODS//////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

const finishSignupFail = (dispatch, error = '') => {
  dispatch({
    type: SIGNUP_USER_FAIL,
    payload: error
  });
};

const finishSignupSuccess = (dispatch, userAtt) => {
  dispatch({
    type: SIGNUP_USER_SUCCESS,
    payload: userAtt
  });
};


export const finishSignup = (fName, lname, livingArea, alpha, profilePic, agreed) => async dispatch => {
  console.log('in finishSignUp');
  var pid = '',
      status = 'Human';
      isVerified = false,
      vaccines = 0,
      missions = 0,
      auxMissions = 0,
      timer = Date.now()

      console.log('timer: ' + timer);

      pid = Math.random().toString(36).substr(2,6);
      console.log('pid ' + pid);

  try {
    dispatch({ type: SIGNUP_FINAL_ATTEMPT });
    console.log('in finishSignUp');
    if ( fName === '' ){
      return finishSignupFail(dispatch, 'First name is required');
    }
    if ( lname === ''){
      return finishSignupFail(dispatch, 'Last name is required');
    }
    if (!agreed){
      return finishSignupFail(dispatch, 'You must agree to the terms');
    }


    const { currentUser } = firebase.auth();
    
    
    firebase.database().ref(`/users/${currentUser.uid}`)
      .push({ fName, lname, livingArea, alpha, profilePic, agreed, pid, status, isVerified, vaccines, missions, auxMissions, timer })
      .then(() => {
        console.log('Dispatched user attributes: ' + dispatch + '    ');
      });
      currentUser.updateProfile({
        displayName: fName + " " + lname
      }).then(function() {
        authUserSuccess(dispatch, currentUser);        
      }).catch(function(error){
        finishSignupFail(dispatch, 'Something went wrong: ' + error)
        console.log(error);
      });
  } catch (err) {
    console.log('uh oh error coming in!  ' + err.message);
    switch (err.code) {
      default:
      return finishSignupFail(dispatch, err.message);
    }
  }
};

export const userUpdate = ({ prop, value }) => ({
  type: SIGNUP_LIVINGAREA_CHANGED,
  payload: {prop, value}
});

export const fNameChanged = text => ({
  type: SIGNUP_FNAME_CHANGED,
  payload: text
});

export const lNameChanged = text => ({
  type: SIGNUP_LNAME_CHANGED,
  payload: text
})

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
///////////////////////SHARED METHODS///////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// Called when user wants to signout
export const signoutUser = () => async dispatch => {
  try {
    // Dispatch event to trigger loading spinner
    dispatch({ type: AUTH_USER_ATTEMPT });

    // Attempt to signout user
    await firebase.auth().signOut();
    //await AsyncStorage.removeItem('fb_token'); // Remove if exists
    await SecureStore.deleteItemAsync('fb_token');

    // Dispatch signout user event
    dispatch({ type: RESET_APP_STATE });
  } catch (err) {
    console.error(err);
  }
};

export const uploadAsByteArray = async (pickerResultAsByteArray, progressCallback) => {

  try {

    var metadata = {
      contentType: 'image/jpeg'
    };

    //var strImage = pickerResultAsByteArray.replace(/^file:\/[a-z]+;base64,/, "");
    //console.log(strImage);
    let name = new Date().getTime() + "-media.jpg"
    var storageRef = firebase.storage().ref();
    var ref = storageRef.child('userImages/' + name)
    let uploadTask = ref.putString(pickerResultAsByteArray,'base64').then(function(snapshot) {

      progressCallback && progressCallback(snapshot.bytesTransferred / snapshot.totalBytes)
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');

    }, function (error) {
      console.log("in _uploadAsByteArray ", error)
    }, function () {
      var downloadURL = uploadTask.snapshot.downloadURL;
      console.log("_uploadAsByteArray ", uploadTask.snapshot.downloadURL)

      // save a reference to the image for listing purposes
      var ref = firebase.database().ref('assets');
      ref.push({
        'URL': downloadURL,
        //'thumb': _imageData['thumb'],
        'name': name,
        //'coords': _imageData['coords'],
        'owner': firebase.auth().currentUser && firebase.auth().currentUser.uid,
        'when': new Date().getTime()
      })
    });



  } catch (ee) {
      console.log("when trying to load _uploadAsByteArray ", ee)
  }
}
