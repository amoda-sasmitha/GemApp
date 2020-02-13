// @flow
import React from 'react';
import { Text , 
  View, StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { colors , fonts} from '../styles';



export default function RNSCard({
  title,
  description,
  activecolor,
  service
}) {

  return (
    <View  style={(service) ? styles.serviceActive : styles.service }>
    <View style={{flexDirection : 'row' ,}}>
    <Icon style={{alignSelf : 'flex-end', marginRight : 10 }}  name={'diamond'} size={18} color={colors.primary}/>
      <Text  style={[styles.serviceTitle , { color : (service) ? colors.gray : colors.gray  , 
       fontWeight : (service) ? 'bold' : 'normal' }
       ]}>{title} </Text>
      <View style={{flexDirection: 'column' , alignItems : 'flex-start'}} >
      { service ? 
      <Icon style={{alignSelf : 'flex-end'}}  name={'check-circle'} size={22} color='#2ecc71'/>
      : <View></View>
    }
      </View>
    </View>
  { service ? 
    <Text  style={[styles.servieDescription , { color : (service) ? colors.gray : colors.darkGray } ]}>
    { description}
    </Text>
  : <View></View>
  }
  </View>
);
}
const styles = StyleSheet.create({
  serviceTitle : {
    flex : 1,
    fontSize : wp(4.6) ,
  },
  service : {
    borderColor : colors.grey,
    borderWidth : 0.2,
    backgroundColor : '#FCFCFC',
    width :   wp(88) ,
    paddingVertical : hp(1.5),
    paddingHorizontal : wp(4),
    borderRadius : 5 ,
    marginVertical : hp(1),
    elevation : 0,
  },
  serviceActive : {
    elevation : 3,
    borderColor : colors.grey,
    borderWidth : 0.5,
    backgroundColor : '#F4F4F4',
    width :   wp(88) ,
    paddingVertical : hp(1),
    paddingHorizontal : wp(4),
    borderRadius : 5 ,
    marginVertical : hp(1),
    elevation : 0,
  },
  servieDescription : {
    color: colors.darkGray,
    fontSize : wp(4.2) ,
    marginVertical : hp(1),
  },
});
