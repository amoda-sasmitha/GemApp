// @flow
import React from 'react';
import { Picker , ToastAndroid, Alert , BackHandler, Button, TouchableOpacity , ScrollView,  Text , View , Image , StyleSheet , StatusBar, ImageBackground, TextInput } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { fonts, colors } from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import { Text as Text2 } from '../../components/StyledText';
import { FlatList } from 'react-native-gesture-handler';
import { RadioGroup } from '../../components';
import AutoTags from "react-native-tag-autocomplete";

export default class AddAdvertisement extends React.Component {

  state = {
    title : '',
    category : '',
    description : '',
    type : 0,
    imageCount : 0,
    tagsSelected: [],
    suggestions: [ { name :"Sasmitha Amoda"} ,{ name :"Sasmitha" } ,  { name :"Sasmitha2"} ,{ name :"Sasmitha3" }],
    images :  [ ] ,
  }

  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
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

    if( this.props.navigation.state.routeName == 'AddAdvertisement' && filledForm ){
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

  _renderImage = (image ) => {
    return (
      <View>
      <Image style={styles.Image} 
          source={{uri : image.item }} />  
      <TouchableOpacity style={styles.editicon} onPress={ () => this.removeImage(image.index) }>
      <Icon   name={"times-circle"} size={28} color={colors.black}/>
      </TouchableOpacity>       
   </View>
    );
  } 

  customRenderSuggestion = suggestion => {
    //override suggestion render the drop down
    const name = suggestion.name;
    return (
      <Text style={{padding : 5 , fontFamily : fonts.primarySemiBold , color : colors.gray , fontSize : 15 }}>
        {name}
      </Text>
    );
  };


  customFilterData = query => {
    let result = [];
    if( query.length >= 2 ){
    query =  query.toUpperCase();
    result = this.state.suggestions.filter( s =>  s.name.toUpperCase().includes(query) );
    }
    return result;
  }

  customRenderTags = tags => {
    //override the tags render
    return (
      <View style={styles.customTagsContainer}>
        {this.state.tagsSelected.map((t, i) => {
          return (
            <TouchableHighlight
              key={i}
              style={styles.customTag}
              onPress={() => this.handleDelete(i)}
            >
              <Text style={{ color: "white" }}>
                {i}) {t.fullName || t.email}
              </Text>
            </TouchableHighlight>
          );
        })}
      </View>
    );
  };


 

  removeImage = (index) => {
     var newArray = this.state.images;
     ImagePicker.cleanSingle(newArray[index]).then(() => {
      newArray.splice(index , 1)
      console.log(newArray);
      this.setState({
        imageCount : this.state.imageCount - 1,
        images : newArray,
      });
    }).catch(e => {
      alert(e);
    });
    
  }

  launchImageLibrary = () => {
    ImagePicker.openPicker({
      writeTempFile : false,
      cropping : true ,
      multiple: true
    }).then(selectedimages => {
      
      var newImagesArray = selectedimages.map( item => item.path );
      var total = this.state.imageCount + newImagesArray.length;
      newImagesArray =  ( total > 5 ) ? newImagesArray.splice( -1 , total - 5) : newImagesArray;
      total =   ( total > 5 ) ? 5 : total;

      

      this.setState({
        imageCount : total,
        images : [ ...this.state.images , ...newImagesArray ],
      });
    });
  }

  changeIndex = (index) => {
    console.log(index);
      this.setState({ type : index});
  }

  handleDelete = index => {
    //tag deleted, remove from our tags array
    let tagsSelected = this.state.tagsSelected;
    tagsSelected.splice(index, 1);
    this.setState({ tagsSelected });
  }

  handleAddition = contact => {
    //suggestion clicked, push it to our tags array
    this.setState({ tagsSelected: this.state.tagsSelected.concat([contact]) });
  }

  customRenderTags = tags => {
    //override the tags render
    return (
      <View style={styles.customTagsContainer}>
        {this.state.tagsSelected.map((t, i) => {
          return (
            <View    
            key={i}
            style={styles.customTag}>
               <Text style={{ color: colors.white , paddingRight : wp(2) }}>
                {t.name}
              </Text>
            <TouchableOpacity
              key={i}
              onPress={() => this.handleDelete(i)}
            >
            <Icon   name={"times"} size={15} color={"#F4F4F4"}/>
            </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  };


  render() {

    const { type , imageCount , images} = this.state;
    return(
      <View style={styles.container}>
         <StatusBar backgroundColor={colors.primary} barStyle={'light-content' } />
          
          <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
         <Image source={require('../../../assets/images/icons/back.png')} style={{height: wp(8)  , width : wp(8) , alignSelf : "center", tintColor : colors.white }} ></Image>
          </TouchableOpacity>

          <Text2 size={20} bold style={styles.title}>Add Advertisement </Text2>

          <View style={{flexDirection: 'column' , alignItems : 'flex-start' ,  flex : 1  }} >
          <TouchableOpacity style={{alignSelf : 'flex-end'  }}>
          <Text2 size={20} bold style={styles.post}>Post </Text2>
          </TouchableOpacity>
          </View>
          </View>

         <ScrollView alwaysBounceVertical={false} >
         <View style={styles.itemTwoContainerX}>

           <View style={styles.card}>
        <TextInput 
          style={styles.mainTitle}
          multiline={false}
          keyboardType = 'numeric'
          value={this.state.title}
          placeholder={"Enter Price"}
          onChangeText={(title) => this.setState({title}) }/>
        <TextInput 
          style={styles.description}
          numberOfLines={13}
          multiline={true}
          underlineColorAndroid="#F4F4F4"
          placeholder={"Type Description"}
          onChangeText={(description) => this.setState({description}) }/>
        </View>

        <View style={styles.card}>
         <Text2 size={hp(2.4)} bold style={{marginTop : hp(1)}} color={colors.grey}>Add Category </Text2>
          <Picker
          selectedValue={this.state.category}
          style={styles.pickerStyle}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({category: itemValue})
          }>
          <Picker.Item label="Amethyst" value="Amethyst" />
          <Picker.Item label="Amber" value="Amber" />
          <Picker.Item label="Turquoise" value="Turquoise" />
          <Picker.Item label="Jade" value="Jade" />
          <Picker.Item label="Lapis lazuli" value="Lapislazuli" />
          <Picker.Item label="Sapphire" value="Sapphire" />
        </Picker>
        </View>

        <View style={styles.card}>
        <Text2 size={hp(2.4)} bold style={{marginTop : hp(1) , marginBottom : hp(2)}} color={colors.grey}>Type </Text2>
        <RadioGroup
          style={{width : wp(50) , marginBottom : hp(2)}}  secondary rounded
          items={['Public', 'Private']}
          selectedIndex={this.state.type}
          onChange={ this.changeIndex}
        />
        { ( type == 1 ) ? 
          <View>
          <Text2 size={hp(2.4)} bold style={{marginTop : hp(1) , marginBottom : hp(2)}} color={colors.grey}>Add Users </Text2>
          <AutoTags
            suggestions={this.state.suggestions}
            tagsSelected={this.state.tagsSelected}
            placeholder="Add a contact.."
            tagStyles={styles.tagStyles}
            handleAddition={this.handleAddition}
            renderSuggestion={this.customRenderSuggestion}
            handleDelete={this.handleDelete}
            filterData={this.customFilterData}
            renderTags={this.customRenderTags}
            autoFocus={false}
            />
            </View>
            : <View></View>
          }

        </View>
           <View style={styles.card}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{flexDirection : 'row'}} >

          {  ( imageCount < 5 ) ? 
          <View>
          <TouchableOpacity style={styles.ImageUpload} onPress={this.launchImageLibrary }>
          <View style={{backgroundColor : '#F4F4F4'}}  > 
          <Icon style={styles.itemTwoImage} name={'upload'} size={40} color={colors.grey}/>
          {/* <Text style={styles.imageuploadtext}>Upload Image</Text>  */}
          </View> 
          </TouchableOpacity>
          </View>
          : <View></View>
          }
          <FlatList      
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
            horizontal={true}
          data={images}
          renderItem={ this._renderImage }
          />
          </View>
          </ScrollView>
          </View>

         
         
         
         </View>
         <View style={styles.mainContainer}>
          <Text style={styles.instruction}>
          Instructions
          </Text> 
          <Text style={styles.instructionText}>
        Today, tanzanite is beloved for its rich purple-blue colouration. 
        It has enjoyed steady popularity within the jewellery trade since Tiffany  
        Co. first started selling the gemstone in 1968.
          </Text> 
         </View>
         </ScrollView>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  headerbg :{
    backgroundColor : colors.primary,
    height : hp(18),
  },  

  itemTwoContainerX: {
   // padding : wp(4),
    marginBottom : hp(2),
    marginHorizontal : wp(0) ,
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
  card : {
    marginBottom : hp(1.5),
    backgroundColor : colors.white,
    paddingVertical : hp(1),
    elevation : 2 ,
    paddingHorizontal : wp(4),


  },
  customTag: {
    flexDirection : 'row',
    backgroundColor: colors.blue,
    fontFamily : fonts.primaryBold,
    fontSize : hp(2.5),
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    marginLeft: 5,
    marginTop: 5,
    borderRadius: 6,
    padding: 8
  },
  customTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    width: wp(88)
  },
  pickerStyle : {
    height: 50, 
    width: wp(92) , 
    borderWidth : 2 ,
     borderColor : colors.grey ,
     fontFamily : fonts.primaryBold,
    
    
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
    flex : 1 ,
    alignItems : 'center',
    justifyContent : 'center',
    paddingVertical : hp(1),
    
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
    backgroundColor : colors.white,
    position: 'absolute', 
    top: 0, 
    right: 0, 
   },
  Image : {
    marginVertical : hp(1.5),
    marginRight : wp(2),
    borderRadius : 10 , 
    height : wp(35),
    width : wp(35),
  },
  ImageUpload : {
    backgroundColor : '#F4F4F4',
    marginVertical : hp(1.5),
    marginHorizontal : wp(2),
    borderRadius : 10 , 
    height : wp(35),
    width : wp(35),
    justifyContent: 'center'

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