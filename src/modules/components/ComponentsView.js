import React from 'react';
import { StatusBar, Image ,  StyleSheet, View, Text, ScrollView , TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors, fonts } from '../../styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Button, RadioGroup, Dropdown } from '../../components';
import { Text as Text2 } from '../../components/StyledText';
import Firebase from 'firebase';

export default class ProfileScreen extends React.Component { 
  state = {
    user : null,
    seeMore : false , 
  }

  logoutFromSystem = () => {
    //this.refs._scrollView.scrollTo(0);
  
      Firebase.auth().signOut().then( () => {
          console.log("Done");
          this.props.navigation.navigate({ routeName: 'Auth' });
        });
       
    
}

 

  render(){
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor={colors.primary} barStyle='light-content' />
      <View style={styles.header }>
      <Text2 size={22} bold style={styles.title}>Menu  </Text2>
           {/* <TextInput style={styles.inputs}
                placeholder="Search Here"
                secureTextEntry={false}
                underlineColorAndroid='transparent'
               /> */}
         
    </View> 
    <ScrollView ref='_scrollView'  showsVerticalScrollIndicator={false} >

      {/* <TouchableNativeFeedback>
        <View style={styles.menuItem}>
        <Image source={require('../../../assets/images/icons/cart.png')} style={styles.menuImg}   />
            <View style={{ alignSelf : 'center'}}>
              <Text style={styles.mainText}>Buying Gems</Text>
            
            </View>       
        </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback>
        <View style={styles.menuItem}>
        <Image source={require('../../../assets/images/icons/slot-machine.png')} style={styles.menuImg}   />
            <View style={{ alignSelf : 'center'}}>
              <Text style={styles.mainText}>Selling Gems</Text>
             
            </View>       
        </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback>
        <View style={styles.menuItem}>
        <Image source={require('../../../assets/images/icons/presentation.png')} style={styles.menuImg}   />
            <View style={{ alignSelf : 'center'}}>
              <Text style={styles.mainText}>Training</Text>
             
            </View>       
        </View>
        </TouchableNativeFeedback> */}

        {/* <TouchableNativeFeedback>
        <View style={styles.menuItem}>
        <Image source={require('../../../assets/images/icons/microscope.png')} style={styles.menuImg}   />
            <View style={{ alignSelf : 'center'}}>
              <Text style={styles.mainText}>Laborary Services</Text>
             
            </View>       
        </View>
        </TouchableNativeFeedback> */}

        <TouchableNativeFeedback onPress={ () => this.props.navigation.navigate( 'AddAdvertisement')}>
        <View style={styles.menuItem}>
        <Image source={require('../../../assets/images/icons/advertising.png')} style={styles.menuImg}   />
            <View style={{ alignSelf : 'center'}}>
              <Text style={styles.mainText}>Post Advertisements </Text>
            
            </View>       
        </View>
        </TouchableNativeFeedback>

        {/* <TouchableNativeFeedback>
        <View style={styles.menuItem}>
        <Image source={require('../../../assets/images/icons/shop.png')}  style={styles.menuImg}   />
            <View style={{ alignSelf : 'center'}}>
              <Text style={styles.mainText}>Gem Shops</Text>
             
            </View>       
        </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback>
        <View style={styles.menuItem}>
        <Image source={require('../../../assets/images/icons/laser.png')}   style={styles.menuImg}   />
            <View style={{ alignSelf : 'center'}}>
              <Text style={styles.mainText}>Gem Cuting</Text>
             
            </View>       
        </View>
        </TouchableNativeFeedback> */}
       
        <TouchableNativeFeedback>
        <View style={styles.menuItem}>
        <Image source={require('../../../assets/images/icons/portfolio.png')} style={styles.menuImg}   />
            <View style={{ alignSelf : 'center'}}>
              <Text style={styles.mainText}>Job Posts</Text>
             
            </View>       
        </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback  onPress={ () => this.props.navigation.navigate( 'PrivateNewslist' )}>
        <View style={styles.menuItem}>
        <Image source={require('../../../assets/images/icons/newspaper.png')} style={styles.menuImg}   />
            <View style={{ alignSelf : 'center'}}>
              <Text style={styles.mainText}>Add News</Text>
             
            </View>       
        </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback>
        <View style={styles.menuItem}>
        <Image source={require('../../../assets/images/icons/lifesaver.png')}  style={styles.menuImg}   />
            <View style={{ alignSelf : 'center'}}>
              <Text style={styles.mainText}>Help Center</Text>
             
            </View>       
        </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback>
        <View style={styles.menuItem}>
        <Image source={require('../../../assets/images/icons/tools.png')}   style={styles.menuImg}   />
            <View style={{ alignSelf : 'center'}}>
              <Text style={styles.mainText}>Settings</Text>
             
            </View>       
        </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback onPress={ this.logoutFromSystem}>
        <View style={styles.menuItem}>
        <Image source={require('../../../assets/images/icons/logout.png')}   style={styles.menuImg}   />
            <View style={{ alignSelf : 'center'}}>
              <Text style={styles.mainText}>Logout</Text>
             
            </View>       
        </View>
        </TouchableNativeFeedback>

      </ScrollView>
      </View>
    );
  }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    //paddingTop : hp(3),
  },
  menuItem : {

    paddingVertical : hp(2),
    paddingHorizontal : wp(6),
    flexDirection : 'row',
   borderBottomColor : '#FFF',
   borderBottomWidth : 2 ,
  },
  mainText : {
   
    fontSize : wp(4.8) ,
    marginLeft : wp(6),
    fontFamily : fonts.primaryRegular,
    color : colors.gray,
    alignSelf : 'flex-start'
  },
  subText : {
    fontSize : wp(4) ,
    marginLeft : wp(2),
    fontFamily : fonts.primaryRegular,
    alignSelf : 'flex-start',
    color : colors.gray,
    
  },
  menuImg : {
    height : hp(3.5),
    width : hp(3.5),
    alignSelf : 'center'
  },
  title : {
    
    paddingTop : hp(2),
    color : colors.white,
  },
  header : {
    paddingHorizontal : wp(5) , 
    backgroundColor : colors.primary,
    // borderBottomEndRadius : 20,
    // borderBottomStartRadius : 20 ,
    paddingBottom : hp(1),
  
  },
});
