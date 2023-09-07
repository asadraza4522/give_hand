import React from 'react';
import {Text, View} from 'react-native';
import Color from '../theme/color';
import Theme from '../theme/theme';

const MenuHeader = ({first, second, style, secOnPress}) => {
  return (
    <View style={[Theme.rowbetween, {marginHorizontal: '4%'}, style]}>
      {first && <Text style={{...Theme.MenuHeaderTxt1}}>{first}</Text>}
      {second && (
        <Text onPress={secOnPress} style={{...Theme.MenuHeaderTxt2}}>
          {second}
        </Text>
      )}
    </View>
  );
};

export default MenuHeader;
