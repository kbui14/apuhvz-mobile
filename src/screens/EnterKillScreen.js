import React, { Component } from "react";
import { View, Text } from "react-native";
import { Icon, FormLabel, FormInput, Button } from "react-native-elements";
import { connect } from "react-redux";
import { 
  enterKill
} from "../actions";
import { PRIMARY_COLOR } from "../constants/style";

class EnterKillScreen extends Component {
  //////////////////////////////////////////////////////////////////////////////////
  // Properties automatically referred to by react-navigation navigators
  static navigationOptions = ({ navigation }) => ({
    //tabBarVisible: false,
    title: "Enter Kill",
    tabBarLabel: "Enter Kill",
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
      <Icon type="font-awesome" name="edit" size={25} color={tintColor} />
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
    this.props.enterKill();


    //this.props.fetchPlaces(this.state.place, this.state.location, () => {
      //this.props.navigation.navigate("searchResults"); // Passing a callback function
    //});
  };

  //////////////////////////////////////////////////////////////////////////////////
  // Render method
  render() {
    return (
      <View>
        <Text>
          Enter Kill Page... Coming soon!
        </Text>
        <Button 
        title='Kill Player'
        onPress={this.onButtonPress}
        backgroundColor={PRIMARY_COLOR}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps, {enterKill})(EnterKillScreen);
