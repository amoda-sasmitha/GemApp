// @flow
import React from 'react';
import { RefreshControl, SafeAreaView, Linking ,StatusBar ,  Dimensions , Image , FlatList ,  View , Text , Flatlist  ,StyleSheet , TouchableOpacity , Alert } from 'react-native';
import { colors, fonts } from '../../styles';
import { Button } from '../../components';
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import  env  from '../../config/env';
import axios from 'axios';

export default class Newslist extends React.Component {

  state = {
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

 MyLoader2 = () => (
  <ContentLoader width={wp(96)} style={{marginTop : -hp(25),}}
  primaryColor="#ffffff"
  secondaryColor="#f5f5f5"
  height={hp(32)} speed={1} ariaLabel="Loading news...">
  <Rect x={wp(4)} y={hp(2)} rx="10" ry="10" width={wp(92)} height={hp(30)} />
</ContentLoader>
)

renderfirstitem = () => {
  const item = this.state.news[0];
  const {isloading} = this.state;
  if(item){
  return isloading ?
  <this.MyLoader2/>
  : (
<TouchableOpacity onPress={() => this._openArticle(item)}
          style={styles.itemTwoContainerX}  activeOpacity={0.9}  >
          <View>
          { (item.img.length  > 0 ) ?  
            <Image style={styles.itemTwoImage} 
              source={{uri : (item) ? item.img : "" }} /> 
              :
              <Image source={require('../../../assets/images/news-default.png')}  style={styles.itemTwoImage} /> } 
            <Text style={styles.itemTwoTitle}  >{  (item) ? item.title : "" } </Text>
            <View style={{flexDirection : 'row' }}>
            <Text numberOfLines={2} style={styles.itemTwoSubTitle}>{  (item) ? item.description : ""  } </Text>
            <View style={{flexDirection: 'column' , alignItems : 'flex-start'}} >
            {/* <Image style={styles.imgright}  source={{uri : 'https://qph.fs.quoracdn.net/main-raw-334560474-jiusikianwgfwphrjrhjjknsbterpwqy.jpeg'}}/> */}
          </View>
          </View>
          </View>
        </TouchableOpacity>
);
  }else{
    return  (<View></View>);
  }
}

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
           {/* <Image style={styles.imgright}  source={{uri : 'https://qph.fs.quoracdn.net/main-raw-334560474-jiusikianwgfwphrjrhjjknsbterpwqy.jpeg'}}/> */}
        </View>
        </View>
      </View>
      { (false) ?  
      <Image source={{ uri: item.image }} style={styles.itemThreeImage} />
        : <View></View> }
    </View>
  </TouchableOpacity>
);


async componentDidMount() {
    const newsStorage = await AsyncStorage.getItem('news');  
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
    axios.get(`${env.API_URL}/news/published`)
    .then(res => {
      const news = res.data;
      this.setState({news:news, isloading:false , isFetching : false });
      AsyncStorage.setItem('news', JSON.stringify(news) ).then( () => {
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
  <View  style={[styles.itemThreeContainer , { marginTop : -hp(21), paddingVertical : hp(2) , alignItems : 'center' }]}>
  <View style={{alignItems : 'center' }} >
  
     <Image source={require('../../../assets/images/no-results-found.png')} style={styles.itemThreeImage} />
   
    <View style={{alignItems : 'center' }}>
      <View style={{alignItems : 'center' }} >
        <Text style={styles.itemThreeTitle}>{'Sorry, no news found'}</Text>
        <Text style={styles.itemThreeSubtitle} numberOfLines={2}>
         {'there is no news available right now'}
        </Text>
      </View>
      
    </View>
  </View>
  </View>
);


getNews = async()=> {
  try {
      data = JSON.parse(await AsyncStorage.getItem('news'));
     
      this.setState({news:data , isloading:false})
//
      axios.get(`${env.API_URL}/news/published`)
    .then(res => {
      let news = res.data;
      this.setState({news:news, isloading:false });
      
      if( JSON.stringify(news) !=  JSON.stringify(data) ){
      AsyncStorage.setItem('news',  JSON.stringify(news) ).then( () => {
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
     let news = this.state.news.filter( (s , i) =>  i != 0 );
     const { isloading } = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primary} barStyle='light-content' />
        <ScrollView alwaysBounceVertical={false} 
        refreshControl={<RefreshControl refreshing={this.state.isFetching} onRefresh={() => this.onRefresh()} />}
        
        >
        <View style={styles.headerbg}>
        </View>
        { ( !isloading && this.state.news.length == 0  ) ?
          <this.notFound/> : <View></View>  }
          
         <this.renderfirstitem/>
         <View style={styles.mainContainer}>

         {  ( isloading ) ?
          <this.MyLoader/> 
          :
        <FlatList
         scrollEnabled={false}
          style={{
            backgroundColor: "#F5F5F5",
            paddingVertical: 5 ,

          }}
          data={news}
          renderItem={this.renderRowThree}
        />
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
  floatingBtn : {
    width: 50,  
    height: 50,   
    elevation : 1 ,
    borderRadius: 30,            
    backgroundColor: colors.primary,  
    alignItems : 'center',
    justifyContent : 'center',                                  
    position: 'absolute',                                          
    bottom: 15,                                                    
    right: 15, 
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
   marginTop : -hp(25),
   
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
  itemTwoImage: {
    height : hp(20),
    borderTopLeftRadius : 10 ,
    borderTopRightRadius : 10 ,
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
 
});
