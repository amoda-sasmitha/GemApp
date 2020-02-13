import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
  BackHandler,
  StatusBar,
  Alert,
  TextInput,
  FlatList,
  ScrollView as Scroll
} from 'react-native';

import { Card , Button } from '../../components';
import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';
import Icon from 'react-native-vector-icons/Entypo';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import firebase from '../../config/firebase';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ServicelistScreen from '../servicelist/ServicelistViewContainer';
import Firebase from 'firebase';

export default class HomeScreen extends React.Component {

  componentWillMount(){
    var user = Firebase.auth().currentUser;
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

    if( this.props.navigation.state.routeName == 'Home'){
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
  }

  logoutFromSystem = () => {
    //this.refs._scrollView.scrollTo(0);
  
      firebase.auth().signOut().then( () => {
          console.log("Done");
          this.props.navigation.navigate({ routeName: 'Auth' });
        });
       
    
}

_renderRecommendationCard = ({ item , index }) => (
  <TouchableOpacity style={{ marginLeft : (index == 0 ) ? wp(2) : 0 , marginTop : hp(0.5) , marginBottom : hp(0.5)}} key={item.id} onPress={() => this._openArticle(item)} activeOpacity={0.8} >
      <View style={styles.itemOneContainer}>
        <View style={styles.itemOneImageContainer}>
          <Image style={styles.itemOneImage} source={{ uri: item.image }} />
        </View>
        <View style={styles.itemOneContent}>
          <Text style={styles.title}  numberOfLines={1}>
          {item.title}
          </Text>
          <Text style={styles.itemOneTitle} numberOfLines={1}>
          {item.price}
          </Text>          
        </View>
      </View>
    </TouchableOpacity>
);

_openArticle = article => {
  this.props.navigation.navigate({
    routeName: 'Advertisement',
    params: { ...article },
  });
};

  render() {
  return (
    
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle='light-content' />
    <View style={styles.header }>
           <Text size={22} bold style={styles.Maintitle}> Browse  </Text>
           {/* <TextInput style={styles.inputs}
                placeholder="Search Here"
                secureTextEntry={false}
                underlineColorAndroid='transparent'
               /> */}
         
    </View> 
    <View>
    <Scroll ref='_scrollView'  showsVerticalScrollIndicator={false} >
      <View style={{paddingBottom : hp(10)}}>
      <Text style={styles.servicesText}>Services</Text>
        <View style={{flexDirection : 'row' , marginHorizontal : wp(4)}}>
          <TouchableOpacity  style={styles.categoryItemtouch}  activeOpacity={0.9} onPress={ () => this.props.navigation.navigate( 'ServiceList', { title : 'Buyers' , id : 'buying' })}>
          <View  style={styles.categoryItem}>
            <Image source={require('../../../assets/images/icons/cart.png')} style={styles.categoryImg} />
            <Text style={styles.categorytext}>Buyers</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.categoryItemtouch}  activeOpacity={0.9} onPress={ () => this.props.navigation.navigate( 'ServiceList', { title : 'Sellers' , id : 'selling' })}>
          <View style={styles.categoryItem}>
          <Image source={require('../../../assets/images/icons/slot-machine.png')} style={styles.categoryImg} />
          <Text style={styles.categorytext}>Sellers</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.categoryItemtouch}  activeOpacity={0.9} onPress={ () => this.props.navigation.navigate( 'ServiceList', { title : 'Trainers' , id : 'training' } )}>
          <View style={styles.categoryItem}>
          <Image source={require('../../../assets/images/icons/presentation.png')} style={styles.categoryImg} />
          <Text style={styles.categorytext}>Trainers</Text>
          </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection : 'row' , marginHorizontal : wp(4)}}>
        <TouchableOpacity  style={styles.categoryItemtouch}  activeOpacity={0.9} onPress={ () => this.props.navigation.navigate( 'ServiceList', { title : 'Jewellery Shops' , id : 'shops' })}>
          <View  style={styles.categoryItem}>
            <Image source={require('../../../assets/images/icons/shop.png')} style={styles.categoryImg} />
            <Text style={styles.categorytext}>Jewellery</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.categoryItemtouch}  activeOpacity={0.9} onPress={ () => this.props.navigation.navigate( 'ServiceList', { title : 'Cutting' , id : 'cutting' })}>
          <View style={styles.categoryItem}>
          <Image source={require('../../../assets/images/icons/laser.png')} style={styles.categoryImg} />
          <Text style={styles.categorytext}>Cutting</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.categoryItemtouch}  activeOpacity={0.9} onPress={ () => this.props.navigation.navigate( 'ServiceList', { title : 'Laboratories' , id : 'labs' })}>
          <View style={styles.categoryItem}>
          <Image source={require('../../../assets/images/icons/microscope.png')} style={styles.categoryImg} />
          <Text style={styles.categorytext}>Laboratories</Text>
          </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.servicesText}>Additional </Text>
        <View style={{flexDirection : 'row' , marginHorizontal : wp(4)}}>
        <TouchableOpacity  style={styles.categoryItemtouch}  activeOpacity={0.9}>
          <View style={styles.categoryItem}>
          <Image source={require('../../../assets/images/icons/portfolio.png')} style={styles.categoryImg} />
          <Text style={styles.categorytext}>Jobs</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.categoryItemtouch}  activeOpacity={0.9} onPress={ () => this.props.navigation.navigate( { routeName: 'AdList'})}>
          <View style={styles.categoryItem}>
          <Image source={require('../../../assets/images/icons/advertising.png')} style={styles.categoryImg} />
          <Text style={styles.categorytext}>Marketplace</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.categoryItemtouch}  activeOpacity={0.9} onPress={ () => this.props.navigation.navigate({ routeName: 'Newslist'})}>
          <View style={styles.categoryItem}>
          <Image source={require('../../../assets/images/icons/newspaper.png')} style={styles.categoryImg} />
          <Text style={styles.categorytext}>News</Text>
          </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection : 'row'}}>
        <Text style={styles.servicesText}>Featured Advertisements</Text>
        <TouchableOpacity style={styles.morebtnTouch} onPress={this.logoutFromSystem}>
        <Text style={styles.morebtn}>More</Text>
        </TouchableOpacity>
        </View>
   
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={listData}
          keyExtractor={item => `${item.id}`}
          renderItem={this._renderRecommendationCard}
        />
    </View>
        </Scroll>
    </View>
  
    </View>
    
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor : '#FFF',
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },

  Maintitle : {
    paddingTop : hp(2),
    //paddingBottom : hp(1),
  
    color : colors.white,
  },
 
  sectionLarge: {
    flex: 2,
    justifyContent: 'space-around',
  },
  header : {
    paddingHorizontal : wp(5) , 
    backgroundColor : colors.primary,
    // borderBottomEndRadius : 20,
    // borderBottomStartRadius : 20 ,
    paddingBottom : hp(1),
  
  },
  morebtnTouch : {
    marginVertical : hp(2),
   justifyContent : 'flex-end',
  },
  morebtn : {
   
    paddingHorizontal : wp(2),
    marginLeft : wp(1.5),
    alignSelf : 'center',
    backgroundColor :  '#2ecc71',
    borderRadius : 4,
    fontSize : 14 ,
    color : colors.white,
    fontFamily : fonts.primaryBold,
  },
  servicesText : {
    paddingLeft : wp(5) , 
    fontFamily : fonts.primaryBold,
    color : colors.darkGray,
    fontSize : 18 ,
    paddingVertical : hp(2),
  },
  section: {
   marginTop : hp(2),
  // backgroundColor : '#F4F4F4',
   paddingBottom : hp(100),
   
  },
  categoryItemtouch : {
    flex : 1 , 
    margin : wp(1.5) ,
   
  },
  categoryItem : {
    flex : 1 , 
    backgroundColor : colors.white ,
    elevation : 3 ,
    borderRadius : 5,
     
      height : hp(15),
  },
  categoryImg : {
   marginTop : hp(3),
   marginBottom : hp(1.5),
   width:  wp(11), 
   height: wp(11),
   alignSelf : 'center'
  },
  card : {
    marginHorizontal : wp(5) , 
    backgroundColor : colors.white,
    elevation : 3 ,
    borderRadius : 10 ,
  

  },
  categorytext : {
    fontSize : wp(4) ,
    textAlign : "center",
    fontWeight : "500" , 
    fontFamily : fonts.primaryBold ,
   
    color : colors.gray,
  },
  sectionHeader: {
    marginBottom: 8,
  },

  LogoutIcon : {
    marginHorizontal : 15 ,
    marginVertical : 15 , 
    alignSelf : 'center',
    flexDirection : 'row',
  },
  inputs : {
  
    paddingHorizontal : 5, 
    paddingVertical : 5 ,
    color : "#34495e",
    borderRadius : 6,
    borderWidth : 1.5,
    borderColor : "#F4F4F4",
    backgroundColor : "#FFFFFF",
    fontSize : 15,
    marginBottom : hp(2.3),
  },
  rowsection : {
    flexDirection : 'row',
    paddingTop : hp(1),
    //backgroundColor : colors.gray,
  },
  itemOneContainer: {
    marginHorizontal : wp(2),
    flex: 1,
    width: wp(44),
    borderRadius: 4,
    backgroundColor: "#F5F5F5",
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    // padding: 8,
  },
  itemOneImageContainer: {
    borderRadius: 0,
    overflow: 'hidden',
  },
  itemOneImage: {
    height: hp(23),
    width: wp(44),
    borderTopLeftRadius : 4,
    borderTopRightRadius : 4,
  },
  title : {
    paddingHorizontal : wp(2),
    color : colors.gray,
    fontFamily: fonts.primarySemiBold,
    textTransform : 'capitalize',
    fontSize: wp(4),
  },
  itemOneTitle: {
    paddingHorizontal : wp(2),
    fontFamily: fonts.primaryBold,
    color : colors.black,
    fontSize: wp(4.2),
  },
  itemOneSubTitle: {
    fontFamily: fonts.primaryLight,
    fontSize: 13,
    color: '#B2B2B2',
    marginVertical: 3,
  },
  itemOnePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemOneRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom : hp(1.5),
  },
  itemOneContent: {
    marginTop: hp(0.5),
    marginBottom: hp(1.5),
  },
});

const listData = [
 

  {
    id: 3,
    selling : true,
    brand: 'Mad Perry',
    title: 'Sapphire',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: 'LKR 60,000.00 ',
    priceFrom: true,
    badge: 'Private',
    badgeColor: '#ee1f78',
    image: 'http://ceylongems.konektholdings.com/wp-content/uploads/2018/06/pink_sapphire.jpg',
  },
  {
    id: 5,
    selling : true,
    brand: 'Weeknight',
    title: 'Amber',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: 'LKR 650,000.00 ',
    priceFrom: true,
    image: 'http://ceylongems.konektholdings.com/wp-content/uploads/2018/06/Padparadscha_Sapphires.jpg',
  },
  {
    id: 6,
    selling : false,
    brand: 'Mad Perry',
    title: 'Turquoise',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: 'LKR 53,000.00',
    priceFrom: true,
    badge: 'SALE',
    badgeColor: 'red',
    image: 'http://ceylongems.konektholdings.com/wp-content/uploads/2018/06/Montana_Sapphires.jpg',
  },
  {
    id: 7,
    selling : false,
    brand: 'Citizen',
    title: 'Jade',
    subtitle: 'Limited Edition',
    price: 'LKR 25,000.00 ',
    badge: 'NEW',
    badgeColor: '#3cd39f',
    image: 'http://ceylongems.konektholdings.com/wp-content/uploads/2018/06/White_Sapphires.jpg',
  }];

