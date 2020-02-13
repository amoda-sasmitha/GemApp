import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text , Image, TouchableOpacity, Dimensions } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import firebase from '../../config/firebase';
import MainTabNavigator from './MainTabNavigator';
import AdTabNavigator from './AdTabNavigator';
import CalendarScreen from '../calendar/CalendarViewContainer';
import GalleryScreen from '../gallery/GalleryViewContainer';
import ProfileScreen from '../profile/ProfileViewContainer';
import ProfileView from '../profileView/ProfileViewViewContainer';
import ArticleScreen from '../article/ArticleViewContainer';
import ChatScreen from '../chat/ChatViewContainer';
import MessagesScreen from '../chat/MessagesViewContainer';
import ChartsScreen from '../charts/ChartsViewContainer';
import AuthScreen from '../auth/AuthViewContainer';
import GridsScreen from '../grids/GridsViewContainer';
import OnBoardingScreen from '../onBoarding/OnBoardingViewContainer';
import Emailverfy from '../emailVerify/EmailVerifyViewContainer';
import ResetPassword from '../resetPassword/ResetPasswordViewContainer';
import AddServices from '../addServices/AddServicesViewContainer';
import EditProfile from '../editProfile/EditProfileViewContainer';
import ServiceList from '../servicelist/ServicelistViewContainer';
import AdList from '../adlist/AdlistViewContainer';
import Newslist from '../newsList/NewsListViewContainer';
import PrivateNewslist from '../newsList/PrivateNewsListViewContainer';
import News from '../news/NewsViewContainer';
import AddNews from '../addNews/AddNewsViewContainer';
import AddAdvertisement from '../addAdvertisement/AddAdvertisementView';
import Advertisement from '../advertisement/AdvertisementViewContainer';

import LoadingScreen from '../loadingScreen/LoadingScreenViewContainer';
import { colors, fonts } from '../../styles';
import EmailVerifyScreen from '../emailVerify/EmailVerifyView';

const { width } = Dimensions.get('window');

const headerBackground = require('../../../assets/images/topBarBg.png');



const stackNavigator = createStackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
      navigationOptions: {
        header : null,
      },
    },
    Advertisement: {
      screen: AdTabNavigator,
      navigationOptions: {
        header : null,
      },
    },
    Calendar: {
      screen: CalendarScreen,
      
    },
    AdList: {
      screen: AdList,
      navigationOptions: {
        header : null,
      },
     
    },
    ProfileView: {
      screen: ProfileView,
      navigationOptions: {
        title: 'Profile',
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontFamily : fonts.primaryBold,
           marginHorizontal : 0 ,
        },        
        headerStyle: {
          backgroundColor: colors.primary,
          borderBottomWidth: 0,
        },
      },
     
    },
    Advertisement: {
      screen : Advertisement,
      navigationOptions: {
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontFamily : fonts.primaryBold,
           marginHorizontal : 0 ,
        },        
        headerStyle: {
          backgroundColor: colors.primary,
          borderBottomWidth: 0,
        },
      },
    },
    editProfile: {
      screen: EditProfile,
      navigationOptions: {
        title: 'Edit Profile',
        headerTintColor: colors.primary,
        headerTitleStyle: {
          fontFamily : fonts.primaryBold
        },        
      },
     
      
    },
    News: {
      screen: News,
      navigationOptions: {
       header : null,   
      },
     
      
    },
    Emailverify: {
      screen: EmailVerifyScreen,
      navigationOptions: {
        header: null,      
      },
    },
    addServices: {
      screen: AddServices,
      navigationOptions: {
        header: null,      
      },
    },
    Reset: {
      screen: ResetPassword,
      navigationOptions: {
        header: null,      
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Profile',
      },
      // navigationOptions: {
      //   header: null,
       
      // },
    },
    ServiceList : {
      screen : ServiceList,
      navigationOptions: {
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontFamily : fonts.primaryBold,
           marginHorizontal : 0 ,
        },        
        headerStyle: {
          backgroundColor: colors.primary,
          borderBottomWidth: 0,
        },
      },
    },
    Newslist : {
      screen : Newslist,
      navigationOptions: {
        title : 'News',
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontFamily : fonts.primaryBold,
          marginHorizontal : 0 ,
        
        },        
        headerStyle: {
          backgroundColor: colors.primary,
          elevation : 0 ,
          shadowOpacity: 0,
        },
      },
    },
    PrivateNewslist : {
      screen : PrivateNewslist,
      navigationOptions: {
        title : 'My News',
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontFamily : fonts.primaryBold,
          marginHorizontal : 0 ,
        
        },        
        headerStyle: {
          backgroundColor: colors.primary,
          elevation : 0 ,
          shadowOpacity: 0,
        },
      },
    },
    AddNews : {
      screen : AddNews,
      navigationOptions: {
        header : null,
       
      },
    },
    AddAdvertisement : {
      screen : AddAdvertisement,
      navigationOptions: {
        header : null,
       
      },
    },
    Gallery: {
      screen: GalleryScreen,
      navigationOptions: {
        title: 'Gallery',
      },
    },
    Article: {
      screen: ArticleScreen,
      navigationOptions: {
        title: 'Article',
      },
    },
    OnBoarding : {
      screen : OnBoardingScreen,
      navigationOptions: {
        header: null,
      },
    },
    
    Messages: {
      screen: MessagesScreen,
      navigationOptions: {
        title: 'Messages',
      },
    },
    Charts: {
      screen: ChartsScreen,
      navigationOptions: {
        title: 'Charts',
      },
    },
    Grids: {
      screen: GridsScreen,
      navigationOptions: {
        header: null,
       
      },
    },
    Loading: {
      screen: LoadingScreen,
      navigationOptions: {
        header: null,
      },
    },
   
    Auth: {
      screen: AuthScreen,
      navigationOptions: {
        header: null,
       
      },
    },
  },
  {
    initialRouteName: 'Loading',
  },
  {
    defaultNavigationOptions: () => ({
      titleStyle: {
        fontFamily: fonts.primaryLight,
      },
      headerStyle: {
        backgroundColor: colors.primary,
        borderBottomWidth: 0,
      },
      headerBackground: (
        <Image
          style={{ flex: 1 }}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTitleStyle: {
        color: colors.white,
        fontFamily: fonts.primaryRegular,
      },
      headerTintColor: '#222222',
      headerLeft: props => (
        <TouchableOpacity
          onPress={props.onPress}
          style={{
            paddingLeft: 25,
          }}
        >
          <Image
            source={require('../../../assets/images/icons/arrow-back.png')}
            resizeMode="contain"
            style={{
              height: 20,
            }}
          />
        </TouchableOpacity>
      ),
    }),
  },
  
);

export default createAppContainer(stackNavigator);
