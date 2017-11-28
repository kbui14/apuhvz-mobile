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
  ScrollView,
  Switch,
  TouchableOpacity,
  Modal
 } from 'react-native';
import { Button, FormValidationMessage, FormLabel, FormInput } from 'react-native-elements'; // Using the Button that Grissom used from this library.
import { Container, ActionSheet, Root } from "native-base";
import Exponent, {
  Constants,
  ImagePicker,
  registerRootComponent
} from 'expo';
import base64 from 'base-64';
import { Card, CardSection, Input, Spinner } from '../components';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { PRIMARY_COLOR } from '../actions/types';
import { SEAFOAM_COLOR, DARK_GREEN } from '../constants/style';
import * as api from '../constants/api_keys';

class AdditionalSignUpScreen extends Component {

      state = {
        alphaSwitch: false,
        agreeSwitch: false,
        pickerValue: 'Adams',
        progress: 1,
        avatarSource: null,
        modalVisible: false,
        selectedImage: null
      }

      componentWillUnmount() {
        ActionSheet.actionsheetInstance = null;
  }

      _renderModalButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.modalStyle}>
            <Text style={{color: 'white'}}>{text}</Text>
          </View>
        </TouchableOpacity>
      );

      _renderModalCloseButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.modalStyle}>
            <Text>{text}</Text>
          </View>
        </TouchableOpacity>
      );

      _renderModalContent = () => (
        <View style={styles.modalContent}>
          <Text>Hello!</Text>
          {this._renderModalCloseButton('Close', () => this.setState({ modalVisible: false }))}
        </View>
      );

      _handleToggleAlphaSwitch = () => this.setState(state => ({
        alphaSwitch: !this.state.alphaSwitch
      }));

      _handleToggleAgreeSwitch = () => this.setState(state => ({
        agreeSwitch: !this.state.agreeSwitch
      }));

      _pickImageSource = () => {
        try {
          ActionSheet.show({
            options: [
              "Take Photo", "Pick From Album", "Cancel"
            ],
            cancelButtonIndex: 2,
            title: "Choose your Profile Picture"
          }, buttonIndex => {
            // this buttonIndex value is a string on andriod and a number on ios
            console.log(buttonIndex)
            if (buttonIndex + "" === '0') {
              this._pickImage(true)
            } else if (buttonIndex + "" === '1') {
              this._pickImage(false)
            } else {
              console.log('nothing')
            }
          })
        } catch (ee) {
          console.log(ee)
        }
      }

      _pickImage = async (useCamera) => {

        console.log('in pick image')
        var pickerResult

        if (useCamera) {
          pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: (Platform.OS === 'ios'),
            quality: .8,
            aspect: [1,1],
            noData: false,
            base64: true
          });
        } else {
          pickerResult = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: .8, base64: true});
        }

        if (pickerResult.cancelled)
          return;
        //let byteArray = this.convertToByteArray(pickerResult.base64);
        console.log(base64.encode(pickerResult));
        actions.uploadAsByteArray(base64.encode(pickerResult), (progress) => {
          console.log(progress)
          this.setState({ progress })
        })

        /**
         * This is suppose to be where I upload the byteArray to firebase.
         * This example has it in the api keys, but I need to do this in our auth actions.
         * 
         *     api.uploadAsByteArray(byteArray, (progress) => {
                console.log(progress)
                this.setState({ progress })
                })
         * 
         */
      }

      convertToByteArray = (input) => {
        console.log('in convertToByteArray:')
        //console.log(input);
        var binary_string = this.atob(input);
        //console.log(binary_string);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        console.log('bytes:' + bytes);
        for (var i = 0; i < len; i++) {
          bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes
      }

      atob = (input) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        let str = (""+input)
          .replace(/=+$/, '')
          .replace(/^data:image\/(png|jpg);base64,/,'');
        let output = '';

        // if (str.length % 4 == 1) {   throw new Error("'atob' failed: The string to be
        // decoded is not correctly encoded."); }
      
        for (let bc = 0, bs = 0, buffer, i = 0; buffer = str.charAt(i++); ~buffer && (bs = bc % 4
        ? bs * 64 + buffer
        : buffer, bc++ % 4)
        ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6))
        : 0) {
          buffer = chars.indexOf(buffer);
        }
        return output;
      }

      onButtonPressFinish = () => {
        /*console.log(
          'fname: ' + this.props.fname,
          'lname: ' + this.props.lname,
          'livingArea: ' + this.state.pickerValue,
          'alpha: ' + this.state.alphaSwitch,
          'agree' + this.state.agreeSwitch
        )*/
        this.props.finishSignup(this.props.fname, this.props.lname, this.state.pickerValue, this.state.alphaSwitch, null, this.state.agreeSwitch);
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
            onPress={this.onButtonPressFinish}
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
          <Root>
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

            <View>
              <Text style={{ color: 'white', fontSize: 14, flex: 1 }}>
              Would you like to be selected for Alpha Zombie?
              </Text>
              <Switch
                onValueChange={this._handleToggleAlphaSwitch}
                value={this.state.alphaSwitch}
                style={{alignSelf: 'flex-end', flexDirection: 'row'}}
              />
              
            </View>

            {/*<Button
              title="Upload Profile Picture"
              //icon={{ name: 'vpn-key' }}
              backgroundColor={PRIMARY_COLOR}
              onPress={this._pickImageSource}
            />*/}
            <View>
                {this._renderModalButton('I agree', () => this.setState({ modalVisible: true }))}
                <Modal visible={this.state.modalVisible}> 
                  {this._renderModalContent()}
                </Modal>
                <Switch
                  onValueChange={this._handleToggleAgreeSwitch}
                  value={this.state.agreeSwitch}
                  style={{alignSelf: 'flex-end', flexDirection: 'row'}}
                />
              </View>

            <FormValidationMessage containerStyle={{ marginBottom: 10 }}>
              {this.props.error}
            </FormValidationMessage>
    
                {this.renderButton()}
          </View>
          </ScrollView>
          </Root>
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
      },
      modalStyle: {
        backgroundColor: SEAFOAM_COLOR,
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)'
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)'
      }
    });

    function mapStateToProps({ auth }) {
      return {
        email: auth.email,
        password: auth.password,
        passwordRetype: auth.passwordRetype,
        error: auth.error,
        loading: auth.loading,
        fname: auth.fname,
        lname: auth.lname,
        livingArea: auth.livingArea
      };
    }
    
    export default connect(mapStateToProps, actions)(AdditionalSignUpScreen);