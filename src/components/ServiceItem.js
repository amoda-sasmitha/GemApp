// @flow
import React from 'react';
import { Text , 
  View, StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { colors , fonts} from '../styles';



export default function RNSCard({
  name,
  icon,
  size
}) {

  return (
  <View style={styles.serviceItem}>
  <Text>
    <Icon name={icon} size={size == 'large' ? 20 : 16 } color='#2d98da'/>
  </Text>
<Text style={[styles.serviceTitle , { fontSize: size == 'large' ? 15 : 14, }]}> { name}</Text>
</View>
);
}
const styles = StyleSheet.create({
  servicesText : {
   marginTop : hp(1),
    fontFamily : fonts.primaryBold,
    color : colors.gray,
    fontSize : 18 ,
  },
  serviceItem : {
   //marginTop : hp(0.1),
    borderRadius : 5 ,
    flexDirection : 'row' , 
    padding : hp(0.5),
    borderColor: '#e3e3e399',
   // borderWidth: 1,
  },
  serviceTitle: {
    color: colors.gray,
    fontFamily: fonts.primarySemiBold,
   
    opacity : 0.9 ,
    letterSpacing: 0.04,
    marginLeft : wp(1),
    //textAlign : "center",
  },
});
