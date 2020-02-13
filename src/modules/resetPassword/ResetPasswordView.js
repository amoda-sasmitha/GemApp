import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Platform,
  Alert,
  ToastAndroid,
  BackHandler,
  StatusBar,
  TextInput,
  Keyboard,
  LayoutAnimation,
} from 'react-native';

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';
import Icon from 'react-native-vector-icons/Entypo';
import Loading from 'react-native-loading-spinner-overlay'
import { Button } from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import firebase from '../../config/firebase';

export default class ResetPassword extends React.Component {

  state = {
    email : '',
    isKeyboardVisible: false,
    isloading : false,
  };

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      Platform.select({ android: 'keyboardDidShow', ios: 'keyboardWillShow' }),
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      Platform.select({ android: 'keyboardDidHide', ios: 'keyboardWillHide' }),
      this._keyboardDidHide.bind(this),
    );

  }

  _keyboardDidShow() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: true });
  }

  _keyboardDidHide() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: false });
  }

  sendResetPassword =  () => {

    this.setState({isloading : true});
    const {navigation, position} = this.props
    var auth = firebase.auth();

    auth.sendPasswordResetEmail(this.state.email).then( () => {
        this.setState({isloading : false});
        Alert.alert( "Reset Password" , "Email sent successfully to your email account" ,  [ {
          text: 'Continue',
          onPress: () => {  navigation.navigate({ routeName: 'Auth' })}
        
      }, ], {
          cancelable: false
      } );
    
    }).catch( (error) => {
      this.setState({isloading : false});
      if(Platform.OS === 'ios' ){
        Alert.alert( 'Error' , error.message );
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

  render() {
    const B = (props) => <Text style={{fontWeight: 'bold' , opacity : 1 }}>{props.children}</Text>
    const padding = (this.state.isKeyboardVisible) ? 6 : 40;
   
    return(
      <View style={styles.container}>
         <Loading visible={this.state.isloading}   ></Loading>
         <StatusBar  backgroundColor="#FFFFFF" barStyle='dark-content' />
      <ImageBackground 
      source={require('../../../assets/images/resetpasswordback.png')}
       style={styles.bgImage}
       resizeMode="cover"
     >
         <View>
            <Button
           style={styles.closeButton}
           action
           bgColor={'#F6F6F6' }
           onPress={() => {
             this.props.navigation.navigate({ routeName: 'Auth' })
           }}
         >
           <Text>
             <Icon name="cross" size={28} color={ colors.darkGray}/>
           </Text>
         </Button>
         </View>

       <View style={[styles.main , {    paddingTop : hp(padding)   } ]} >
       <Text  bold style={styles.title}>
         Forgot Password ?
         </Text>
       <Text  style={styles.description}>
        Enter your email address to reset your password
         </Text>
       
                <TextInput style={styles.inputs}
                placeholder="Email Address"
                secureTextEntry={false}
                underlineColorAndroid='transparent'
                onChangeText={(email) =>  this.setState({email})   }
                 />
          
        
       </View>
         <Button
           style={styles.demoButton}
           primary
           caption="Reset Password"
           onPress={this.sendResetPassword}
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
    backgroundColor : '#FFFFFF',
    justifyContent : 'flex-start'
  },
  title: {
    marginHorizontal : wp(8),
    marginBottom : hp(1),
    color: colors.darkGray,
    opacity : 0.8,
    fontSize : wp(5.8) ,
  },
  description: {
    marginHorizontal : wp(8),
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
  
  },
  demoButton : {
    marginTop : hp(4.5),
    marginHorizontal : wp(8),
    borderRadius : 10 ,
  },
  closeButton : {
    alignSelf : "flex-start",
    justifyContent : 'flex-start',
    marginHorizontal : hp(1.5),
    marginTop : hp(4)
  },
  inputs : {
  
    paddingHorizontal : 10, 
    paddingVertical : 8 ,
    color : "#34495e",
    borderRadius : 6,
    borderWidth : 1.5,
    borderColor : "#F4F4F4",
    backgroundColor : "#FFFFFF",
    fontSize : 15,
    marginHorizontal : wp(8),
    marginTop : hp(2),
  }
  ,
 
});