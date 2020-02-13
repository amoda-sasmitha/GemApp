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
  TouchableHighlight as TH,
  TouchableOpacity as TO
} from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Button , ServiceCard } from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import firebase from '../../config/firebase';
import { TouchableOpacity, TouchableHighlight, ScrollView, TextInput } from 'react-native-gesture-handler';

export default class EmailVerifyScreen extends React.Component {
  
  state = {
    user : null,
    buying : false,
    selling : false,
    training : false,
    shops : false ,
    cutting : false,
    lab : false,

  }



  componentWillMount(){
   const user = firebase.auth().currentUser;
   BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
   
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  checkSelections = () => {
    const {buying , selling  , training , shops , cutting , lab} = this.state;
     return (buying || selling  || training || shops || cutting || lab  ) ?
     (<TO style={styles.finish} onPress={ () => this.props.navigation.navigate({ routeName: 'Main' }) } >
     <View style={{}}> 
       <Text style={styles.submitBtn}>Finalize Registration</Text>
     </View>
     </TO>)
     : (<View></View>)
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

  selectService = (service ) => {
      switch(service ){

        case 'buying':  this.setState({ buying : !this.state.buying });
                        break;
        case 'selling':  this.setState({ selling : !this.state.selling });
                        break;
        case 'training':  this.setState({ training : !this.state.training });
                        break;
        case 'shops':  this.setState({ shops : !this.state.shops });
                        break;
        case 'cutting':  this.setState({ cutting : !this.state.cutting });
                        break;
        case 'lab':  this.setState({ lab : !this.state.lab });
                        break;
      }
  }

  render(){
    const {buying , selling  , training , shops , cutting , lab} = this.state;
    return(
    <View style={styles.container}>
      <ScrollView  style={styles.main}  showsVerticalScrollIndicator={false}  >
        
        <Text  bold style={styles.title}>You're Almost there</Text>
        <View>
        <Text  style={styles.description}>
        Let us know your services , So other users can also see them when they search. 
          </Text>
          </View>  
        <TO onPress={ () => this.selectService('buying') }>
          <ServiceCard  title={'Buying Gem'} 
                        service={buying}
                        description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce faucibus laoreet auctor. Quisque sapien lectus, '}
                        ></ServiceCard>
        </TO>
        <TO onPress={ () => this.selectService('selling') }>
          <ServiceCard  title={'Selling Gem'} 
                        service={selling}
                        description={'Nunc sit amet felis odio. In sit amet tortor lectus. Nunc nibh nulla, ultricies nec elementum vitae, tempus ut nunc.'}
                        ></ServiceCard>
        </TO>
        <TO onPress={ () => this.selectService('training') }>
          <ServiceCard  title={'Training Service'} 
                        service={training}
                        description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce faucibus laoreet auctor. Quisque sapien lectus, '}
                        ></ServiceCard>
        </TO>
        <TO onPress={ () => this.selectService('shops') }>
          <ServiceCard  title={'Gem Shops'} 
                        service={shops}
                        description={'Nunc sit amet felis odio. In sit amet tortor lectus. Nunc nibh nulla, ultricies nec elementum vitae, tempus ut nunc.'}
                        ></ServiceCard>
        </TO>
        <TO onPress={ () => this.selectService('cutting') }>
          <ServiceCard  title={'Gem Cuting Service'} 
                        service={cutting}
                        description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce faucibus laoreet auctor. Quisque sapien lectus, '}
                        ></ServiceCard>
        </TO>
        <TO onPress={ () => this.selectService('lab') }>
          <ServiceCard  title={'Laboratary Service'} 
                        service={lab}
                        description={'Nunc sit amet felis odio. In sit amet tortor lectus. Nunc nibh nulla, ultricies nec elementum vitae, tempus ut nunc.'}
                        ></ServiceCard>
        </TO>
        <View style={{height : hp(10)}}></View>
    
      </ScrollView>
     <this.checkSelections/>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : '#FFFFFF',
   
  },
  
  title: {
    paddingTop : hp(4),
    
    color: colors.gray,
    backgroundColor : colors.white,
    fontSize : wp(6) ,
  },
  description: {

    color: colors.darkGray,
    lineHeight: hp(3.4) ,
    fontSize : wp(4.5) ,
    paddingTop : hp(1),
    paddingBottom : hp(2),
    backgroundColor : colors.white,
  },
 
 main : {
   marginHorizontal : wp(6),
   paddingBottom :hp(10),
   flex : 1 ,
 },
 submitBtn : {
  color: colors.white,
  paddingHorizontal : wp(4),
  paddingVertical : hp(1.6),
  width : wp(100),

  fontSize : wp(4.5) ,
  textAlign : "center",
  fontFamily : fonts.primaryBold, 
  backgroundColor : colors.blue,
  //borderWidth : 0.6 ,
 }

 ,finish : {
   position : 'absolute',
   bottom : 0,
 
 }
 
 
});

