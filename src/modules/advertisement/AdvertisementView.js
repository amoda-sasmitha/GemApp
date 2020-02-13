import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { colors , fonts } from '../../styles';
import { Dropdown, Button  , ServiceItem as Service} from '../../components';
import { Text, Title, Caption } from '../../components/StyledText';



export default class AdvertisementView extends React.Component {


  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
 });

 state = {
  currentIndex  : 1,
  NumOfItems : 4,
}

_openArticle = article => {
  this.props.navigation.push('Advertisement',{...article },
  );
};

  _renderRecommendationCard = ({ item , index }) => (
    <TouchableOpacity style={{ marginLeft : (index == 0 ) ? wp(2) : 0 , marginTop : hp(0.5) , marginBottom : hp(0.5)}} key={item.id} onPress={() => this._openArticle(item)} activeOpacity={0.8} >
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
  );

  _changeslide = () => {
    this.setState({ currentIndex : this._carousel.currentIndex + 1 })
  }
  
  render(){
  const itemParams = this.props.navigation.state.params;
  const { currentIndex , NumOfItems } = this.state;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.carouselContainer}>
        <Carousel
           ref={(c) => { this._carousel = c; }}
           onSnapToItem={this._changeslide}
            activeAnimationType={"decay"}
          layout={'default'} 
          sliderWidth={wp(100)}
          itemWidth={wp(100) }
          renderItem={({ item }) => (
            <Image
              resizeMode="cover"
              style={{ height: 250, width: wp(100)  }}
              source={{ uri :item}}
            />
          )}
          data={[ itemParams.image , 
          'http://ceylongems.konektholdings.com/wp-content/uploads/2018/06/White_Sapphires.jpg' ,
          itemParams.image]}
        />
      
          <View style={styles.badge}>
            <Caption style={{fontSize : hp(2)}}  white bold>
              {currentIndex +" / " + NumOfItems}
            </Caption>
          </View>
       
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.bodyHeading}>
          <View style={styles.pricetag}>
          <Title bold color={colors.white} size={hp(2.5)}>
            {itemParams.price}
          </Title>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'stretch',
              //alignItems : 'center',
              marginTop : hp(1.5),
            }}
          >
            <Title bold color={colors.gray}>
              Amount : 200
            </Title>
            
          </View>

        </View>
        
       
        <View style={styles.description}>
          <Title bold color={colors.lightGray} size={17}>
           Description
          </Title>
          <Text style={styles.p}>
          Mauris nec ullamcorper dolor, ac iaculis purus. Pellentesque congue ante risus, 
          vel faucibus quam facilisis vel. Etiam ut suscipit augue, eget malesuada lectus.
           Aenean elementum dolor nec porttitor faucibus. Sed rutrum auctor consectetur.
            Nullam mollis ultrices metus, fermentum sodales velit suscipit rhoncus.
            
          </Text>
          
        </View>
        </View>
        <View style={[styles.bodyContainer , { marginTop : hp(1)}]}>
        <Title style={{paddingTop : hp(1)}} bold color={colors.lightGray} size={17}>
        Advertisement By 
          </Title>
       <View style={{paddingVertical : hp(1)  }}>
         <View style={{flexDirection : 'row' , alignItems : 'center' , paddingBottom : hp(1) }}>
            <Image source={{uri : "https://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg"}}  style={styles.profileImg}></Image>
            <Title bold  style={{paddingLeft : wp(2)  }} color={colors.gray} size={15}> Amoda Sasmitha </Title>
          </View> 
        </View>
       </View>

    
    
      <View style={styles.moreContainer  }>
      <Title style={{paddingVertical : hp(1) , paddingHorizontal : wp(4)}} bold color={colors.lightGray} size={17}>
       By the Same Person
          </Title>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={listData}
          keyExtractor={item => `${item.id}`}
          renderItem={this._renderRecommendationCard}
        />
      </View>
    </ScrollView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  carouselContainer: {
    //marginVertical: hp(2),
  },
  bodyContainer: {
    paddingHorizontal: wp(4),
    elevation : 2,
    backgroundColor : colors.white,
   
  },
  moreContainer: {
    marginTop : hp(1),
    paddingBottom : hp(2),
   
    backgroundColor : colors.white,
   
  },
  bodyHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  row: {
    flexDirection: 'row',
  },
  sizeDropdownContainer: {
    flex: 2,
    paddingVertical: 10,
    paddingRight: 5,
  },
  quantityDropdownContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 5,
  },
  buttonsSection: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  actionButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  p: {
    fontSize : hp(2.3),
    marginTop: hp(1),
    marginBottom: hp(2),
    lineHeight: hp(3.2),
    letterSpacing: 0,
    color: colors.gray,
  },
  description: {
   paddingTop : hp(1)
  },
  recommendationsContainer : {
    marginTop : hp(1),
    backgroundColor : colors.white,
    paddingHorizontal : wp(4),
  },
  servicesText : {
    fontFamily : fonts.primaryBold,
    color : colors.gray,
    fontSize : 16 ,
  },
  profileImg : {
    height : hp(4),
    width : hp(4),
    borderRadius : hp(5)/2 ,
  },
  pricetag : {
    backgroundColor : colors.primary,
    paddingVertical : hp(1),
    paddingHorizontal : wp(4),
    marginTop : hp(1.5),
    borderRadius : hp(10),


  },
  itemOneContainer: {
    marginHorizontal : wp(2),
    flex: 1,
    width: wp(44),
    borderRadius: 4,
    backgroundColor: "#F4F4F4",
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
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
  badge: {
    borderRadius : 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: colors.black,
    position: 'absolute',
    right: wp(2),
    top: hp(1),
  },

});
const listData = [
 

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
    image: 'http://ceylongems.konektholdings.com/wp-content/uploads/2018/06/Montana_Sapphires.jpg',
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
    image: 'http://ceylongems.konektholdings.com/wp-content/uploads/2018/06/White_Sapphires.jpg',
  }];