// @flow
import React from 'react';
import { View as ViewTypeTwo,
} from 'react-native-ui-lib';
import { ActivityIndicator , Linking ,  Dimensions , Image , FlatList ,  View , Text , Flatlist  ,StyleSheet , TouchableOpacity , Alert } from 'react-native';
import { colors, fonts } from '../../styles';
import { Button } from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import  env  from '../../config/env';
import axios from 'axios';


export default class ServiceList extends React.Component {

  _isMounted = false;
  
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params ==='undefined' || navigation.state.params.title === 'undefined' ? 'Home': navigation.state.params.title
  });

  state = {
    isFetching : false ,
    serviceid : 'buying',
    service : [],
    isloading : true,
  }

  componentWillMount(){
    console.log(this.props.navigation.getParam('id', '-'));
    this.setState({serviceid : this.props.navigation.getParam( 'id' , '-') });
  }

  async componentDidMount() {
    this._isMounted = true;

    const { serviceid } = this.state;
    const serviceStorage = await AsyncStorage.getItem( serviceid );  
    if( !serviceStorage ) {
      this.getServiceDataFromAPI(serviceid);
        
    }else{
      console.log("Got");
        this.getServiceData(serviceid);
    }
 
}

componentWillUnmount() {
  this._isMounted = false;
}

getServiceDataFromAPI = async(serviceid)=> {
 
  
    axios.get(`${env.API_URL}/services/${serviceid}`)
    .then(res => {
      const serviceData = res.data;
      this.setState({service : serviceData, isloading:false , isFetching : false });

      AsyncStorage.setItem(serviceid , JSON.stringify(serviceData) ).then( () => {
        console.log("set");
      }).catch( error => {
        console.log("Failed 01 : "+ error);
      })

    }).catch( error => {
      Alert.alert("Failed !" , error.message);
      this.setState({isloading : false , isFetching : false });
    });
    
 
}

getServiceData = async(serviceid)=> {
  try {
    data = JSON.parse(await AsyncStorage.getItem(serviceid));
     
      this.setState({service : data , isloading:false})
//
      axios.get(`${env.API_URL}/services/${serviceid}`)
    .then(res => {
      let serviceData = res.data;
      this.setState({ service : serviceData, isloading:false });
      
      if( JSON.stringify(serviceData) !=  JSON.stringify(data) ){
      AsyncStorage.setItem(serviceid ,  JSON.stringify(serviceData) ).then( () => {
        console.log("set");
      }).catch( error => {
        console.log("Failed 02 : " + error );
      })

    }
    }).catch( error => {
     // Alert.alert("Failed !" , error.message);
      this.setState({isloading : false });
    });
  }
  catch (error) {
    console.error(error);
  }
}

onRefresh(){
  const { serviceid } = this.state;
  this.setState({ isFetching: true }, function() {  this.getServiceDataFromAPI(serviceid); });
     
}
 

_openArticle = article => {
  this.props.navigation.navigate({
    routeName: 'ProfileView',
    params: { ...article },
  });
};

renderRowThree = ({ item }) => (
  <TouchableOpacity
    key={item.id}
    style={styles.itemThreeContainer}
    onPress={() => this._openArticle(item)}
    activeOpacity={0.7}
  >
    <View style={styles.itemThreeSubContainer}>
      { ( item.profilepic.length > 3 ) ? 
      <Image source={{ uri: item.profilepic }} style={styles.itemThreeImage} />
      : <Image source={require('../../../assets/images/av.png')} style={styles.itemThreeImage} />
      }
      <View style={styles.itemThreeContent}>
        <View>
          <Text style={styles.itemThreeTitle}>{item.name}</Text>
          <Text style={styles.itemThreeSubtitle} numberOfLines={2}>
            {item.description}
          </Text>
            <View style={{flexDirection : 'row'}}>
          <TouchableOpacity style={styles.morebtnTouch} onPress={ () => this._calluser(item.phone) } >
          <Icon name={"phone"} style={{alignSelf : 'center'}} size={16} color='#FFF'/>
        <Text style={[styles.morebtn ]}>Call</Text>
        </TouchableOpacity>
        
        </View>
        </View>
        
      </View>
    </View>
  </TouchableOpacity>
);

  notFound = () => (
    <View  style={[styles.itemThreeContainer , { marginTop : hp(2), paddingBottom : hp(2) , alignItems : 'center' }]}>
    <View style={{alignItems : 'center' }} >
    
       <Image source={require('../../../assets/images/no-results-found.png')} style={styles.itemThreeImage} />
     
      <View style={{alignItems : 'center' }}>
        <View style={{alignItems : 'center' }} >
          <Text style={styles.itemThreeTitle}>{'Sorry, no user found'}</Text>
          <Text style={styles.itemThreeSubtitle} numberOfLines={2}>
           {'there is no users available for this category'}
          </Text>
        </View>
        
      </View>
    </View>
    </View>
  );

  loading = () => (
<ViewTypeTwo flex style={{paddingVertical:hp(4)}} centerH >
     <ActivityIndicator size={30} color={colors.primary}></ActivityIndicator>
    </ViewTypeTwo>
  );

  render(){
    const { service , isloading } = this.state;
    return(
      <View style={styles.container}>
        { 
          isloading && <this.loading/>
        }


        {  !isloading && service.length == 0 && (
          <this.notFound/>)  }
        <FlatList
        refreshing={this.state.isFetching}
          onRefresh={() => this.onRefresh()}
          style={{
            backgroundColor: "#F5F5F5",
            paddingVertical: 5 ,

          }}
          data={service}
          renderItem={this.renderRowThree}
        />
      </View>
      );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
   
  },
  tabsContainer: {
    alignSelf: 'stretch',
    marginTop: 30,
  },
  itemOneContainer: {
    flex: 1,
    width: Dimensions.get('window').width / 2 - 25,
    borderRadius: 10,
    backgroundColor: colors.white,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 8,
  },
  itemOneImageContainer: {
    borderRadius: 3,
    overflow: 'hidden',
  },
  itemOneImage: {
    height: 150,
    width: Dimensions.get('window').width / 2 - 45,
    borderRadius: 10,
  },
  itemOneTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  morebtnTouch : {
    backgroundColor : colors.blue,
    flexDirection : 'row',
    marginTop : hp(1.5),
    borderRadius : 4,
    paddingHorizontal : wp(4),
  },
  morebtn : {
   paddingVertical : hp(0.5),
    paddingLeft : wp(2),
    alignSelf : 'flex-start',
   
    fontSize : 14 ,
    color : colors.white,
    fontFamily : fonts.primaryBold,
  },
  itemOneSubTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 13,
    color: '#B2B2B2',
    marginVertical: 3,
  },
  itemOnePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemOneRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  itemOneContent: {
    marginTop: 5,
    marginBottom: 10,
  },
  itemTwoContainer: {
    paddingBottom: 10,
    backgroundColor: colors.whiteTwo,
    marginVertical: 5,
  },
  itemTwoContent: {
    padding: 20,
    position: 'relative',
    marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
    height: 150,
  },
  itemTwoTitle: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoSubTitle: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,
  },
  itemTwoPrice: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  itemTwoOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
  },
  itemThreeContainer: {
    marginHorizontal : wp(4) , 
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 5,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 6,
  },
  itemThreeSubContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  itemThreeImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  itemThreeContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  itemThreeBrand: {
    fontFamily: fonts.primaryRegular,
    fontSize: 14,
    color: '#617ae1',
  },
  itemThreeTitle: {
    
    fontFamily: fonts.primaryBold,
    fontSize: 16,
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
  badge: {
    backgroundColor: colors.labelTwo,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
