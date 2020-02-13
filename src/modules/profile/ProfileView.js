import React from 'react';
import { StatusBar , Image , StyleSheet, View, Text, ImageBackground , TouchableOpacity , Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fetch from './profilefunctions'; 
import LinearGradient from 'react-native-linear-gradient';

import { Button , ServiceItem as Service} from '../../components';
import { fonts, colors } from '../../styles';
import firebase from '../../config/firebase';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import HomeViewContainer from '../home/HomeViewContainer';


export default class ProfileScreen extends React.Component { 
  state = {
    user : null,
    seeMore : false , 
  }
   componentWillMount(){
   const user = firebase.auth().currentUser;
    this.setState({user});
    console.log(user);
   
   
  }

  async componentDidMount(){
    // const data = await Fetch.fetchNews();
    // Alert.alert("Data" , "as");
  }

  seeMoreDescription =  () => {
    this.setState(prevState => ({
      seeMore: !prevState.seeMore
    }));
  }

  render(){
    const {user , seeMore } = this.state;
    var lines = seeMore ? undefined : 3; 
    var text = seeMore ? 'See Less' : 'See More'; 
    var icon = seeMore ? 'angle-up' : 'angle-down'; 

  return (
    <View style={styles.container}>
         <StatusBar backgroundColor={colors.primary} barStyle='light-content' />
      <ScrollView>
      <View style={{paddingBottom : 100 , backgroundColor : '#F5F5F5' }}> 
    <View style={[ styles.card ]}> 
          <View style={{alignSelf : 'center',  marginTop : hp(2.5), paddingHorizontal : wp(2)}}>
          <Image  style={styles.profilepic} source={{uri : this.state.user.photoURL}} ></Image>
          <TouchableOpacity style={styles.editicon} onPress={ () => this.props.navigation.navigate({ routeName: 'editProfile' })} >
          <Icon   name={"pencil"} size={15} color={colors.white}/>
          </TouchableOpacity>
          </View>
          <Text style={styles.title}>{ this.state.user.displayName}</Text>
    </View>
       {/* <View style={{flexDirection : 'row', alignItems : 'center' , justifyContent : 'center'}}>
      
       </View> */}

       <View style={styles.hr}></View>

       <View style={styles.card}>
       <Text style={styles.servicesText}>Description</Text>
       <Text style={styles.subtitle} numberOfLines={lines}>Sed sapien ligula, suscipit quis venenatis quis, 
       pretium eu purus. Quisque leo justo, aliquam et  eleifend lacinia ligula
       am fringilla augue est, eu pretium purus placerat a. Vestibulum ante ipsum primis 
       in faucibus orci luctus.
       Sed sapien ligula, suscipit quis venenatis quis, 
       pretium eu purus. Quisque leo justo, aliquam et  eleifend lacinia ligula
       am fringilla augue est, eu pretium purus placerat a. Vestibulum ante ipsum primis 
       in faucibus orci luctus.
       Sed sapien ligula, suscipit quis venenatis quis, 
       pretium eu purus. Quisque leo justo, aliquam et  eleifend lacinia ligula
       am fringilla augue est, eu pretium purus placerat a. Vestibulum ante ipsum primis 
       in faucibus orci luctus.
       </Text>
       <TouchableOpacity style={styles.viewmore } onPress={this.seeMoreDescription}>
         <Text style={[styles.morebtn , { color : colors.grey ,fontFamily : fonts.primaryRegular ,  alignSelf : 'center' }]}>{text}</Text>
         <Icon style={{   alignSelf : 'center'}} name={icon} size={20} color={colors.grey} />
       </TouchableOpacity>
       </View>

       <View style={styles.hr}></View>

       <View style={styles.card}>
       <Text style={styles.servicesText}>Provide Services</Text>
       <View style={{paddingVertical : hp(1) , paddingHorizontal : wp(4) }}>
           <Service name={"Buying Gems"} icon={"diamond"} size={'small'}></Service>
           <Service name={"Selling Gems"} icon={"diamond"} size={'small'}></Service>
           <Service name={"Laboratory Service"} icon={"diamond"} size={'small'}></Service>
           <Service name={"Jewelry Shop"} icon={"diamond"} size={'small'}></Service>
        </View>
       </View>

       <View style={styles.hr}></View>
      
       <View style={styles.card}>
       <Text style={styles.servicesText}>Contact Details</Text>
       <View style={{paddingVertical : hp(1) , paddingHorizontal : wp(4) }}>
           <Service name={"076 9374442"} icon="phone" size={'large'} ></Service>
           <Service name={"amoda@konekt.lk"} icon="at" size={'large'} ></Service>
           <Service name={"285 Main Road Attidiya, 10350"} icon="envelope" size={'large'} ></Service>    
        </View>
       </View>

       <View style={styles.hr}></View>
      
       <View style={styles.card}>
       <Text style={styles.servicesText}>Image Galary</Text>
       <View style={{flexDirection : 'row' , paddingTop : hp(1) }}>
        <Image  style={styles.galaryImg} source={require('../../../assets/images/img1.jpg')} ></Image>
        <Image  style={styles.galaryImg} source={require('../../../assets/images/image4.jpg')} ></Image>
        <Image  style={styles.galaryImg} source={require('../../../assets/images/image3.jpg')} ></Image>
        </View>
       </View>

       </View>
     
        </ScrollView>  
      {/* <View style={styles.footer}>
      <TouchableOpacity style={[styles.morebtnTouch , {marginLeft : wp(2) , marginRight : wp(1) }]}>
         <Icon style={{   alignSelf : 'center'}} name="phone" size={20} color="#FFFFFF" />
         <Text style={styles.morebtn}>Call </Text>
       </TouchableOpacity>
       <TouchableOpacity style={[styles.morebtnTouch , {backgroundColor : colors.gray , marginLeft : wp(1) , marginRight : wp(2) }]}>
       <Icon style={{  alignSelf : 'center' }} name="envelope" size={20} color="#FFFFFF" />
         <Text style={styles.morebtn}>Message </Text>
       </TouchableOpacity>
      </View> */}
      </View>
     
   
  );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
   
  },
  header: {
    flex: 2,
    paddingTop : hp(4),
   // padding: 20,
  },
  section: {
    flex: 3,
    position: 'relative',
  },
  galaryImg : {
    flex:1,
    height : hp(16),
    margin : wp(0.75), 
    borderRadius : 5,
    elevation : 2 ,
  },
  profilepic : {
  
    borderWidth: 5,
    borderColor: '#d6d7da',
    
    borderRadius : wp(30) / 2,
    width : wp(30),
    height : wp(30),
  },
  subtitle : {
    color: colors.black,
    fontFamily: fonts.primaryLight,
    fontSize: 15,
    //opacity : 0.9 ,
    marginVertical : hp(0.5),
    paddingHorizontal : wp(4),
    letterSpacing: 0.04,

  },
  card : {
    backgroundColor : '#FFF',
    elevation : 2 ,
    paddingVertical : hp(2),

  },
  editicon: {
    padding : wp(2),
    borderRadius : 20 ,
    backgroundColor: colors.blue,
    position: 'absolute',
    right : 0,
    bottom: hp(3)
   },
  servicesText : {
    paddingHorizontal : wp(4),
    fontFamily : fonts.primaryBold,
    color : colors.gray,
    fontSize : 16 ,
  },
  morebtnTouch : {
    flex : 1 ,
    flexDirection : 'row',
   marginVertical : hp(1),
    borderRadius : 5 ,
   justifyContent : 'center',
   backgroundColor :  '#2d98da',
  },
  viewmore : {
    flex : 1 ,
    flexDirection : 'row',
    marginTop : hp(1.25),
    marginHorizontal : wp(4),
    borderRadius : 5 ,
   justifyContent : 'center',
   backgroundColor :  '#FFF' ,
   borderColor : colors.grey ,
   borderTopWidth : 0.5 ,
   paddingVertical : hp(0.75),
  },
  morebtn : {
    alignSelf : 'center',
  // paddingVertical : hp(1),
    paddingHorizontal : wp(1.5),
    marginLeft : wp(1.5),
    borderRadius : 4,
    fontSize : 16 ,
    color : colors.white,
    fontFamily : fonts.primaryBold,
  },
  title: {
    color: colors.gray,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
    opacity : 0.9 ,
    marginTop : hp(0.5),
    letterSpacing: 0.04,
    textAlign : "center",
  },
  lightText: {
    color: colors.white,
  },
  quickFacts: {
    height: 60,
    flexDirection: 'row',
  },
  quickFact: {
    flex: 1,
  },
  infoSection: {
    flex: 1,
  },
  infoRow: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  hr: {
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 10,
   // marginVertical : hp(1.5),
    
  },
  infoIcon: {
    marginRight: 20,
  },
  bottomRow: {
    height : 180,
    flexDirection: 'row',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  position: {
    color: colors.white,
    fontFamily: fonts.primaryLight,
    fontSize: 16,
    marginBottom: 3,
  },
  company: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 16,
  },
  quickInfoItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  quickInfoText: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
  },
  bottomImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceItem : {
   
    borderRadius : 5 ,
    flexDirection : 'row' , 
    padding : hp(1),
    borderColor: '#e3e3e399',
    borderWidth: 2,
  },
  serviceTitle: {
    color: colors.gray,
    fontFamily: fonts.primarySemiBold,
    fontSize: 16,
    opacity : 0.9 ,
    letterSpacing: 0.04,
    textAlign : "center",
  },
  footer : {
    flexDirection : 'row' , 
    position: 'absolute', 
    left: 0, 
    right: 0, 
    bottom: 0 ,
    height : 60 , 
    backgroundColor : colors.white, 
    borderColor: '#e3e3e399',
    borderWidth: 2,
  }
});
