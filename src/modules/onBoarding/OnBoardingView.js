// @flow
import React from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native-ui-lib';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ActivityIndicator ,Alert , StatusBar } from 'react-native';
import firebase from '../../config/firebase';
import Onboarding from 'react-native-onboarding-swiper';
import { fonts, colors } from '../../styles';

export default class OnBoarding extends React.Component {

  donefunction =  () => {
    this.props.navigation.navigate({ routeName: 'Main' });
  }
  
  render() {
    return (
      <View>
          <StatusBar backgroundColor={colors.primary} barStyle='light-content' />
          <Onboarding
    pages={[
      {
        backgroundColor: '#fff',
        image: <Image  source={require('../../../assets/images/onboarding_1.png')} />,
        title: 'Simple Dashboard',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id mauris aliquet,. Maecenas pretium nunc ac ipsum sodales sollicitudin. Mauris nec scelerisque enim.  ',
      },
      {
        backgroundColor: '#Fff',
        image: <Image   source={require('../../../assets/images/onboarding_2.png')}  />,
        title: 'Manageable Content',
        subtitle: "Etiam viverra ante a lacus pretium porta. Mauris non iaculis lectus.  Nullam maximus odio sed mauris rhoncus.",
      },
      {
        backgroundColor: '#Fff',
        image: <Image  source={require('../../../assets/images/onboarding_3.png')}  />,
        title: 'Reusable Resources',
        subtitle: "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus., nec facilisis ante dictum non. Donec aliquam lobortis pretium",
      },
    ]}
    imageContainerStyles={{height : hp(45)}}
    titleStyles={{color: colors.gray , fontFamily: fonts.primarySemiBold, fontSize: 24 , paddingBottom : hp(1) }}
    subTitleStyles={{color: colors.gray,
      paddingHorizontal : wp(4) ,   
      paddingBottom : hp(10), 
      fontFamily: fonts.primaryLight,
      fontSize: 17,}}
      bottomBarHighlight={false}
      transitionAnimationDuration={100}
      onSkip={this.donefunction}
      controlStatusBar={false}
      onDone={this.donefunction}
  />
  </View>
     
    );
  }
 
}