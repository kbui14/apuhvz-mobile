import React, { Component } from "react";
import { View, Text, ListView } from "react-native";
import firebase from 'firebase';
import { Icon, FormLabel, FormInput, Button, List, ListItem, Divider, Card } from "react-native-elements";
import { connect } from "react-redux";
import { 
  usersFetch, 
  humanUsersCountFetch,
  alphaUsersCountFetch, 
  zombieUsersCountFetch,
  deadUsersCountFetch
} from "../actions";
import _ from 'lodash';

import { PRIMARY_COLOR } from "../constants/style";

class StatusScreen extends Component {

  //////////////////////////////////////////////////////////////////////////////////
  // Properties automatically referred to by react-navigation navigators
  static navigationOptions = ({ navigation }) => ({
    //tabBarVisible: false,
    title: "Status",
    tabBarLabel: "Status",
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
      <Icon type="font-awesome" name="users" size={25} color={tintColor} />
    )
  });



  //////////////////////////////////////////////////////////////////////////////////
  // Initialize the component
  componentWillMount() {
    // Must retrieve User data

    this.props.usersFetch();
    this.props.humanUsersCountFetch();
    this.props.alphaUsersCountFetch();
    this.props.zombieUsersCountFetch();
    this.props.deadUsersCountFetch();

    this.createDataSource(this.props)
  }



  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props
    //console.log("Testing next props: " + nextProps);
    this.createDataSource(nextProps);

  }

  createDataSource({ users }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    //console.log('in createDataSource')
    //console.log(users.fName);
    this.dataSource = ds.cloneWithRows(users);
    //console.log(this.dataSource);
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Handler for the serach button
  onButtonPress = (user) => {

    console.log('button pressed!');
    this.props.navigation.navigate('userDescription', { user });
    //this.props.fetchPlaces(this.state.place, this.state.location, () => {
      //this.props.navigation.navigate("searchResults"); // Passing a callback function
    //});
  };

  renderContent(users) {
    var user = firebase.auth().currentUser;
    if (!user.emailVerified) {
      return <Text>You still need to verify your email! Please check your email.</Text>;
    }
    return (
      <List>
        <Text h1 style={{ textAlign: "center", marginTop: 10 }}>
          Humans: {this.props.humanCount + this.props.alphaCount}
        </Text>
        <Divider style={{ backgroundColor: PRIMARY_COLOR }} />
        <ListView
          enableEmptySections
          renderRow={this.renderHumanRow}
          dataSource={this.dataSource}
        />
        <Text h1 style={{ textAlign: "center", marginTop: 10 }}>
          Zombies: {this.props.zombieCount}
        </Text>
        <Divider style={{ backgroundColor: PRIMARY_COLOR }} />
        <ListView
          enableEmptySections
          renderRow={this.renderZombieRow}
          dataSource={this.dataSource}
        />
         <Text h1 style={{ textAlign: "center", marginTop: 10 }}>
          Dead: {this.props.deadCount}
        </Text>
        <Divider style={{ backgroundColor: PRIMARY_COLOR }} />
        <ListView
          enableEmptySections
          renderRow={this.renderDeadRow}
          dataSource={this.dataSource}
        />
      </List>
    );
  }

  renderHumanRow = (user , sectionID) => {
    //console.log('Section ID: ' + rowID);
    //console.log("User Data: ")
    //console.log(user);
    //console.log(fName);
    //console.log("in renderRow");
    const { fName, lname, status, userPhoto } = user;


    // if status === alpha || human
    // human counter ++;
    // return list item with subtitle = human

    if (status === 'Human' || status === 'Alpha'){
      //this.state.humanCount = this.state.humanCount + 1;
      //console.log("human Count: " + this.state.humanCount);
      //this._humanCounter();
      //console.log("human counter: " + this.state.humanCount);
      return (<ListItem
                roundAvatar
                key={sectionID}
                title={fName + " " + lname}
                subtitle='Human'
                onPressRightIcon={(event) => {
                  const { navigate } = this.props.navigation;
                  navigate('userDescription', { user: user });
                }}
                avatar={{uri: userPhoto}}                
              />
    )}
    return null;
  }

  renderZombieRow (user, sectionID){
    //console.log('Section ID: ' + sectionID);
    //console.log("User Data: ")
    //console.log(this.props.humanCount);
    //console.log(user);
    //console.log(fName);
    //console.log("in renderRow");
    const { fName, lname, status } = user;


    // if status === alpha || human
    // human counter ++;
    // return list item with subtitle = human

    if (status === 'Zombie'){

      return (<ListItem
        roundAvatar
        key={sectionID}
        title={fName + " " + lname}
        subtitle='Zombie'
        onPressRightIcon={(event) => {
          const { navigate } = this.props.navigation;
          navigate('userDescription', { user: user });
        }}
              />

    )}
    return null;
  }

  renderDeadRow (user, sectionID){

    const { fName, lname, status } = user;

    if (status === 'Dead'){

      return (<ListItem
        roundAvatar
        key={sectionID}
        title={fName + " " + lname}
        subtitle='Dead'
        onPressRightIcon={(event) => {
          const { navigate } = this.props.navigation;
          navigate('userDescription', { user: user });
        }}
              />
    )}
    return null;
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Render method
  render() {
    //console.log(this.props.users.fName);
    return (
      <View>
        {this.renderContent()}
      </View>
    );
  }
}

function mapStateToProps({ users }){
  return {
    humanCount: users.humanCount,
    alphaCount: users.alphaCount,
    zombieCount: users.zombieCount,
    deadCount: users.deadCount,
    users: users.user
  }
}

export default connect(mapStateToProps, { usersFetch, humanUsersCountFetch, alphaUsersCountFetch, zombieUsersCountFetch, deadUsersCountFetch })(StatusScreen);