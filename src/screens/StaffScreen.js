import React, { Component } from "react";
import { View, Text } from "react-native";
import firebase from 'firebase';
import { Icon, FormLabel, FormInput, Button } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../actions";

import { PRIMARY_COLOR } from "../constants/style";

class StaffScreen extends Component {
  //////////////////////////////////////////////////////////////////////////////////
  // Properties automatically referred to by react-navigation navigators
  static navigationOptions = ({ navigation }) => ({
    //tabBarVisible: false,
    title: "Staff",
    tabBarLabel: "Staff",
    headerTitleStyle: {
      textAlign: "center",
      alignSelf: "center"
    },
    headerLeft: (
      <Button
        navigate={navigation.navigate}
        Medium
        icon={{ name: "menu" }}
        backgroundColor={'black'}
        onPress={() => navigation.navigate("DrawerOpen")}
      />
    ),
    drawerIcon: ({ tintColor }) => (
      <Icon type="font-awesome" name="user" size={25} color={tintColor} />
    )
  });



  //////////////////////////////////////////////////////////////////////////////////
  // Initialize the component
  componentWillMount() {
    // ***DTG - JUST FOR TESTING SO I DON"T HAVE TO KEEP TYPING THIS IN
    //this.setState({ place: "McDonalds" });
    //this.setState({ location: "Azusa, CA" });
    // Upon loading the app, load any static resources...
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Handler for the serach button
  onButtonPress = () => {


    
    //this.props.fetchPlaces(this.state.place, this.state.location, () => {
      //this.props.navigation.navigate("searchResults"); // Passing a callback function
    //});
  };

  renderContent() {
    var user = firebase.auth().currentUser;
    console.log('emailVerified: ' + user.emailVerified);
    if (!user.emailVerified) {
      return <Text>You still need to verify your email! Please check your email.</Text>;
    }
    return (
      <Text>
        Staff Page... Coming Soon!
      </Text>
    );
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Render method
  render() {
    return (
      <View>
        {this.renderContent()}
      </View>
    );
  }
}

export default connect(null, actions)(StaffScreen);