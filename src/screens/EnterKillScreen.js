import React, { Component } from "react";
import { View, Text } from "react-native";
import { Icon, FormLabel, FormInput, Button } from "react-native-elements";
import { connect } from "react-redux";
import { 
  enterKill,
  onTextChange,
  usersFetch
} from "../actions";
import { PRIMARY_COLOR, DARK_GREEN, SEAFOAM_COLOR } from "../constants/style";

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
    this.props.usersFetch();
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Handler for the serach button
  onButtonPress = () => {
    console.log('Testing the pid here')
    this.props.enterKill(this.props.killCode);


    //this.props.fetchPlaces(this.state.place, this.state.location, () => {
      //this.props.navigation.navigate("searchResults"); // Passing a callback function
    //});
  };

  onKillCodeTextChange = text => {
    this.props.onTextChange(text);
  };

  renderContent(users){
    return(
      <View>
      <FormLabel labelStyle={{color: DARK_GREEN}}>Enter Kill Code</FormLabel>
      <FormInput
        placeholder="2a5ji1"
        placeholderTextColor={SEAFOAM_COLOR}
        value={this.props.killCode}
        onChangeText={this.onKillCodeTextChange}
        style={{color : 'black', marginBottom: 10}}            
      />
    <Button 
    title='Kill Player'
    onPress={this.onButtonPress}
    backgroundColor={PRIMARY_COLOR}
    />
    </View>
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

function mapStateToProps({ users }){
  return {
    killCode: users.killCode,
    users: users.user
  }
}

export default connect(mapStateToProps, {enterKill, onTextChange, usersFetch})(EnterKillScreen);
