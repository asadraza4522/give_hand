import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Color from '../theme/color';
import {fonts} from '../theme/fonts';
import Theme from '../theme/theme';
import RNVICustom from '../utilies/RNVICustom';

const AUserCard = ({navigation, item, index, ...props}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={Theme.AUserCardContainer}
      {...props}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri:
              item?.image?.length > 0
                ? item?.image
                : 'https://st2.depositphotos.com/1561359/12101/v/950/depositphotos_121012076-stock-illustration-blank-photo-icon.jpg',
          }}
        />
        <Text style={styles.nameText}>
          {item.name}
          {item.type && ' (' + item.type + ')'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  nameText: {
    flex: 1,
    textAlign: 'left',
    fontFamily: fonts.bold,
    color: 'black',
    marginBottom: 5,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: 'red',
    marginEnd: 20,
  },
});

export default AUserCard;
