import React, { Component } from 'react';
import { 
  View,
  Text, 
  StyleSheet, 
  StatusBar, 
  Image, 
  Picker, 
  PickerIOS,
  Platform
 } from 'react-native';
import { Button } from 'react-native-elements'; // Using the Button that Grissom used from this library.
import { Card, CardSection, Input, Spinner } from '../components';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { PRIMARY_COLOR } from '../actions/types';

class AdditionalSignUpScreen extends Component {

      onButtonPressFinish() {
        this.props.finishSignup();
      }
    
      renderButton() {
        if (this.props.loading) {
          return <Spinner size="large" />;
        }
        return (
          <View>
            <Button                                           // This is a possible issue because it is not appearing the same way the Auth Screen buttons do.
              title="Finish"              
              //icon={{ name: 'vpn-key' }}
              backgroundColor={PRIMARY_COLOR}
              //onPress={this.onStandardSignupButtonPress}
            />
          </View>
    
      );
    }
      renderError() {
        if (this.props.error) {
          return (
            <View style={{ backgroundColor: 'black' }}>
              <Text style={styles.errorTextStyle}>
                {this.props.error}
              </Text>
            </View>  
          );
        }
      }

      renderSignUp() {
            
            // living area
            // alpha zombie
            // image upload
            // finish
        
          }
    
      render() {
        return (
          <View style={styles.backgroundContainer}>
            
            <StatusBar
              barStyle='light-content'
            />
    
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require('../../assets/logo.png')}
                />
            </View>
    
            <Card>

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.pickerTextStyle}>Living Area</Text>
        
          

          {/* This is the Picker for Living Areas. The issue with this is that it does not change colors nor does it stay fit above the Finish Button which may be a flex issue.

            <PickerIOS
            style={{ flex: 1}}
            selectedValue={this.props.shift}
            onValueChange={value => this.props.AdditionalSignUpScreen({ prop: 'Living area', value })}
          >
            <PickerIOS.Item label="Adams" value="Adams" />
            <PickerIOS.Item label="Engstrom" value="Engstrom" />
            <PickerIOS.Item label="Smith" value="Smith" />
            <PickerIOS.Item label="Trinity" value="Trinity" />
            <PickerIOS.Item label="Alosta" value="Alosta" />
            <PickerIOS.Item label="Bowles" value="Bowles" />
            <PickerIOS.Item label="Shire Mods" value="Shire Mods" />
            <PickerIOS.Item label="University Park" value="University Park" />
            <PickerIOS.Item label="University Village" value="University Village" />
          </PickerIOS>
          */}
        </CardSection>
    
              {this.renderError()}
    
              <CardSection style={styles.cardContainer}>
                {this.renderButton()}
              </CardSection>
            </Card>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
      },
      backgroundContainer: {
        flex: 1,
        backgroundColor: 'black'
      },
      container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 2
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row'
      },
    logoContainer: {
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'center',
      padding: 100
    },
    logo:{
      width: 250,
      height: 120
    },
    cardContainer: {
      borderBottomWidth: 0,
      paddingTop: 25
    },
    inputStyle: {
      color: 'white',
      paddingRight: 5,
      paddingLeft: 5,
      fontSize: 18,
      lineHeight: 23,
      flex: 2
    }
    });

    function mapStateToProps({ auth }) {
      return {
        email: auth.email,
        password: auth.password,
        passwordRetype: auth.passwordRetype,
        error: auth.error,
        loading: auth.loading
      };
    }
    
    export default connect(mapStateToProps, actions)(AdditionalSignUpScreen);