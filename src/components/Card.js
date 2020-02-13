import React from 'react';
import { fonts, colors } from '../styles';
import {  Dimensions , ImageBackground , Image ,  TouchableOpacity, View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function RNSCard({
  firstone,
  image,
  name
}) {

  return (
    
    <View style={[styles.box  , (firstone) ? styles.firstone : styles.firstoneNo ]}>
                  <Image 
                      
                      style={styles.categoryImage} 
                      source={ image } />
       <Text numberOfLines={2} style={styles.categorytext}>{name}</Text>           
                  
              </View>
  );
}

const styles = {
  
  firstone : {
    marginStart: wp(5),
  }, 
 categoryImage : {
   width : '100%',
   height :  '75%',
   justifyContent : "flex-end",
   opacity: 1,
   borderRadius : 10 ,
 },

box :  {
  width :   wp(75) ,
  height : hp(35),
  borderRadius : 10 ,
 // elevation : 2 ,
 borderWidth: 1,
 borderColor: '#d6d7da',
  marginEnd : wp(3),
  paddingBottom : hp(2),
 },
 
categorytext : {
  fontSize:  wp(4),
  color : colors.gray,
  opacity : 0.8,
  textAlign : 'justify',
  fontFamily : fonts.primarySemiBold,
  paddingVertical : hp(1.2),
  paddingHorizontal : wp(2), 
  
}
};
