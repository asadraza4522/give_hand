import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import {FormInput} from '../../components/FormInput';
import Loader from '../../components/Loader';
import StatusBarDTWC from '../../components/StatusBarDTWC';
import Color from '../../theme/color';
import {fonts} from '../../theme/fonts';
import Theme from '../../theme/theme';
import {createNewFeedApi} from '../../utilies/api/apiController';

const AddNewFeed = ({navigation, route}) => {
  const [descp, setDescp] = useState('');
  const [errortext, setErrorText] = useState('');
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // getChatMessages(navigation, chatRoomId, dispatch);
  }, []);
  const launchGallery = async () => {
    setUploadingVideo(true);

    let option = {
      mediaType: 'videos',
      quality: 1,
      includeBase64: true,
    };

    const result = await launchImageLibrary(option);

    if (result.didCancel) {
      setUploadingVideo(false);
    } else {
      const user = await get_data('@userData');
      const body = new FormData();

      body.append('id', user?.id);
      body.append('descp', descp);
      body.append('video', {
        uri: result?.assets[0].uri,
        type: result?.assets[0].type,
        name: result?.assets[0].fileName,
      });

      let resp = await createNewFeedApi(body, navigation);
      if (resp?.data?.error === false) {
        Toast.show('User Image Updated', Toast.SHORT);
        setUploadingVideo(false);
      } else {
        Toast.show(
          resp?.response?.data?.message
            ? resp?.response?.data?.message
            : resp.message
            ? resp.message
            : 'Something Went Wrong!',
          Toast.SHORT,
        );
        setUploadingVideo(false);
      }
    }
  };

  return (
    <SafeAreaView style={Theme.container}>
      <StatusBarDTWC />
      <Loader animating={uploadingVideo} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={120}>
        <View style={{height: '90%'}} />
        <FormInput
          Title={'Description :'}
          placeholder="Enter description"
          onChangeText={val => {
            setDescp(val);
            setErrorText('');
          }}
          textInputContainerStyle={Theme.InputView}
          style={Theme.TextInputStyle}
          containerStyle={Theme.TextInputContainer}
          placeholderTextColor={Color.AuthInputsPlaceholder}
          leftIcon={{
            family: 'MaterialIcons',
            name: 'texture',
            color: Color.neutralGray,
            size: 18,
          }}
          value={descp}
          error={
            errortext === 'Please Enter Description'
              ? 'Please Enter Description'
              : null
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {fontFamily: fonts.bold, color: Color.headingColor},
  date: {
    fontFamily: fonts.light,
    color: Color.headingColor,
    fontSize: 12,
    opacity: 0.5,
    marginTop: 12,
  },
});

export default AddNewFeed;
