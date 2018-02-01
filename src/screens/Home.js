import React, { Component } from "react";
import { View, Text, WebView, Platform } from "react-native";
import { Icon, FormLabel, FormInput, Button, Card } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../actions";

import { PRIMARY_COLOR } from "../constants/style";

class Home extends Component {
  //////////////////////////////////////////////////////////////////////////////////
  // Properties automatically referred to by react-navigation navigators
  static navigationOptions = ({ navigation }) => ({
    //tabBarVisible: false,
    title: "Home",
    tabBarLabel: "Home",
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
      <Icon type="font-awesome" name="home" size={25} color={tintColor} />
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

  //////////////////////////////////////////////////////////////////////////////////
  // Render method
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'black'}}>
        <WebView 
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{uri: 'https://www.youtube.com/embed/rUu--x0Y6Z0' }}
          style={{flex:1, width: 350, height: 250, alignSelf: 'center'}}
        />

        <Text style={{ color: 'white', fontFamily: Platform.OS === 'ios' ?'Helvetica' : 'Roboto', fontSize: 20, margin: 10}}>
          APU HVZ is a game where friendships are made and the APU community grows.  
          This game is student run and organized for you.  
          The Moderators that run the APU HVZ game put in their own time to make 
          this a possibility every year and hope that you enjoy the game!  Happy Hunting!
        </Text>

      </View>
    );
  }
}

export default connect(null, actions)(Home);
