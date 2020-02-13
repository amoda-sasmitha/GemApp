// @flow
import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Platform,
  Alert,
  ToastAndroid,
  BackHandler,
  StatusBar
} from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';
import Icon from 'react-native-vector-icons/Entypo';

import { Button } from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import firebase from '../../config/firebase';

export default class EmailVerifyScreen extends React.Component {
  
  state = {
    user : null,
    email : '',
  }



  componentWillMount(){
   const user = firebase.auth().currentUser;
   this.setState({user});
   this.setState({email : user.providerData[0].email });
   BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
   
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }


  handleBackButton = () => {
    if (!this.props.navigation.isFocused()) {
      // The screen is not focused, so don't do anything
      return false;
    }
   
    Alert.alert(
      'Exit App',
      'Exiting the application?', [{
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
      }, {
          text: 'OK',
          onPress: () => BackHandler.exitApp()
      }, ], {
          cancelable: false
      }
   )
   return true;
    
  }

  sendEmail =  () => {
    const user = this.state.user;
    user.sendEmailVerification().then( () => {
      if(Platform.OS === 'ios' ){
        Alert.alert("Verification Email sent successfully" );
     }else{
      ToastAndroid.showWithGravityAndOffset(
        "Verification Email sent successfully" ,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      ); 
      }
    }).catch( error => {
      if(Platform.OS === 'ios' ){
        Alert.alert( error.message );
     }else{
      ToastAndroid.showWithGravityAndOffset(
        error.message ,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      ); 
      }

    });
  }

  render(){
    const B = (props) => <Text style={{fontWeight: 'bold' , opacity : 1 }}>{props.children}</Text>
    return(
    <View style={styles.container}>
      <StatusBar  backgroundColor="#D8D8D8" barStyle='dark-content' />
       <ImageBackground 
        source={require('../../../assets/images/emailverifyback.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        
          <View>
             <Button
            style={styles.closeButton}
            action
            bgColor={'#F6F6F6' }
            onPress={() => {
              this.props.navigation.navigate({ routeName: 'Main' })
            }}
          >
            <Text>
              <Icon name="cross" size={28} color={ colors.darkGray}/>
            </Text>
          </Button>
          </View>

        <View style={styles.main}>
        <Text  bold style={styles.title}>
          Verify Email
          </Text>
        <Text  style={styles.description}>
    An Email has been sent to your email address  <B>{ this.state.email}</B> {'\n'}
        Please click on that link to verify your email address
          </Text>
         
        </View>
          <Button
            style={styles.demoButton}
            primary
            caption="Resend Email"
            onPress={this.sendEmail }
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : '#FFFFFF',
   
  },
  bgImage: {
    flex: 1,
    //justifyContent : 'flex-start'
  },
  title: {
    marginHorizontal : wp(12),
    marginBottom : hp(1),
    color: colors.darkGray,
    opacity : 0.8,
    fontSize : wp(5.8) ,
  },
  description: {
    marginHorizontal : wp(12),
    color: colors.darkGray,
    opacity : 0.8,
    lineHeight: hp(3.4) ,
    fontSize : wp(4.6) ,
  },
  main : {
   //backgroundColor : colors.primaryLight,
   
    width : wp(100),
    alignSelf : "flex-start",
    justifyContent : 'flex-end',
    paddingTop : hp(40),
  },
  demoButton : {
    marginTop : hp(4.5),
    marginHorizontal : wp(12),
    opacity : 0.85,
    borderRadius : 10 ,
  },
  closeButton : {
    alignSelf : "flex-start",
    justifyContent : 'flex-start',
    margin : hp(1.5),
  }
});


