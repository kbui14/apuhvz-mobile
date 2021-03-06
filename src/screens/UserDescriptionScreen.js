import React, { Component } from "react";
import { View, Text } from "react-native";
import firebase from 'firebase';
import { Icon, FormLabel, FormInput, Button, Card } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../actions";

import { PRIMARY_COLOR } from "../constants/style";

class UserDescriptionScreen extends Component {
  //////////////////////////////////////////////////////////////////////////////////
  // Properties automatically referred to by react-navigation navigators
  static navigationOptions = ({ navigation }) => ({
    //tabBarVisible: false,
    title: navigation.state.params.user.fName + " " + navigation.state.params.user.lname,
    headerTitleStyle: {
      textAlign: "center",
      alignSelf: "center"
    },
    headerLeft: (
      <Button
        navigate={navigation.navigate}
        Medium
        icon={{ name: "chevron-left" }}
        backgroundColor={'black'}
        onPress={() => navigation.goBack()}
      />
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
    const { user } = this.props.navigation.state.params;
    if (user.status === 'Human' || user.status === 'Alpha'){
      return(
      <Card
        title='Human'
        image={{uri: user.userPhoto}}
        imageStyle={{width:300, height: 300, alignSelf: 'center'}}
      >
      <Text style={{alignSelf:'center', margin: 10}}>
        Living Area: {user.livingArea}
      </Text>
      </Card>
    )}else if(user.status ==='Moderator'){
      return(
        <Card
          title={user.status}
          image={{uri: user.userPhoto}}
          imageStyle={{width:300, height: 300, alignSelf: 'center'}}
        >
        </Card>
      )}
      else if(user.status === 'Zombie'){
        var currentDate = new Date();
        var lastFeed = new Date(user.timer);
        var difference = currentDate - lastFeed;
    
        var secDiff = difference / 1000;
        var minDiff = difference / 60 / 1000;
        var hourDiff = difference / 3600 / 1000;
        var readHour = Math.floor(hourDiff);
        var readMin = Math.floor(minDiff - 60 * readHour);

        console.log("This person's timer");
        console.log((23-readHour) + ":" + (60-readMin));
        var timerString = (23-readHour) + ":" + (60-readMin);
        return(
          <Card
            title={user.status}
            image={{uri: user.userPhoto}}
            imageStyle={{width:300, height: 300, alignSelf: 'center'}}
          >
          <Text style={{alignSelf:'center', margin: 10}}>
            Living Area: {user.livingArea}
          </Text>
          <Text style={{alignSelf:'center', margin: 10}}>
            Timer: {timerString} 
          </Text>
          </Card>
        )
      }
    else{
      return(
          <Card
            title={user.status}
            image={{uri: user.userPhoto}}
            imageStyle={{width:300, height: 300, alignSelf: 'center'}}
          >
          <Text style={{alignSelf:'center', margin: 10}}>
            Living Area: {user.livingArea}
          </Text>
          </Card>
      )}
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


export default connect(null, actions)(UserDescriptionScreen);
