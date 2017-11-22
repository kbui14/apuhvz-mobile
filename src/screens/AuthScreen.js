import React, { Component, Children } from 'react';
import { View, Text, TouchableWithoutFeedback, StatusBar, Image } from 'react-native';
import firebase from 'firebase';
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
  state = { inSignupMode: false, showLoading: true }; // Just for local use

  //////////////////////////////////////////////////////////////////////////////////
  // Register the event which detects a change of state in the logged-in user
  componentWillMount() {
    //this.props.loading = true;

    // Check if user is persisted and "login" by navigating to main if so
    if (firebase.auth().currentUser) {
      console.log(`${firebase.auth().currentUser.email} already logged in.`);
      return this.props.navigation.navigate('main'); // Navigate to main page
    }

    //console.log(this.props.navigation.state.params);

    // Listen for authentication state to change.
    firebase.auth().onAuthStateChanged(user => {
      // Show login screen b/c firebase has just authenticated/denied user
      this.props.loading = false;
      this.setState({ showLoading: this.props.loading }); // Retrigger components

      console.log('onAuthStateChanged()');
      if (user) {
        // Print out debug info
        console.log('--We are authenticated now!');
        console.log(`--Display Name: ${user.displayName}`);
        console.log(`--Email: ${user.email}`);
        //console.log(`--Provider: ${user.providerId}`);
        console.log(`--uid: ${user.uid}`);

        // Navigate to main page
        this.props.navigation.navigate('main');
        return;
      }

      this.props.navigation.navigate('auth');
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
  onStandardSignupButtonPress = () => {
    
    this.props.navigation.navigate('sign');
    // Uncomment this when we are ready to create user through sign up page.
    //const { email, password, passwordRetype } = this.props;
    //this.props.signupUser(email, password, passwordRetype);
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
    alignSelf: 'stretch',
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 100,
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
