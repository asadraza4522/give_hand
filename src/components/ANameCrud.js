import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Color from '../theme/color';
import {fonts} from '../theme/fonts';
import Theme from '../theme/theme';
import RNVICustom from '../utilies/RNVICustom';

const ANameCrud = ({
  navigation,
  item,
  index,
  deleteListItem,
  setEditFun,
  hideControls,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={Theme.ANameCrudContainer}
      {...props}>
      <View>
        <Text style={styles.nameText}>
          {item.name}
          {item.type && ' (' + item.type + ')'}
        </Text>
        <Image
          style={{height: 100, width: 120}}
          source={{
            uri:
              item?.image?.length > 0
                ? item?.image
                : 'https://st2.depositphotos.com/1561359/12101/v/950/depositphotos_121012076-stock-illustration-blank-photo-icon.jpg',
          }}
        />
        <Text style={styles.tags}>
          Tags: <Text style={styles.tagsDesc}>{item?.tags}</Text>
        </Text>
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.tags}>
          Price: <Text style={styles.tagsDesc}>{item?.price}</Text>
        </Text>
        <Text style={styles.tags}>
          Category: <Text style={styles.tagsDesc}>XYZ</Text>
        </Text>
      </View>
      {hideControls == undefined && (
        <View style={styles.iconContainer}>
          <RNVICustom
            style={{marginRight: 5}}
            onPress={setEditFun.bind(this, item, index)}
            Ccolor={Color.ThemeColor}
            Csize={18}
            Cname={'edit'}
            Lib={'Feather'}
          />
          <RNVICustom
            onPress={deleteListItem.bind(this, item._id, index, item.name)}
            Ccolor={Color.ThemeColor}
            Csize={18}
            Cname={'trash-2'}
            Lib={'Feather'}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  numberText: {
    flex: 0.2,
    fontFamily: fonts.regular,
    color: 'black',
    fontWeight: '800',
  },
  tags: {
    textAlign: 'left',
    fontFamily: fonts.regular,
    color: 'black',
    marginTop: 5,
    fontWeight: '700',
    fontSize: 12,
  },
  middleContainer: {alignItems: 'center', justifyContent: 'center'},
  tagsDesc: {
    textAlign: 'left',
    fontFamily: fonts.regular,
    color: 'black',
    marginTop: 5,
    fontWeight: '200',
    fontSize: 12,
  },
  nameText: {
    flex: 1,
    textAlign: 'left',
    fontFamily: fonts.bold,
    color: 'black',
    marginBottom: 5,
  },
  iconContainer: {flexDirection: 'row', justifyContent: 'space-around'},
});

export default ANameCrud;
