import React, { Component } from "react";
import { View, Text, Linking } from "react-native";
import { Icon, FormLabel, FormInput, Button } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../actions";

import { PRIMARY_COLOR } from "../constants/style";

class FaceBookScreen extends Component {
  //////////////////////////////////////////////////////////////////////////////////
  // Properties automatically referred to by react-navigation navigators
  static navigationOptions = ({ navigation }) => ({
    //tabBarVisible: false,
    title: "Facebook",
    tabBarLabel: "Facebook",
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
      <Icon type="font-awesome" name="facebook-official" size={25} color={tintColor} />
    )
  });


  //////////////////////////////////////////////////////////////////////////////////
  // Initialize the component
  componentWillMount() {
    var url = "https://www.facebook.com/apu.hvz";
    Linking.openURL(url)
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
      <View>
        <Text>
          Redirecting to Facebook...
        </Text>

      </View>
    );
  }
}

export default connect(null, actions)(FaceBookScreen);
