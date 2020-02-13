/* eslint-disable import/no-unresolved */
import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, fonts } from '../../styles';

import AdList from '../adlist/AdlistView';


const styles = StyleSheet.create({
  tabBarItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
    paddingHorizontal: 10,
  },
  tabBarIcon: {
    width: 28 ,
    height: 28,
  },
  tabBarIconFocused: {
    tintColor: colors.primary,
  },
  headerContainer: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
  },
  headerCaption: {
    fontFamily: fonts.primaryRegular,
    color: colors.white,
    fontSize: 18,
  },
});

export default createMaterialTopTabNavigator(
  {
    Buying: {
      screen: AdList ,
      navigationOptions: {
        header: null,
        title : "Buying",
      },
    },
    Selling : {
      screen: AdList ,
      navigationOptions: {
        header: null,
        title : "Selling",
      },
    },
  },
  {
    initialRouteName : 'Buying',
    tabBarPosition: 'top',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
    indicatorStyle: {
        backgroundColor: 'transparent',
    },
      showLabel: true,
      showIcon : false,
      style: {
        backgroundColor: colors.primary,
       
      },
      labelStyle: {
        fontFamily : fonts.primaryBold,
        color: colors.white,
        fontSize : 15,
      },
    },
  },
);
