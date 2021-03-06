import React, { Component, Children } from 'react';
import { View, Text, TouchableWithoutFeedback, StatusBar, Image, ScrollView } from 'react-native';
import firebase, { database } from 'firebase';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
  SocialIcon
} from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Spinner } from '../components/Spinner';

import { PRIMARY_COLOR, SEAFOAM_COLOR, GREEN, LIGHT_GREEN, DARK_GREEN } from '../constants/style';
import { style } from 'expo/src/Font';

// Purpose of this auth screen is just to call action creator
class AuthScreen extends Component {
  //////////////////////////////////////////////////////////////////////////////////
  // State definition
  state = { inSignupMode: false, showLoading: true, needsToSignUp: false, userObject: null }; // Just for local use

  //////////////////////////////////////////////////////////////////////////////////
  // Register the event which detects a change of state in the logged-in user
  componentWillMount() {
    //this.props.loading = true;
    console.log("In component will mount")
    // Check if user is persisted and "login" by navigating to main if so
    console.log(firebase.auth().currentUser);
    if (firebase.auth().currentUser) {
      console.log("In firebase.auth().currentUser ");
      firebase.database().ref(`users/`)
      .orderByChild('userID').equalTo(currentUser.uid).on("child_added", snapshot =>{
        this.setState({ userObject: snapshot.val() });
        console.log(snapshot.val() + " aww yee boiii 01");
      });

      if ( this.state.userObject === undefined ){
        this.setState({ needsToSignUp: true });
      } else {
        this.setState({ needsToSignUp: false});
      }

      if (this.state.needsToSignUp){
      console.log(`${firebase.auth().currentUser.email} already logged in.`);
      return this.props.navigation.navigate('main'); // Navigate to main page
    } else if (!this.state.needsToSignUp){
      return this.props.navigation.navigate('sign');
    }
    }


    //console.log(this.props.navigation.state.params);

    //console.log('Before checking firebase ' + this.state.userObject);
    // Listen for authentication state to change.
    firebase.auth().onAuthStateChanged(user => {
      // Show login screen b/c firebase has just authenticated/denied user
      this.props.loading = false;
      this.setState({ showLoading: this.props.loading }); // Retrigger components
      var contSignUp = true;
      if ( user ){
        
        // Print out debug info
        console.log('onAuthStateChanged()');        
        console.log('--We are authenticated now!');
        console.log(`--Display Name: ${user.displayName}`);
        console.log(`--Email: ${user.email}`);
        //console.log(`--Provider: ${user.providerId}`);
        console.log(`--uid: ${user.uid}`);
        console.log(`isVerified: ${user.emailVerified}`);
        console.log("continue sign up: " + contSignUp);        
        //console.log('needs to sign up: ' + this.state.needsToSignUp);
        //console.log(this.state.userObject);
      
      //console.log('this is called here');
      // Checks to see if the user has properties within the database. If so, it will return an object. If not, null.
      // How the magic works:
      // For some reason the reference function was being called last no matter the order within this scope.
      // So what I had to do was put everything inside the snapshot function.
      // WILL NEED TO CLEAN THIS UP A LOT. VERY UGLY AND MESSY.
 

      const { currentUser } = firebase.auth();
      console.log("About to reference database");
      //console.log(user);
      firebase.database().ref(`users/`)
      .orderByChild('userID').equalTo(user.uid).on('child_changed', snapshot =>{
        
        console.log
        console.log("In Database ref");
        console.log(snapshot.val());
        if( snapshot.val() !== undefined){
          contSignUp = false;
          console.log("continue sign up: " + contSignUp);          
        }
      //}); // TEST: Puts all the if statements outside of the firebase reference
        //console.log("The User Object");
        //console.log(this.state.userObject);
      //if ( this.state.userObject === null ){
        //this.state.needsToSignUp = true;    
        //console.log(this.state.needsToSignUp);        
        //console.log('changed needsToSignUp to true')
      //} else {
        //this.state.needsToSignUp = false;
        //console.log(this.state.needsToSignUp);
        //console.log('changed needsToSignUp to false');
      //}
      
      if (user) {
        console.log("Navigating time");
        // Navigate to main page
        if (contSignUp && user) {
          console.log('navigating to signup')
          this.props.navigation.navigate('sign');
          return;
        } else if (!contSignUp && user){
          console.log('navigating to main')
          this.props.navigation.navigate('main');
          return;
        } else {
          console.log('navigating to auth')
          this.props.navigation.navigate('auth');          
        }
      }
      });
      
      console.log("Redirecting to appropriate page");
      if ( user.displayName && user) {
       this.props.navigation.navigate('main'); 
      }
      else if ( user.displayName === null && user){
        console.log("navigating to signup");
        this.props.navigation.navigate('sign');
      }

    } else { // if the current user id is null then go to auth page.
      this.props.navigation.navigate('auth');          
    }
    console.log("Goodbye");
    //this.props.navigation.navigate('auth');          
    
    });

    
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Called whenever one of the props (properties) changes - when the login/token
  // property from the auth reducer changes, this will be called.
  componentWillReceiveProps(nextProps) {
    this.setState({ showLoading: nextProps.loading });
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Update the property when changed
  onEmailChange = text => {
    this.props.emailChanged(text);
  };

  //////////////////////////////////////////////////////////////////////////////////
  // Update the property when changed
  onPasswordChange = text => {
    this.props.passwordChanged(text);
  };

  //////////////////////////////////////////////////////////////////////////////////
  // Update the property when changed
  onPasswordRetypeChange = text => {
    this.props.passwordRetypeChanged(text);
  };

  //////////////////////////////////////////////////////////////////////////////////
  // Login user via username/password
  onStandardLoginButtonPress = () => {
    const { email, password } = this.props;
    this.props.loginUser(email, password);
  };

  //////////////////////////////////////////////////////////////////////////////////
  // Redirect user to sign up page & creates user auth via username/password
  onStandardSignupButtonPress = () =>{
    //try{
    //const { email, password, passwordRetype } = this.props;
   // this.props.continueSignUp(email, password, passwordRetype);
    /*this.props.navigation.navigate('sign');
    }
    catch(err){
      return console.log(err);
    }*/
    // Best way to flow this: Have this point to an action that will pass in email, password, and passwordRetype.
    // Uncomment this when we are ready to create user through sign up page.
    this.setState({ needsToSignUp: true });
    const { email, password, passwordRetype } = this.props;
    this.props.signupUser(email, password, passwordRetype);
  };

  //////////////////////////////////////////////////////////////////////////////////
  // Toggles between Login mode and Signup mode
  onSignupLoginToggle = () => {
    this.setState({ inSignupMode: !this.state.inSignupMode });
    this.props.resetSignupLoginPages();
  };

  //////////////////////////////////////////////////////////////////////////////////
  // Render login buttons conditionally (show spinner when working on login)
  renderButtons() {
    if (this.state.inSignupMode) {
      return (
        <View>
          <Button
            title="Sign Up"
            //icon={{ name: 'vpn-key' }}
            backgroundColor={PRIMARY_COLOR}
            onPress={this.onStandardSignupButtonPress}
          />

          <View style={styles.detailWrapperStyle}>
            <Text style={{ textAlign: 'center', color: 'white' }}>Already have an account?&nbsp;</Text>
            <TouchableWithoutFeedback onPress={this.onSignupLoginToggle}>
              <View>
                <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Log In</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      );
    }
    return (
      <View>
        <Button
          title="Log In"
          //icon={{ name: 'vpn-key' }}
          backgroundColor={PRIMARY_COLOR}
          onPress={this.onStandardLoginButtonPress}
        />

        <View style={styles.detailWrapperStyle}>
          <Text style={{ textAlign: 'center', color: 'white' }}>Don't have an account?&nbsp;</Text>
          <TouchableWithoutFeedback onPress={this.onSignupLoginToggle}>
            <View>
              <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Sign Up</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Render password retype button if in signup mode
  renderPasswordRetypeButton() {
    if (this.state.inSignupMode) {
      return (
        <View style={{ marginBottom: 10 }}>
          <FormLabel labelStyle={{color: DARK_GREEN}}>Retype Password</FormLabel>
          <FormInput
            placeholder="p@ssw0rd"
            placeholderTextColor={SEAFOAM_COLOR}
            secureTextEntry
            value={this.props.passwordRetype}
            onChangeText={this.onPasswordRetypeChange}
            style={styles.textInputStyle}            
          />
        </View>
      );
    }
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Get screen style (used to center activity spinner when loading)
  getScreenStyle() {
    if (this.state.showLoading) {
      return styles.spinnerStyle;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Render loading screen (if attempting a persist login) or login screen
  renderContent() {
    if (this.state.showLoading) {
      return <Spinner size="large" message="Authenticating..." />;
    }
    return (
      <ScrollView>
      <View style={styles.backgroundStyle}>

        <StatusBar
          barStyle='light-content'
        />
              
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../assets/logo.png')}
          />
        </View>    

        <View style={{ marginBottom: 10 }}>
          <FormLabel labelStyle={{color: DARK_GREEN}}>E-mail</FormLabel>
          <FormInput
            placeholder="username@apu.edu"
            placeholderTextColor={SEAFOAM_COLOR}
            value={this.props.email}
            onChangeText={this.onEmailChange}
            style={styles.textInputStyle}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <FormLabel labelStyle={{color: DARK_GREEN}}>Password</FormLabel>
          <FormInput
            placeholder="p@ssw0rd"
            placeholderTextColor={SEAFOAM_COLOR}
            secureTextEntry
            value={this.props.password}
            onChangeText={this.onPasswordChange}
            style={styles.textInputStyle}
          />
        </View>

        {this.renderPasswordRetypeButton()}

        <FormValidationMessage containerStyle={{ marginBottom: 10 }}>
          {this.props.error}
        </FormValidationMessage>

        {this.renderButtons()}
      </View>
      </ScrollView>
    );
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Main render method
  render() {
    return <View style={this.getScreenStyle()}>{this.renderContent()}</View>;
  }
}

//////////////////////////////////////////////////////////////////////////////////
// Styles object
const styles = {
  detailWrapperStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundStyle: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    backgroundColor: 'black',
    paddingBottom: 150
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 100
  },
  logo:{
    width: 250,
    height: 120
  },
  textInputStyle: {
    color: 'white'
  }
};

//////////////////////////////////////////////////////////////////////////////////
// Map redux reducers to component props.
function mapStateToProps({ auth }) {
  return {
    email: auth.email,
    password: auth.password,
    passwordRetype: auth.passwordRetype,
    error: auth.error,
    loading: auth.loading
  };
}

export default connect(mapStateToProps, actions)(AuthScreen);
