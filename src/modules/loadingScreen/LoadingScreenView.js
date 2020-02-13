// @flow
import React from 'react';
import {
  View,
  Text
} from 'react-native-ui-lib';
import { ActivityIndicator ,Alert } from 'react-native';
import firebase from '../../config/firebase';

export default class LoadingScreen extends React.Component {

  state = {
    userdata : {},
    routeName : '',

  };


  componentWillMount() {
    
    var unsubscribe = firebase.auth().onAuthStateChanged(user => {
    
    if(user ){
      this.setState({userdata : user});

      if( user.displayName != null && user.emailVerified ){
       
        this.setState({ routeName : "Main" })
      }

      if( ( !user.emailVerified )  &&  user.displayName != null  ){
        this.setState({ routeName : "Emailverify" })
        
      }

    }else{
      this.setState({ routeName : "Auth" })
      
    }

    unsubscribe();
    console.log(this.state.routeName);
    if( this.state.routeName != '' ){
    this.props.navigation.navigate( this.state.routeName , { userdata : this.state.userdata } );
    }
    
    });

    
   
    
  }

  render() {
    return (
      <View flex centerV centerH style={{   flexDirection : 'row'}}>
      <Text>Loading... </Text>
     <ActivityIndicator size={25} color={'#000'}></ActivityIndicator>
    </View>
    );
  }
 
}
