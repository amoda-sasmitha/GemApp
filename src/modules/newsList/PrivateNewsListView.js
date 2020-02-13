// @flow
import React from 'react';
import { TouchableNativeFeedback , Button,RefreshControl, SafeAreaView, Linking ,StatusBar ,  Dimensions , Image , FlatList ,  View , Text , Flatlist  ,StyleSheet , TouchableOpacity , Alert } from 'react-native';
import { colors, fonts } from '../../styles';
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import  env  from '../../config/env';
import firebase from '../../config/firebase';
import axios from 'axios';

export default class PrivateNewslist extends React.Component {

  state = {
    user : null,
    news : [],
    isloading : true,
    isFetching : false,
  }

_openArticle = article => {
  this.props.navigation.navigate({
    routeName: 'News',
    params: { ...article },
  });
};

UNSAFE_componentWillMount(){
  console.log("Called");
    this.setState({isFetching : true});
  const user = firebase.auth().currentUser;
  this.setState({user});
}



deleteNews = news => {
  Alert.alert(
      'Delete News',
      'Are you sure you want to delete this news?', [{
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
      }, {
          text: 'OK',
          onPress: () => this.delete(news)
      }, ], {
          cancelable: false
      }
   )
} 

delete = (news) => {
  this.setState({isFetching : true});
  axios.delete(`${env.API_URL}/news/${news.id}`)
  .then( data => {
    this.getNewsFromAPI();
  }).catch ( error => {
    console.log(error);
    this.setState({isFetching : false});
  });
}

MyLoader = () => (
  <ContentLoader width={wp(96)}
  primaryColor="#ffffff"
  secondaryColor="#f5f5f5"
  height={hp(60)} speed={1} ariaLabel="Loading news...">
  <Rect x={wp(4)} y={hp(2)} rx="10" ry="10" width={wp(92)} height={hp(17)} />
  <Rect x={wp(4)} y={hp(21)} rx="10" ry="10" width={wp(92)}  height={hp(17)} />
  <Rect x={wp(4)} y={hp(40)} rx="10" ry="10" width={wp(92)} height={hp(17)} /> 
</ContentLoader>
)


renderRowThree = ({ item , index }) => (
  <TouchableOpacity
    key={item.id}
    style={styles.itemThreeContainer}
    onPress={() => this._openArticle(item)}
    activeOpacity={0.7}
  >
    <View style={styles.itemThreeSubContainer}>
      { (item.img.length  > 0 ) ?  
      <Image source={{ uri: item.img }} style={styles.itemThreeImage} />
        : <Image source={require('../../../assets/images/news-default.png')} style={styles.itemThreeImage} /> }
      <View style={ (true) ? styles.itemThreeContentLeft : styles.itemThreeContentRight}>
        <View>
          <Text style={styles.itemThreeTitle}>{item.title}</Text>
          <View style={{flexDirection : 'row'}}>
          <Text style={styles.itemThreeSubtitle} numberOfLines={2}>
            {item.description}
          </Text>  
      {!item.ispublished && <TouchableOpacity  style={styles.deleteBtn}  onPress={ () => this.deleteNews(item)}>
      <Icon name={'trash'} size={20} color={colors.gray}/>
      </TouchableOpacity>
      }      
        </View>
      
        </View>
      </View>
     
    </View>
    { !(item.ispublished) &&
    <View style={[styles.badge , { backgroundColor : ( item.ispublished) ? colors.green  : colors.blue }] }>
<Text style={styles.badgetext}>{ ( item.ispublished) ? "Published" : "Pending" }</Text>
    </View>
    }
  </TouchableOpacity>
);


async componentDidMount() {
    const newsStorage = await AsyncStorage.getItem('mynews');  
    if(!newsStorage) {
      this.getNewsFromAPI();
        
    }else{
      console.log("Got");
        this.getNews();
    }
 
}

onRefresh(){
  this.setState({ isFetching: true }, function() {  this.getNewsFromAPI(); });     
}

getNewsFromAPI = async()=> {
  try {
   

    axios.get(`${env.API_URL}/news/user/${this.state.user.uid}`)
    .then(res => {
      const news = res.data;
      this.setState({news:news, isloading:false , isFetching : false });
      AsyncStorage.setItem('mynews', JSON.stringify(news) ).then( () => {
        console.log("set");
      }).catch( error => {
        console.log("Failed 01 : "+ error);
      })
    });
    
  } catch(e) {
    console.warn("fetch Error: ", e)
 }
}

notFound = () => (
  <View  style={[styles.itemThreeContainer , { marginTop : hp(2), paddingVertical : hp(2) , alignItems : 'center' }]}>
  <View style={{alignItems : 'center' }} >
  
     <Image source={require('../../../assets/images/no-results-found.png')} style={styles.itemThreeImage} />
   
    <View style={{alignItems : 'center' }}>
      <View style={{alignItems : 'center' }} >
        <Text style={styles.itemThreeTitle}>{'Sorry, no personal news found'}</Text>
       
        {/* <TouchableNativeFeedback onPress={() => this.props.navigation.navigate({routeName : 'AddNews' }) }>
          <View  style={styles.CreateButton} >
        <Text style={styles.CreateButtonText}>{'Lets Create News'}</Text>
        </View>
        </TouchableNativeFeedback> */}
      </View>
      
    </View>
  </View>
  </View>
);



getNews = async()=> {
  try {
      data = JSON.parse(await AsyncStorage.getItem('mynews'));
     
      this.setState({news:data , isloading:false})
//
      axios.get(`${env.API_URL}/news/user/${this.state.user.uid}`)
    .then(res => {
      let news = res.data;
      this.setState({news:news, isloading:false , isFetching : false});
      
      if( JSON.stringify(news) !=  JSON.stringify(data) ){
      AsyncStorage.setItem('mynews',  JSON.stringify(news) ).then( () => {
        console.log("set");
      }).catch( error => {
        console.log("Failed 02 : " + error );
      })

    }
    });
  }
  catch (error) {
    console.error(error);
  }
}


  render(){
     let news = this.state.news;
     const { isloading } = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primary} barStyle='light-content' />
        <ScrollView alwaysBounceVertical={false} 
        refreshControl={<RefreshControl refreshing={this.state.isFetching} onRefresh={() => this.onRefresh()} />} >
      
        { ( !isloading && this.state.news.length == 0  ) ?
          <this.notFound/> : <View></View>  }

         <View style={styles.mainContainer}>

         {  ( isloading ) ?
          <this.MyLoader/> 
          :
          <View>
        <FlatList
          scrollEnabled={false}
          style={{
            backgroundColor: "#F5F5F5",
            paddingVertical: 5 ,}}
          data={news}
          renderItem={this.renderRowThree}
        />
       
        </View>
         }
        
         </View>
         </ScrollView>
         <TouchableOpacity onPress={() => this.props.navigation.navigate({routeName : 'AddNews' }) } style={styles.floatingBtn} >
   <Icon name="plus"  size={18} color={colors.white} />
  </TouchableOpacity>
      </View>
      </SafeAreaView>
      );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
   
  },
  itemTwoContainer: {
    paddingBottom: 10,
    marginHorizontal : wp(4) ,
    backgroundColor : colors.white,
    borderRadius: 10,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
   marginTop : hp(2),
   
  },
  itemTwoContainerX: {
    paddingBottom: 10,
    marginHorizontal : wp(4) ,
    backgroundColor : colors.white,
    borderRadius: 10,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
   marginTop : hp(2),
   
  },
  headerbg :{
    backgroundColor : colors.primary,
    height : hp(25),
  },  
  mainContainer : {
    flex : 1 ,
  },
  imgright : {
    height : hp(3),
    width : hp(3),
    borderRadius : hp(3) / 2 ,
    marginHorizontal : wp(2),
    
  },
  itemTwoTitle: {
    
    alignSelf : 'flex-start',
    color: colors.gray,
    fontFamily: fonts.primaryBold,
    fontSize: wp(4.5),
    paddingVertical : hp(0.5),
    paddingHorizontal : wp(2),
  },
  itemTwoSubTitle: {
    flex : 1,
    color: colors.grey,
    fontFamily: fonts.primaryRegular,
    fontSize: wp(3.8),
    paddingHorizontal : wp(2),
  },
  itemTwoPrice: {
    color: colors.grey,
    fontFamily: fonts.primaryBold,
    fontSize: wp(4),
    paddingHorizontal : wp(2),
  },
  floatingBtn : {
    width: 50,  
    height: 50,   
    borderRadius: 30,            
    backgroundColor: colors.primary,  
    alignItems : 'center',
    justifyContent : 'center',                                  
    position: 'absolute',                                          
    bottom: 15,                                                    
    right: 15, 
  },
  itemTwoImage: {
    height : hp(20),
    borderTopLeftRadius : 10 ,
    borderTopRightRadius : 10 ,
  },
  badge : {
    position : 'absolute',
    top : 0,
    left : 0 ,
    borderTopLeftRadius : 10 ,
    borderBottomRightRadius : 10 ,
  },
  badgetext : {
    paddingHorizontal : wp(2),
    paddingVertical : hp(0.2),
    color : colors.white,
  fontFamily : fonts.primaryBold,
   
  },
  itemThreeContainer: {
    marginHorizontal : wp(4) , 
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    marginVertical: 6,
  },
  itemThreeSubContainer: {
    flexDirection: 'row',
    paddingVertical: hp(1.5),
  },
  itemThreeImage: {
    height: wp(28),
    width: wp(28),
    borderRadius: 10,
  },
  itemThreeContentLeft: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  itemThreeContentRight: {
    flex: 1,
    paddingRight: 15,
    justifyContent: 'space-between',
  },
  itemThreeBrand: {
    fontFamily: fonts.primaryRegular,
    fontSize: 14,
    color: '#617ae1',
  },
  itemThreeTitle: {
    
    fontFamily: fonts.primaryBold,
    fontSize: wp(4.3),
    color: '#5F5F5F',
  },
  itemThreeSubtitle: {
    flex : 1, 
    fontFamily: fonts.primaryRegular,
    fontSize: 14,
    color: '#a4a4a4',
  },
  itemThreeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemThreePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    color: '#5f5f5f',
    textAlign: 'right',
  },
  itemThreeHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e3e3e3',
    marginRight: -15,
  },
  CreateButton : {
    backgroundColor : colors.blue,
    paddingVertical : hp(0.5),
    paddingHorizontal : wp(4),
    marginTop : hp(1) ,
    borderRadius : 6,
  },
  CreateButtonText : {
    color : colors.white,
    fontSize : hp(2.5),
    fontFamily : fonts.primaryBold , 
  },
  deleteBtn : {
    paddingHorizontal : wp(1),
    alignSelf : 'flex-end',
  }
 
});
