import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {Text} from 'react-native';

const RNVICustom = ({Csize, Cname, Ccolor, Lib, ...props}) => {
  return Lib == 'Ionicons' ? (
    <Ionicons {...props} name={Cname} size={Csize} color={Ccolor} />
  ) : Lib == 'AntDesign' ? (
    <AntDesign {...props} name={Cname} size={Csize} color={Ccolor} />
  ) : Lib == 'MaterialCommunityIcons' ? (
    <MaterialCommunityIcons
      {...props}
      name={Cname}
      size={Csize}
      color={Ccolor}
    />
  ) : Lib == 'EvilIcons' ? (
    <EvilIcons {...props} name={Cname} size={Csize} color={Ccolor} />
  ) : Lib == 'Entypo' ? (
    <Entypo {...props} name={Cname} size={Csize} color={Ccolor} />
  ) : Lib == 'SimpleLineIcons' ? (
    <SimpleLineIcons {...props} name={Cname} size={Csize} color={Ccolor} />
  ) : Lib == 'MaterialIcons' ? (
    <MaterialIcons {...props} name={Cname} size={Csize} color={Ccolor} />
  ) : Lib == 'Fontisto' ? (
    <Fontisto {...props} name={Cname} size={Csize} color={Ccolor} />
  ) : Lib == 'Feather' ? (
    <Feather {...props} name={Cname} size={Csize} color={Ccolor} />
  ) : Lib == 'Octicons' ? (
    <Octicons {...props} name={Cname} size={Csize} color={Ccolor} />
  ) : Lib == 'FontAwesome' ? (
    <FontAwesome {...props} name={Cname} size={Csize} color={Ccolor} />
  ) : (
    <Text>~</Text>
  );
};

export default RNVICustom;
