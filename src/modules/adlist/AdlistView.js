// @flow
import React from 'react';
import { FlatList ,TextInput, TouchableOpacity , ScrollView,  Text , View , Image , StyleSheet , StatusBar, ImageBackground } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { fonts, colors } from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RadioGroup , Card , Button , GridRow } from '../../components';

export default class News extends React.Component {
  state = {
    searchString : '',
   selectedIndex : 0,
   dataSet : [],
  }
  componentWillMount(){
    this.changeDataSet(0);
  }

  changeIndex = (index) => {
    this.changeDataSet(index);
  } 

  changeDataSet = (index) => {
    let data = [];
    (index == 0 ) ? data = listData.filter( item => !item.selling )
      :  data = listData.filter( item => item.selling )
    this.setState({ selectedIndex : index , dataSet : data});
  }

  _openArticle = article => {
    this.props.navigation.navigate({
      routeName: 'Advertisement',
      params: { ...article },
    });
  };

  renderRowOne = (rowData) => {   
    console.log(rowData);
    const cellViews = rowData.item.map( (item , index) => (
     
      <TouchableOpacity style={ (index != 0 ) ? styles.itemRight : styles.itemLeft } key={item.id} onPress={() => this._openArticle(item)} activeOpacity={0.8} >
        <View style={styles.itemOneContainer}>
          <View style={styles.itemOneImageContainer}>
            <Image style={styles.itemOneImage} source={{ uri: item.image }} />
          </View>
          <View style={styles.itemOneContent}>
            <Text style={styles.title}  numberOfLines={1}>
            {item.title}
            </Text>
            <Text style={styles.itemOneTitle} numberOfLines={1}>
            {item.price}
            </Text>
            
          </View>
        </View>
      </TouchableOpacity>
    ));
    return (
      <View key={rowData.item[0].id} style={[styles.itemOneRow , { marginTop : (rowData.index === 0 ) ? hp(2) : 0 } ]}>
        {cellViews}
      </View>
    );
  };

  
  render() {
   const { dataSet } = this.state;
    return(
      <View style={styles.container}>
          <StatusBar backgroundColor={colors.primary} barStyle='light-content' />
          <View style={styles.header}>
          <TouchableOpacity style={{flex : 1 , justifyContent: 'center', alignItems: 'center',}} onPress={() => this.props.navigation.goBack(null)}>
         <Image source={require('../../../assets/images/icons/back.png')} style={{height: wp(8)  , width : wp(8) , tintColor : colors.white }} ></Image>
          </TouchableOpacity>
        <View style={styles.searchbar}>
        <TextInput 
          style={styles.search}
          value={this.state.title}
          placeholder={"Search Anything "}
          onChangeText={(searchString) => this.setState({searchString}) }/>

         <View style={{flexDirection: 'column' , justifyContent: 'center', alignItems : 'flex-start' ,  flex : 1  }} >
          <TouchableOpacity style={{alignSelf : 'flex-end' , paddingHorizontal : wp(4) }}>
          <Icon size={20} name={'search'} color={colors.grey} ></Icon>
          </TouchableOpacity>
          </View>
        </View>
        </View>

        <View style={{height: 50 }}>
        <RadioGroup selectedIndex rounded
        mainColor={colors.primary}
        style={styles.demoItem} rounded underline
        items={['Buying', 'Selling']}
        selectedIndex={this.state.selectedIndex}
         onChange={index => this.changeIndex(index) }
      />
      </View>
      <View style={styles.container}>
      <FlatList      
      
          style={{
          
            backgroundColor: "#F5F5F5",
            paddingHorizontal : wp(4),
          }}
          data={GridRow.groupByRows(dataSet, 2) }
          renderItem={ this.renderRowOne }
        />
      </View>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  demoItem : {
    borderRadius : 0,
    borderWidth : 0,
    borderColor : colors.white,
    fontFamily : fonts.primaryBold,
    fontSize : wp(4),
  },
  searchbar : {
   
    flex : 7 ,
    flexDirection : 'row',
    backgroundColor :  '#F5F5F5',
    borderRadius : 5 ,
   
  },
  search : {
   
    color : colors.gray,
    backgroundColor : '#F4F4F4',
    fontFamily : fonts.primaryBold,
    fontSize : wp(4.2),
   flex : 5,
    paddingVertical : hp(1),
    marginHorizontal : wp(2),
  },
  header : {
    flexDirection : 'row',
    backgroundColor : colors.primary,
    paddingRight : wp(3),
    paddingTop : hp(1.5),
    paddingBottom : hp(1.5)

  },itemThreeContainer: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 6,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 4,
  },
 
  badge: {
    backgroundColor: colors.labelTwo,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  itemRight : {
    marginLeft : wp(2),
  },
  itemOneContainer: {
    flex: 1,
    width: wp(44),
    borderRadius: 4,
    backgroundColor: colors.white,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    // padding: 8,
  },
  itemOneImageContainer: {
    borderRadius: 0,
    overflow: 'hidden',
  },
  itemOneImage: {
    height: hp(23),
    width: wp(44),
    borderTopLeftRadius : 4,
    borderTopRightRadius : 4,
  },
  title : {
    paddingHorizontal : wp(2),
    color : colors.gray,
    fontFamily: fonts.primarySemiBold,
    textTransform : 'capitalize',
    fontSize: wp(4),
  },
  itemOneTitle: {
    paddingHorizontal : wp(2),
    fontFamily: fonts.primaryBold,
    color : colors.black,
    fontSize: wp(4.2),
  },
  itemOneSubTitle: {
    fontFamily: fonts.primaryLight,
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
    marginBottom : hp(1.5),
  },
  itemOneContent: {
    marginTop: hp(0.5),
    marginBottom: hp(1.5),
  },
  
});

const listData = [
 
  {
    id: 2,
    selling : true,
    brand: 'Weeknight',
    title: 'Amethyst',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: 'LKR 250,000.00 ',
    priceFrom: true,
    image: 'http://ceylongems.konektholdings.com/wp-content/uploads/2018/06/bluesappihre.jpg',
  },
  {
    id: 3,
    selling : true,
    brand: 'Mad Perry',
    title: 'Sapphire',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: 'LKR 60,000.00 ',
    priceFrom: true,
    badge: 'Private',
    badgeColor: '#ee1f78',
    image: 'http://ceylongems.konektholdings.com/wp-content/uploads/2018/06/pink_sapphire.jpg',
  },
  {
    id: 5,
    selling : true,
    brand: 'Weeknight',
    title: 'Amber',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: 'LKR 650,000.00 ',
    priceFrom: true,
    image: 'http://ceylongems.konektholdings.com/wp-content/uploads/2018/06/Padparadscha_Sapphires.jpg',
  },
  {
    id: 6,
    selling : false,
    brand: 'Mad Perry',
    title: 'Turquoise',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: 'LKR 53,000.00',
    priceFrom: true,
    badge: 'SALE',
    badgeColor: 'red',
    image: 'http://ceylongems.konektholdings.com/wp-content/uploads/2018/06/White_Sapphires.jpg',
  },
  {
    id: 7,
    selling : false,
    brand: 'Citizen',
    title: 'Jade',
    subtitle: 'Limited Edition',
    price: 'LKR 25,000.00 ',
    badge: 'NEW',
    badgeColor: '#3cd39f',
    image: 'http://ceylongems.konektholdings.com/wp-content/uploads/2018/06/Montana_Sapphires.jpg',
  },
  {
    id: 8,
    selling : false,
    brand: 'Weeknight',
    title: 'Lapis lazuli',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: 'LKR 430,000.00 ',
    priceFrom: true,
    image: 'http://ceylongems.konektholdings.com/wp-content/uploads/2018/06/Cabochons.jpg',
  },
  {
    id: 9,
    selling : true,
    brand: 'Mad Perry',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: 'LKR 120,000.00 ',
    priceFrom: true,
    badge: 'SALE',
    badgeColor: '#ee1f78',
    image: 'http://ceylongems.konektholdings.com/wp-content/uploads/2018/06/Star-Sapphires.jpg',
  },
  {
    id: 10,
    selling : false,
    brand: 'Citizen',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Limited Edition',
    price: 'LKR 500,000.00 ',
    badge: 'NEW',
    badgeColor: 'green',
    image: 'http://www.ranaweeragems.lk/astroimg/astrology_and_gems_14.jpg',
  },
  {
    id: 11,
    selling : false,
    brand: 'Weeknight',
    title: 'NEXT-LEVEL WEAR',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: 'LKR 950,000.00 ',
    priceFrom: true,
    image: 'http://www.ranaweeragems.lk/varetyimg/gem_details_12.jpg',
  },
  {
    id: 12,
    selling : false,
    brand: 'Mad Perry',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: 'LKR 45,000.00 ',
    priceFrom: true,
    badge: 'SALE',
    badgeColor: 'red',
    image: 'http://www.ranaweeragems.lk/varetyimg/gem_details_43.jpg',
  },
];