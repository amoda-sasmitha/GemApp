import React from 'react';
import { StatusBar , Image , StyleSheet, View, Text, ImageBackground ,TextInput , LayoutAnimation, Keyboard , TouchableOpacity , Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import Loading from 'react-native-loading-spinner-overlay';
import { Button , ServiceItem as Service} from '../../components';
import { fonts, colors } from '../../styles';
import firebase from '../../config/firebase';
import ImageUpload from '../../config/imageUpload';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import HomeViewContainer from '../home/HomeViewContainer';


export default class ProfileScreen extends React.Component { 
  state = {
    user : null,
    seeMore : false , 
    isloading: false ,
    isKeyboardVisible: false,
    imageuri : '',
    description : "Sed sapien ligula,   eleifend lacinia ligulam fringilla augue est, eu pretium purus placerat a. Vestibulum ante ipsum primis in faucibus orci luctus. Sed sapien ligula, suscipit quis venenatis quis",
  }
   componentWillMount(){
   const user = firebase.auth().currentUser;
    this.setState({user});
    this.keyboardDidShowListener = Keyboard.addListener(
      Platform.select({ android: 'keyboardDidShow', ios: 'keyboardWillShow' }),
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      Platform.select({ android: 'keyboardDidHide', ios: 'keyboardWillHide' }),
      this._keyboardDidHide.bind(this),
    );
   
   
  }
  componentWillUnmount() {
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
  async componentDidMount(){
    // const data = await Fetch.fetchNews();
    // Alert.alert("Data" , "as");
  }

  seeMoreDescription =  () => {
    this.setState(prevState => ({
      seeMore: !prevState.seeMore
    }));
  }

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
     

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        console.log('response', JSON.stringify(response.uri));
        this.setState({
          imageuri: response.uri
        });
      }
    });

  }

  
  updateProfile = () => {
    if( this.state.imageuri.length > 0 ){
      this.setState({isloading : true });
      return ImageUpload.uriToBlob(this.state.imageuri)
      .then( (blob) => {
        return ImageUpload.uploadToFirebase(blob , firebase , "Users/"+this.state.user.uid + "/ProfilePic"  );
      }).then((snapshot)=>{
        Alert.alert("Yeah!" , "Image Upload Successfully");
        console.log(snapshot);
        
        this.setState({isloading : false });
      }).catch((error)=>{
  
       console.log(error);
  
      }); 

    }else{
      console.log("Not Changed");
      
    }
  }

  render(){
    const {user , seeMore } = this.state;
    var lines = seeMore ? undefined : 3; 
    var text = seeMore ? 'See Less' : 'See More'; 
    var icon = seeMore ? 'angle-up' : 'angle-down'; 

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor={colors.primary} barStyle='light-content' />
        <Loading visible={this.state.isloading}   ></Loading>
      <ScrollView>
      <View style={{paddingBottom : 70 , backgroundColor : '#F5F5F5' }}> 
    <View style={[ styles.card ]}> 
          <View style={{ alignSelf : 'center',  marginTop : hp(2.5), paddingHorizontal : wp(2)}}>
          { this.state.imageuri.length > 0  ?
          <Image  style={styles.profilepic} source={{ uri : this.state.imageuri}} ></Image>
            : 
            <Image  style={styles.profilepic} source={ require('../../../assets/images/photos.jpeg')} ></Image>
          }
          <TouchableOpacity style={styles.editicon} onPress={this.launchImageLibrary}>
          <Icon   name={"plus"} size={25} color={"#F4F4F4"}/>
          </TouchableOpacity>
          </View>
          <Text style={styles.title}>{ 'Amoda Sasmitha'}</Text>
    </View>
       {/* <View style={{flexDirection : 'row', alignItems : 'center' , justifyContent : 'center'}}>
      
       </View> */}

       <View style={styles.hr}></View>

       <View style={styles.card}>
       <Text style={styles.servicesText}>Description</Text>
       <TextInput style={styles.inputs}
       multiline={true}
                value={ this.state.description}
                secureTextEntry={false}
                underlineColorAndroid='transparent'
                 onChangeText={(description) =>  this.setState({description})   }
                />

      <Text style={styles.servicesText}>Telepone No</Text>
       <TextInput style={styles.inputs}
                value={"0769374442"}
                secureTextEntry={false}
                underlineColorAndroid='transparent'
                 onChangeText={(phone) =>  this.setState({phone})   }
                />
      <Text style={styles.servicesText}>Address </Text>
       <TextInput style={styles.inputs}
                 multiline={true}
                 value={ "No 329, Sarasavi Asapuwa, Hapugala, Galle, Sri Lanka,"}
                secureTextEntry={false}
                underlineColorAndroid='transparent'
                 onChangeText={(phone) =>  this.setState({phone})   }
                />
       </View>

       <View style={styles.hr}></View>
      

       </View>
     
        </ScrollView>  
        {  this.state.isKeyboardVisible ? <View></View> :
         <View style={styles.footer}>
      <TouchableOpacity style={[styles.morebtnTouch , {marginHorizontal : wp(4) }]} onPress={this.updateProfile}>
         {/* <Icon style={{   alignSelf : 'center'}} name="save" size={20} color="#FFFFFF" /> */}
         <Text style={styles.morebtn}>Save Changes </Text>
       </TouchableOpacity>
      
      </View>

        }
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
  inputs : {
    marginVertical :hp(1.5),
    marginHorizontal : wp(4),
    paddingHorizontal : 10, 
    paddingVertical : 4 ,
    color : colors.gray,
    borderRadius : 6,
    borderWidth : 1.5,
    borderColor : "#D8D8D8",
    backgroundColor : "#FFFFFF",
    fontSize : 15,
   
  },
  card : {
    backgroundColor : '#FFF',
    elevation : 2 ,
    paddingVertical : hp(2),

  },
  editicon: {
    // padding : wp(2),
    // borderRadius : 20 ,
    //backgroundColor: colors.blue,
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
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
   marginVertical : hp(1.3),
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
