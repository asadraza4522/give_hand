import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Color from '../theme/color';
import Theme from '../theme/theme';
import RNVICustom from '../utilies/RNVICustom';

const IconTwoText = ({navigation, item, ...props}) => {
  return (
    <TouchableOpacity {...props} style={Theme.iconTwoTextmainView}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <RNVICustom
          Ccolor={Color.ThemeColor}
          Csize={22}
          Cname={item?.icon}
          Lib={item?.Lib}
        />
        <Text style={Theme.iconTwoTexttitle}>{item.title}</Text>
      </View>
      {item?.second && (
        <Text style={Theme.iconTwoTexttitlesecond}>{item.second}</Text>
      )}
    </TouchableOpacity>
  );
};

export default IconTwoText;
