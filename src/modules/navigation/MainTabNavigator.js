/* eslint-disable import/no-unresolved */
import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator  } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, fonts } from '../../styles';

import HomeScreen from '../home/HomeViewContainer';
import ChatScreen from '../chat/ChatViewContainer';
import ProfileScreen from '../profile/ProfileView';
import PagesScreen from '../pages/PagesViewContainer';
import ComponentsScreen from '../components/ComponentsViewContainer';
import ServicelistScreen from '../servicelist/ServicelistViewContainer';


const hederBackground = require('../../../assets/images/topBarBg.png');

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

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      },
    },

    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        header: (
          <View style={styles.headerContainer}>
            <Image style={styles.headerImage} source={hederBackground} />
            <Text style={styles.headerCaption}>Pages</Text>
          </View>
        ),
      },
    },
   
    Chat : {
      screen: ChatScreen,
      navigationOptions: {
        header: (
          <View style={styles.headerContainer}>
            <Image style={styles.headerImage} source={hederBackground} />
            <Text style={styles.headerCaption}>Pages</Text>
          </View>
        ),
      },
    },
    Components: {
      screen: ComponentsScreen,
      navigationOptions: {
        header: (
          <View style={styles.headerContainer}>
            <Image style={styles.headerImage} source={hederBackground} />
            <Text style={styles.headerCaption}>Components</Text>
          </View>
        ),
      },
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconSource;
        switch (routeName) {
          case 'Home':
            iconSource = "home";
            break;
          case 'Chat':
            iconSource = "message";
            break;
          case 'Profile':
            iconSource = "person";
            break;
          case 'Components':
            iconSource = "menu";
            break;
          default:
            iconSource = iconGrids;
        }
        return (
          <View style={styles.tabBarItemContainer}>
             <Icon
            
            name={iconSource}
            size={25}
            color={ (focused ) ? colors.primary : colors.primaryLight }
          />
            {/* <Image
              resizeMode="contain"
              source={iconSource}
              style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
            /> */}
          </View>
        );
      },
    }),
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: colors.white,
        borderTopWidth: 0.5,
        borderTopColor: '#d6d6d6',
      },
      labelStyle: {
        color: colors.grey,
      },
    },
  },
);
