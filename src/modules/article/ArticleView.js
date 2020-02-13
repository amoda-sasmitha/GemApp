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

import { colors } from '../../styles';
import { Dropdown, Button } from '../../components';
import { Text, Title, Caption } from '../../components/StyledText';



export default function ArticleScreen(props) {

  const _renderRecommendationCard = ({ item }) => (
   <View></View>
  );

  const itemParams = props.navigation.state.params;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
          }}
        >
       
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'stretch',
              marginTop: 8,
            }}
          >
            <Title bold color={colors.gray}>
              {itemParams.title}
            </Title>
          
          </View>
        </View>
      </View>
      <View style={styles.carouselContainer}>
        <Carousel
          autoplay
          sliderWidth={Dimensions.get('window').width - 30}
          itemWidth={Dimensions.get('window').width}
          renderItem={({ item }) => (
            <Image
              resizeMode="contain"
              style={{ height: 250, width: Dimensions.get('window').width }}
              source={item}
            />
          )}
          data={[
            require('../../../assets/images/nike1.png'),
            require('../../../assets/images/nike2.jpg'),
          ]}
        />
        {itemParams.badge && (
          <View style={styles.badge}>
            <Caption white bold>
              {itemParams.badge}
            </Caption>
          </View>
        )}
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.bodyHeading}>
          <Title color={colors.gray} size={23}>
            {itemParams.price}
          </Title>
        </View>
        
       
        <View style={styles.description}>
          <Title bold color={colors.lightGray} size={17}>
            Product Details
          </Title>
          <Text style={styles.p}>
            A T-shirt (or t shirt, or t) is a style of unisex fabric shirt,
            named after the T shape of the body and sleeves. It is normally
            associated with short sleeves, a round neckline, known as a crew
            neck, with no collar. T-shirts are generally made of a light,
            inexpensive fabric, and are easy to clean.
          </Text>
          <Text style={styles.p}>
            Typically made of cotton textile in a stockinette or jersey, knit,
            it has a distinctively pliable texture compared to shirts made of
            woven cloth. The majority of modern versions have a body made from a
            continuously woven tube, on a circular loom, so that the torso has
            no side seams. The manufacture of T-shirts has become highly
            automated and may include fabric cutting by laser or water jet.
          </Text>
        </View>
        <View style={{ alignItems: 'center', paddingVertical: 15 }}>
          <Button
            bordered
            bgColor={colors.grey}
            textColor={colors.gray}
            caption="Write a review"
            style={{
              width: 200,
            }}
          />
        </View>
      </View>
      <View style={styles.recommendationsContainer}>
        <Title color={colors.lightGray} style={{ marginVertical: 10 }}>
          YOU MIGHT ALSO LIKE
        </Title>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={[]}
          keyExtractor={item => `${item.id}`}
          renderItem={_renderRecommendationCard}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  carouselContainer: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  bodyContainer: {
    paddingHorizontal: 15,
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
    marginVertical: 5,
    lineHeight: 20,
    letterSpacing: 0,
    color: colors.gray,
  },
  description: {
    paddingTop: 10,
    marginVertical: 10,
  },
  recommendationsContainer: {
    backgroundColor: colors.white,
    marginTop: 10,
    paddingHorizontal: 15,
  },
  recommendationItem: {
    marginVertical: 10,
    paddingBottom: 10,
    marginRight: 15,
    borderWidth: 0.7,
    borderColor: colors.lightGray,
  },
  recommendationBody: {
    backgroundColor: 'white',
    padding: 8,
  },
  recommendationTitle: {
    marginVertical: 5,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: colors.green,
    position: 'absolute',
    left: 15,
    top: 0,
  },
  recommendationItemTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingRight: 5,
  },
  recommendationItemBadge: {
    backgroundColor: colors.secondary,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  recommendationItemRating: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 3,
  },
});
