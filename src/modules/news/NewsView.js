// @flow
import React from 'react';
import {  TouchableOpacity , ScrollView,  Text , View , Image , StyleSheet , StatusBar, ImageBackground } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { fonts, colors } from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class News extends React.Component {
  state = {
    isScrolledTop : false,
    news : {},
  }
  componentWillMount(){
    console.log(this.props.navigation.state.params);
    this.setState({news : this.props.navigation.state.params});

    var dateTime = new Date(1370001284000);
    console.log(dateTime.toISOString());
  }

  handleScroll = (event) => {
    if (hp(30) < event.nativeEvent.contentOffset.y  && !this.state.isScrolledTop ) {
      console.log("true called");
       this.setState({ isScrolledTop : true});
    }else if( hp(30) > event.nativeEvent.contentOffset.y  && this.state.isScrolledTop  ){
      console.log("false called");
      this.setState({ isScrolledTop : false});
    } 
   }

  render() {
    const {isScrolledTop , news } = this.state;
    var dateTime = new Date(news.postedat * 1000);
    return(
      <View>
         <StatusBar backgroundColor={colors.primary} barStyle={'light-content' } />
        <ScrollView
          style={styles.fill} stickyHeaderIndices={[1]} 
          scrollEventThrottle={16}
          onScroll={this.handleScroll}
        >
        { news.img.length > 0 ?
        <ImageBackground style={styles.mainImage} 
          source={{uri : news.img }} />
        : <ImageBackground style={styles.mainImage} 
        source={require('../../../assets/images/news-default.jpg')}  />
      }


        <View style={[styles.wrapper , isScrolledTop ? styles.scrolledTop : styles.notScrolledTop ]}>    
          <View style={{flexDirection : 'row'}}>
          <TouchableOpacity  style={styles.icon} onPress={() => this.props.navigation.goBack(null)}>
          <Icon name={'chevron-left'} size={25} color={colors.gray}/>
         </TouchableOpacity>
    <Text style={styles.Title}>{news.title}</Text>
        </View>
        </View>
        <View style={{flexDirection : 'row', alignItems : 'center' , paddingHorizontal : wp(4) , paddingVertical : hp(0.5) }}>
        <Icon name={'paperclip'} size={16} color={colors.grey}/>
        <Text style={styles.writer}>{news.name.replace(/ .*/,'')}</Text>
        <View style={{flexDirection: 'column' , flex : 1 ,  alignItems : 'flex-start'}} >
          <View style={{alignSelf : 'flex-end' , flexDirection : 'row' , alignItems : 'center'  }}>
            <Icon style={{alignSelf : 'flex-end'}}  name={'calendar'} size={15} color={colors.grey}/>
            <Text style={styles.date}>{ dateTime.toISOString().substring(0, 10) }</Text>
          </View>
        </View>
        </View>
       

        <View style={styles.hr}></View>

         <Text style={styles.description}>
        { news.description }
        { news.description }
        </Text>
        
        </ScrollView>  
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  fill: {
  
  },
  mainImage : {
    height : hp(35),
    
  },
  wrapper : {
    paddingHorizontal : wp(5), 
    marginTop : -hp(5),
   
   
  },
  hr: {
    borderBottomColor: '#F4F4F4',
    borderBottomWidth: 2,
    marginHorizontal : wp(4),
    marginTop: hp(0.5),
    
  },
  writer : {
    color : colors.grey,
    fontFamily : fonts.primaryRegular,
    fontSize : hp(2.3),
    paddingLeft : wp(1.5),
  },
  date : {
    color : colors.grey,
    fontFamily : fonts.primaryRegular,
    fontSize : hp(2),
    paddingLeft : wp(2),
   
  },
  scrolledTop : {
    borderTopLeftRadius : 0,
    borderTopRightRadius : 0,
    borderColor : '#F4F4F4',
    borderBottomWidth : 2,
    elevation : 2,
    backgroundColor : colors.white,
  },
  notScrolledTop : {
    paddingTop : hp(1.5),
    borderTopLeftRadius : hp(3),
    borderTopRightRadius :hp(3),
    borderColor : '#FFFFFF',
    borderBottomWidth : 0,
    elevation : 0,
    backgroundColor : colors.white,
  },


  description : {
    paddingTop : hp(1.5),
    color : colors.gray,
    fontSize : wp(4.3),
    fontFamily : fonts.primaryRegular,
    paddingHorizontal : wp(5),
    textAlign : "left",
    lineHeight : hp(3.8),
    paddingBottom : hp(4)
  
  },
  icon : {
    paddingVertical : hp(1),
    alignSelf : 'center'
  },
 Title: {
  textAlign : "left",
  paddingHorizontal : wp(4),
    paddingVertical : hp(1),
    fontFamily:  fonts.primaryBold,
    fontSize: wp(4.7),
    color: '#5F5F5F',
  },
  itemTwoSubTitle: {
    flex : 1,
    alignSelf : 'flex-end',
    color: colors.grey,
    marginBottom : hp(5),
    fontFamily: fonts.primaryBold,
    fontSize: wp(3),
    paddingHorizontal : wp(5),
  }
});