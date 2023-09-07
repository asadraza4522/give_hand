import React from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
import Color from '../theme/color';
import Theme from '../theme/theme';
import {baseURL} from '../utilies/api/instance';
import RNVICustom from '../utilies/RNVICustom';

const ProfileImage = ({navigation, iconOnPress, Loader, userData}) => {
  return (
    <View style={Theme.ProfileImgContainer}>
      {Loader && (
        <ActivityIndicator
          color={Color.ThemeColor}
          style={Theme.ProfileImgLoader}
        />
      )}
      {iconOnPress && (
        <RNVICustom
          onPress={iconOnPress}
          style={Theme.CameraIcon}
          Ccolor={'white'}
          Cname={'camera'}
          Csize={13}
          Lib={'Feather'}
        />
      )}
      <Image
        style={Theme.ProfileImg}
        resizeMode="contain"
        source={
          userData?.assertion == 'password'
            ? {
                uri:
                  userData?.avatar !== undefined
                    ? userData?.avatar
                    : baseURL + '/' + 'assets/noimage.png',
              }
            : {
                uri:
                  userData?.avatar?.split('/')[0] == 'uploads'
                    ? baseURL + '/' + userData?.avatar
                    : userData?.avatar,
              }
        }
      />
    </View>
  );
};

export default ProfileImage;
