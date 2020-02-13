import React from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Animated,
  Keyboard,
  Platform,
  LayoutAnimation,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid,
  StatusBar,
  BackHandler,
  Alert,
  Button as NormalButton
} from 'react-native';
import { LoginButton, AccessToken , LoginManager} from 'react-native-fbsdk';
import Firebase from 'firebase';
import firebase from '../../config/firebase';
import { fonts, colors } from '../../styles';
import { TextInput, Button } from '../../components';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const FORM_STATES = {
  LOGIN: 0,
  REGISTER: 1,
  LOADING : 2,
};

export default class AuthScreen extends React.Component {
  state = {
    anim: new Animated.Value(0),
    password:  '',
    email : '',
    username : '',
    disabled : true,
    // Current visible form
    formState: FORM_STATES.LOGIN,
    isKeyboardVisible: false,
  };

   async componentWillMount() {
   
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.keyboardDidShowListener = Keyboard.addListener(
      Platform.select({ android: 'keyboardDidShow', ios: 'keyboardWillShow' }),
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      Platform.select({ android: 'keyboardDidHide', ios: 'keyboardWillHide' }),
      this._keyboardDidHide.bind(this),
    );

    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // google services are available
    } catch (err) {
      console.log('play services are not available');
    }

  }

  
  componentDidMount() {
    Animated.timing(this.state.anim, { toValue: 3000, duration: 3000 }).start();
    GoogleSignin.configure({
      webClientId: '640695683031-v7vdd4ld38b9ojuv7ht3660u2350j84p.apps.googleusercontent.com', 
      offlineAccess: true, 
      hostedDomain: '', 
      forceConsentPrompt: true, 
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    
  }

  _keyboardDidShow() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: true });
  }

  _keyboardDidHide() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: false });
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

  fadeIn(delay, from = 0) {
    const { anim } = this.state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [delay, Math.min(delay + 500, 3000)],
            outputRange: [from, 0],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  }

  validateUser = () => {
    let { formState  } = this.state;
    if( formState == FORM_STATES.LOGIN ){
      this.logInUser();
    }else if( formState == FORM_STATES.REGISTER ){
      this.registerUser();
    }
  }

  registerUser = () => {

    let {  email , password , username } = this.state;
    this.setState({formState: 2  });

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((authdata) => {   
      var user = firebase.auth().currentUser;
      return user.updateProfile({
        displayName: username
      });
    
    }).then(() => {
      var user = firebase.auth().currentUser;
      return user.sendEmailVerification();

    }).then(  () => {
      this.props.navigation.navigate({ routeName: 'addServices' });

    })
    .catch((error) => {
      this.setState({formState: 1 });// use setState
      Alert.alert( "Error" , error.message );
    });
  }

  logInUser = () => {
    let { formState , email , password } = this.state;
    this.setState({formState: 2  });
    firebase
      .auth()
      .signInWithEmailAndPassword( email ,password )
      .then((data) => {
        (data.user.emailVerified) ?      
         this.props.navigation.navigate({ routeName: 'Main' }) :
         this.props.navigation.navigate({ routeName: 'Emailverify' })
        //this.setState({formState: 0 });
      })
      .catch((error) => {
        this.setState({formState: 0 });// use setState
        var errormessage =  'Something wrong happened!';
        switch(error.code) {
          case "auth/wrong-password":
                errormessage = 'Invalid password! Please try again.';
                break;

          case "auth/invalid-email":
                errormessage = 'Invalid email! Please try again.';
                break;

          case "auth/user-not-found":
                errormessage = 'Please check your credentials and try again';
                break;
        }

       if(Platform.OS === 'ios' ){
          Alert.alert("Oh No!" , errormessage );
       }else{
        ToastAndroid.showWithGravityAndOffset(
          errormessage ,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        ); 
        }
      });
  }

  facebookLogin = () => {
    this.setState({formState: 2  });
    LoginManager.logInWithPermissions(["public_profile", "email"])
    .then( result => {
      if(result.isCancelled){
        this.setState({formState: 0  });
        return Promise.reject( new Error('The user canceled the request'));
      }
      console.log( result.grantedPermissions.toString() );
      return AccessToken.getCurrentAccessToken();
    })
    .then( data => {
      console.log(data.accessToken);
      const credential = Firebase.auth.FacebookAuthProvider.credential(data.accessToken);
      console.log(credential);
      return Firebase.auth().signInWithCredential(credential);
    })
    .then( currentUser => {
     if( currentUser.additionalUserInfo.isNewUser ){
      
      currentUser.user.sendEmailVerification().then( ()=> {
        this.props.navigation.navigate({ routeName: 'addServices' }) 
      }); 
  
     }else if( currentUser.user.emailVerified ){
     this.props.navigation.navigate({ routeName: 'Main' })  
    }else{
     this.props.navigation.navigate({ routeName: 'Emailverify' })         
     }

    })
    .catch( error => {
      this.setState({formState: 0  });
      Alert.alert("Oh No!" , error.message );
    })
  }

  googlesigninfunction = () => {
    this.setState({formState: 2  });
   GoogleSignin.signIn()
   .then(  result => {
    const credential = Firebase.auth.GoogleAuthProvider.credential( result.idToken , result.accessToken );
    return firebase.auth().signInWithCredential(credential);
   })
   .then ( currentUser => {
    if( currentUser.additionalUserInfo.isNewUser ){
      this.props.navigation.navigate({ routeName: 'addServices' }) 
     }else if( currentUser.user.emailVerified ){
     this.props.navigation.navigate({ routeName: 'Main' })  
    }else{
     this.props.navigation.navigate({ routeName: 'Emailverify' })         
     }


    }).catch( error => {
      this.setState({formState: 0  });
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("canceled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("InProgress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Not available");
      } else {
        
        Alert.alert("Oh No!" , error.message );
      }
    }) 

  }


  render() {
  
    const isRegister = this.state.formState === FORM_STATES.REGISTER;
    const isLoading =  this.state.formState > 1 ;
    let { username , email , password , formState } = this.state;

    if( isLoading) {
      return(
        <View style={[styles.container , styles.loadingScreen ]} >
             {( this.state.formState == 3 ) ? <View></View> 
             : <ActivityIndicator color={colors.primary}  size={25} />
             }
            </View>
      );
    }else{
    return (
      
      <ImageBackground
        source={require('../../../assets/images/background3.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <StatusBar translucent backgroundColor={colors.primary} barStyle='light-content' />
        <View style={styles.container}>
          <View style={[styles.section, { paddingTop: 30 }]}>
            <Animated.Image
              resizeMode="contain"
              style={[
                styles.logo,
                this.state.isKeyboardVisible && { height: 80 },
                this.fadeIn(0),
              ]}
              source={require('../../../assets/images/dalan-logo2.png')}
            />
          </View>

          <Animated.View
            style={[styles.section, styles.middle, this.fadeIn(700, -20)]}
          >
             <View style={styles.borderX}>
                <TextInput style={styles.inputs}
                placeholder="Email Address"
                value={email}
                secureTextEntry={false}
                underlineColorAndroid='transparent'
                onChangeText={(email) =>  this.setState({email})   }/>
            </View>

            {this.state.formState === FORM_STATES.REGISTER && (
               <View style={styles.borderX}>
               <TextInput style={styles.inputs}
               placeholder="Username"
               value={username}
               secureTextEntry={false}
               underlineColorAndroid='transparent'
               onChangeText={(username) => this.setState({username}) }/>
           </View>
            )}

        

            <View style={styles.borderX}>
                <TextInput style={styles.inputs}
                placeholder="Password"
                value={password}
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({password}) }/>
            </View>

            <TouchableOpacity  onPress={() => {
             this.props.navigation.navigate({ routeName: 'Reset' })
           }}>
            <Text
                    style={{
                      color: colors.grey,
                      fontFamily: fonts.primaryRegular,
                      textAlign : 'left',
                      paddingBottom : 10 ,
                    }}
                  >
                   Forgot Password ?
                  </Text>
            </TouchableOpacity>
            <Animated.View
              style={[styles.section, styles.bottom, this.fadeIn(700, -20)]}
            >
              <Button
                disabled={
                  !( Boolean(email && password && formState == 0) ||  
                    Boolean(email && password && username && formState == 1 ) )}
                
                bgColor={ !( Boolean(email && password  && formState == 0) ||  
                  Boolean(email && password && username && formState == 1 ) ) 
                   ? colors.primaryLight : colors.primary }

                textColor={!( Boolean(email && password  && formState == 0) ||  
                  Boolean(email && password && username && formState == 1 ) ) 
                   ?  colors.primary : colors.white }

                secondary
                style={{ alignSelf: 'stretch', marginBottom: 10 }}
                caption={
                  this.state.formState === FORM_STATES.LOGIN
                    ? 'Login'
                    : 'Register'
                }
                onPress={this.validateUser }
              />

              {!this.state.isKeyboardVisible && (
                <View style={styles.socialLoginContainer}>
                  <Button  bordered
                    style={styles.socialButton}
                    bgColor={colors.primaryLight}
                    icon={require('../../../assets/images/google-plus.png')}
                    iconColor={colors.primary}
                    onPress={ this.googlesigninfunction }
                  />
                  <Button  bordered
                    style={[styles.socialButton, styles.socialButtonCenter]}
                    bgColor={colors.primaryLight}
                    icon={require('../../../assets/images/facebook.png')}
                    iconColor={colors.primary}
                    onPress={this.facebookLogin}
                  />
                  
                </View>
              )}

              {!this.state.isKeyboardVisible && (
                <TouchableOpacity
                  onPress={() => {
                    LayoutAnimation.spring();
                    this.setState({
                      formState: isRegister
                        ? FORM_STATES.LOGIN
                        : FORM_STATES.REGISTER,
                    });
                  }}
                  style={{ paddingTop: 30, flexDirection: 'row' }}
                >
                  <Text
                    style={{
                      color: colors.gray,
                      fontFamily: fonts.primaryRegular,
                    }}
                  >
                    {isRegister
                      ? 'Already have an account?'
                      : "Don't have an account?"}
                  </Text>
                  <Text
                    style={{
                      color: colors.primary,
                      fontFamily: fonts.primaryBold,
                      marginLeft: 5,
                    }}
                  >
                    {isRegister ? 'Login' : 'Register'}
                  </Text>
                </TouchableOpacity>
              )}
            </Animated.View>
          </Animated.View>
 
        </View>
      </ImageBackground>
    ); }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'rgba(255, 255, 255 , 0.1 )',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
  },
  backgroundImage: {
    backgroundColor : '#000000',
    
    flex: 1,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
  },
  middle: {
    flex: 2,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  bottom: {
    flex: 1,
    alignSelf: 'stretch',
    paddingBottom: Platform.OS === 'android' ? 30 : 0,
  },
  last: {
    justifyContent: 'flex-end',
  },
  textInput: {
    fontSize : 16,
    alignSelf: 'stretch',
    marginTop: 20,
    color : colors.primary
  },
  logo: {
    marginTop : 30 ,
    height: 120,
    
  },
  socialLoginContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
  },
  socialButtonCenter: {
    marginLeft: 10,
  },
  loadingScreen : {
    backgroundColor : colors.white,
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
   
  }
  ,
  borderX : {
    paddingBottom : 12,
    width : '100%',
    height : null,
   // backgroundColor : "#FFFFFF",
    shadowOffset : {width : 2 , height : 2 },
    shadowOpacity : 1,
    shadowColor : "#000000",
  },
});
