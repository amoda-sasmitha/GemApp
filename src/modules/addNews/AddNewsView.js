// @flow
import React from 'react';
import { Alert , BackHandler, TouchableOpacity , ScrollView,  Text , View , Image , StyleSheet , StatusBar, ImageBackground, TextInput } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { fonts, colors } from '../../styles';
import { Button } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import Firebase from 'firebase';
import ImageUpload from '../../config/imageUpload';
import { YellowBox } from 'react-native';
import axios from 'axios';
import { Text as Text2 } from '../../components/StyledText';
import { error } from 'react-native-gifted-chat/lib/utils';
import  env  from '../../config/env';
import Loading from 'react-native-loading-spinner-overlay';
import Modal from "react-native-modal";
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

export default class AddNews extends React.Component {

  state = {
    user : null,
    title : '',
    description : '',
    isUploaded : false,
    imageuri :  '' ,
    isloading : false,
    isModalVisible: false,
  }

  construct() {
    YellowBox.ignoreWarnings(['Setting a timer']);
}

  UNSAFE_componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    var user = Firebase.auth().currentUser;
    this.setState({ user : user});

  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
  }

  handleBackButton = () => {
    const { title , description , isUploaded } = this.state;
    const filledForm = ( title.length > 0 || description.length > 0 || isUploaded );

    if (!this.props.navigation.isFocused()) {
      // The screen is not focused, so don't do anything
      return false;
    }

    if( this.props.navigation.state.routeName == 'AddNews' && filledForm ){
    Alert.alert(
      'Are you sure you want to discard news post?',
      'All the changes made to the post will not be saved', [{
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
      }, {
          text: 'Discard',
          onPress: () => this.props.navigation.goBack(null)
      }, ], {
          cancelable: false
      }
   )
   return true;
    }
  }

  postnews= () => {
     const { user , title , description , imageuri } = this.state;

     if( title.length > 0 && description.length > 0 ){

      if( imageuri.length > 0 ){
        this.setState({isloading : true});
        return ImageUpload.uriToBlob(imageuri)
        .then( blob => {
          return ImageUpload.uploadToFirebase(blob , Firebase , "News/"+ new Date().getTime() + this.state.user.uid );
        }).then( imageUrl => {
          this.submitNews(imageUrl);       
        }).catch((error)=>{
          this.setState({isloading : false});
          console.log(error);
        }); 
      }else{
        this.setState({isloading : true});
        this.submitNews("");
      }
    }else {
      Alert.alert( "Message" , "Please fill all the fields")
    } 
  }

  submitNews = (imageUrl) => {
    const { user , title , description , imageuri } = this.state;
    axios.post(`${env.API_URL}/news/`, {
      name : user.displayName ,
      uid : user.uid,
      title : title ,
      description : description ,
      img : imageUrl ,
    }).then ( data => {
         this.setState({isloading : false , isModalVisible : true });
    }).catch( error => {
      this.setState({isloading : false});
      Alert.alert( "Error" , error.message);
    });
  }
 

  removeImage = () => {
    this.setState({
      isUploaded : false,
      imageuri : '',
    });
  }

  launchImageLibrary = () => {
    ImagePicker.openPicker({
      writeTempFile : true,
      cropping : true ,
      cropperActiveWidgetColor : colors.primary,
      cropperStatusBarColor : colors.primary,
      cropperToolbarColor : colors.primary,
    }).then(selectedimages => {
      
      console.log(selectedimages);
      this.setState({
        isUploaded : true,
        imageuri : selectedimages.path ,
      });
    }).catch( error => {
      console.log("User Canceled");
    })

  }

  goAhead = () =>{
    this.setState({isModalVisible : false});
    this.props.navigation.navigate({
      routeName: 'PrivateNewslist',
      params: { isPublished : true },
    });
  }

  popUpModal = () => (
    <Modal isVisible={this.state.isModalVisible} backdropOpacity={0.5}>
          <View style={{ height : hp(30)  , backgroundColor : colors.white , elevation : 2 , borderRadius : 5 }}>
        <Image source={require('../../../assets/images/icons/right.png')}  style={styles.modalImage} /> 
              <Text style={styles.modalTitle}>Success!</Text>
              <View style={{ paddingHorizontal : hp(4) }}>
  <Text style={styles.description}>News Post Added Successfully.{"\n"}Our Admin panel will 
  look your news post and give the access to it</Text>
              </View>
              <Button onPress={this.goAhead} bordered bgColor={colors.green}  style={{marginHorizontal : hp(10), marginTop : hp(2) }}
              caption={"Go Ahead"} rounded brodered></Button>
          </View>
      </Modal>
  );

  render() {

    const { isUploaded , imageuri} = this.state;
    return(
      <View style={styles.container}>
         <StatusBar backgroundColor={colors.primary} barStyle={'light-content' } />
         <Loading visible={this.state.isloading}   ></Loading>
          <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
         <Image source={require('../../../assets/images/icons/back.png')} style={{height: wp(8)  , width : wp(8) , alignSelf : "center", tintColor : colors.white }} ></Image>
          </TouchableOpacity>

          <Text2 size={20} bold style={styles.title}>Add News </Text2>

          <View style={{flexDirection: 'column' , alignItems : 'flex-start' ,  flex : 1  }} >
          <TouchableOpacity style={{alignSelf : 'flex-end'  }} onPress={this.postnews}>
          <Text2 size={20} bold style={styles.post}>Post </Text2>
          </TouchableOpacity>
          </View>
          </View>

         <ScrollView alwaysBounceVertical={false} >
         <View style={styles.itemTwoContainerX}>
        <TextInput 
          style={styles.mainTitle}
          multiline={true}
          value={this.state.title}
          // autoFocus={true}
          placeholder={"Enter News Title"}
          onChangeText={(title) => this.setState({title}) }/>
        <TextInput 
          style={styles.description}
          multiline={true}
          underlineColorAndroid="#FFFFFF"
          placeholder={"Type Description"}
          onChangeText={(description) => this.setState({description}) }/>

          { isUploaded && 
          <View>
              <Image style={styles.Image} 
                  source={{uri : imageuri}} />  
              <TouchableOpacity style={styles.editicon} onPress={this.removeImage}>
              <Icon   name={"times-circle"} size={28} color={colors.gray}/>
              </TouchableOpacity>       
           </View>
          }
         
         </View>
         </ScrollView>
         { !isUploaded && 
         <TouchableOpacity style={styles.uploadbtn}  onPress={this.launchImageLibrary} >
          <Icon style={styles.itemTwoImage} name={'upload'} size={20} color={colors.grey}/>
          <Text style={styles.imageuploadtext}>Upload Image</Text> 
          </TouchableOpacity>
        }
        <this.popUpModal/>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerbg :{
    backgroundColor : colors.primary,
    height : hp(18),
  },  

  itemTwoContainerX: {
    flex : 1 ,
    padding : wp(4),
    //marginBottom : hp(2),
    marginHorizontal : wp(0) ,
    backgroundColor : colors.white,
    //borderRadius: 10,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
   //marginTop : -hp(18),
   
  },
  mainTitle : {
    fontSize : wp(5),
    fontFamily : fonts.primaryBold,
    color : colors.gray,
   
  },
  modalTitle : {
    alignSelf : 'center',
    fontSize : wp(6.5),
    paddingTop : hp(4),
    paddingBottom : hp(1),
    fontFamily : fonts.primaryBold,
    color : colors.gray,
   
  },
  modalImage : {
    height : hp(8),
    width : hp(8),
    alignSelf: 'center',
    top : '-15%',
    position : 'absolute',

  },
  description : {
    flex : 0,
    textAlignVertical: 'top',
    fontSize : wp(4.5),
    fontFamily : fonts.primaryRegular,
    color : colors.gray,
  },
  mainContainer : {
    flex : 1,
    padding : wp(4),
    marginBottom : hp(1),
    //marginHorizontal : wp(4) ,
    backgroundColor : colors.white,
    //borderRadius: 10,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  itemTwoImage : {
    alignSelf : 'center',
  },
  imageuploadtext : {
    alignSelf : 'center',
    fontSize : hp(2.5),
    paddingLeft : wp(3),
    fontFamily : fonts.primaryRegular,
    color : colors.grey,
  },
  uploadbtn : {
    marginTop : hp(1),
    flexDirection : 'row',
    borderRadius : 4,
    borderWidth : 1,
    borderColor : "#F4F4F4",
    alignItems : 'center',
    backgroundColor : colors.white,
    justifyContent : 'center',
    position : 'absolute',
    bottom : 0,
    paddingVertical : hp(2),
    width : wp(100),
    
  },
  instruction : {
    fontSize : hp(2.6),
    fontFamily : fonts.primaryBold ,
    color : colors.grey,
  },
  instructionText : {
    fontSize : hp(2.3),
    paddingVertical : hp(1),
    fontFamily : fonts.primaryRegular ,
    color : colors.grey,
  },
  editicon: {
   
    position: 'absolute', 
    top: wp(1), 
    right: wp(17), 
   },
  Image : {
  
    paddingTop : hp(1),
    borderRadius : 10 , 
    height : wp(75),
    width : wp(75),
  },
  header : {
    paddingHorizontal : wp(5) , 
    backgroundColor : colors.primary,
    paddingVertical : hp(1.5),
    flexDirection : 'row'
  },
  title : {
    alignSelf : 'center',
    color : colors.white,
    paddingLeft : wp(4),

  },
  post : {
    alignSelf : 'center',
    color : colors.white,
    paddingLeft : wp(4),

  }


});