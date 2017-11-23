import React, { Component } from 'react';
import { 
  View,
  Text, 
  StyleSheet, 
  StatusBar, 
  Image, 
  Picker, 
  Platform,
  TouchableWithoutFeedback,
  ScrollView
 } from 'react-native';
import { Button, FormValidationMessage, FormLabel, FormInput } from 'react-native-elements'; // Using the Button that Grissom used from this library.
import { Card, CardSection, Input, Spinner } from '../components';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { PRIMARY_COLOR } from '../actions/types';
import { SEAFOAM_COLOR, DARK_GREEN } from '../constants/style';

class AdditionalSignUpScreen extends Component {

      onButtonPressFinish() {
        this.props.finishSignup();
      }

      //////////////////////////////////////////////////////////////////////////////////
      // Update the property when changed
      onLivingAreaChange = (prop, value) => {
        this.props.userUpdate(prop, value);
        this.setState({prop: value})
        console.log(value);        
      };

      onFirstNameChange = text =>{
        this.props.fNameChanged(text);
      };

      onLastNameChange = text =>{
        this.props.lNameChanged(text);
      };
    
      renderButton() {
        if (this.props.loading) {
          return <Spinner size="large" />;
        }
        return (
          <View>
          <Button
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
          <ScrollView>
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

            <View style={{ marginBottom: 10 }}>
              <FormLabel labelStyle={{color: DARK_GREEN}}>First Name</FormLabel>
                <FormInput
                  placeholder="First Name"
                  placeholderTextColor={SEAFOAM_COLOR}
                  value={this.props.fname}
                  onChangeText={this.onFirstNameChange}
                  style={styles.textInputStyle}
                  />
            </View>

            <View style={{ marginBottom: 10 }}>
              <FormLabel labelStyle={{color: DARK_GREEN}}>Last Name</FormLabel>
                <FormInput
                  placeholder="Last Name"
                  placeholderTextColor={SEAFOAM_COLOR}
                  value={this.props.lname} //
                  onChangeText={this.onLastNameChange} //
                  style={styles.textInputStyle}
                />
            </View>
    

          <Text style={styles.pickerTextStyle}>Living Area</Text>
        
          

          {/* This is the Picker for Living Areas.
              Issue: It does not change values

              Update: I was able to fix the issue, but it is not usind redux...
          */}

            <Picker
              style={{ flex: 1 }}
              selectedValue={this.state && this.state.pickerValue}
              onValueChange={(value) => this.setState({pickerValue: value})}
              itemStyle={{color: 'white'}}
            >
              <Picker.Item label="Adams" value="Adams" />
              <Picker.Item label="Engstrom" value="Engstrom" />
              <Picker.Item label="Smith" value="Smith" />
              <Picker.Item label="Trinity" value="Trinity" />
              <Picker.Item label="Alosta" value="Alosta" />
              <Picker.Item label="Bowles" value="Bowles" />
              <Picker.Item label="Shire Mods" value="Shire Mods" />
              <Picker.Item label="University Park" value="University Park" />
              <Picker.Item label="University Village" value="University Village" />
            </Picker>
            


        <FormValidationMessage containerStyle={{ marginBottom: 10 }}>
              {this.renderError()}
        </FormValidationMessage>
    
                {this.renderButton()}
          </View>
          </ScrollView>
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
      },
      pickerTextStyle: {
        fontSize: 18,
        paddingLeft: 20,
        color: DARK_GREEN
      },
      textInputStyle: {
        color: 'white'
      }
    });

    function mapStateToProps({ auth }) {
      return {
        email: auth.email,
        password: auth.password,
        passwordRetype: auth.passwordRetype,
        error: auth.error,
        loading: auth.loading,
        livingArea: auth.livingArea
      };
    }
    
    export default connect(mapStateToProps, actions)(AdditionalSignUpScreen);