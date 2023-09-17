import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import {FormInput} from '../../components/FormInput';
import Loader from '../../components/Loader';
import StatusBarDTWC from '../../components/StatusBarDTWC';
import Color from '../../theme/color';
import {fonts} from '../../theme/fonts';
import Theme from '../../theme/theme';
import {createNewFeedApi} from '../../utilies/api/apiController';
import CharityIcon from '../../assets/charity';
import {Btn} from '../../components/btn';
import RNVICustom from '../../utilies/RNVICustom';
import {WP} from '../../utilies/responsives/responsive';
import Video from 'react-native-video';
import {get_data} from '../../utilies/AsyncStorage/AsyncStorage';
import {Video as CompressVideo} from 'react-native-compressor';
import BottomSheet from '../../components/BottomSheet';

const AddVideoButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.btnPlus} onPress={onPress}>
      <View style={styles.plusView}>
        <RNVICustom
          onPress={onPress}
          style={{}}
          Lib={'Octicons'}
          Cname={'plus'}
          Csize={23}
          Ccolor={'#D8D8D8'}
        />
      </View>
    </TouchableOpacity>
  );
};

const AddNewFeed = ({navigation, route}) => {
  let cameraVideo = route?.params?.video;
  const [descp, setDescp] = useState('');
  const [errortext, setErrorText] = useState('');
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const [videoResult, setVideoResult] = useState(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const launchGallery = async () => {
    try {
      let option = {
        mediaType: 'video',
        quality: 1,
        selectionLimit: 1,
        includeBase64: false,
      };

      const result = await launchImageLibrary(option);
      console.log(
        '🚀 ~ file: AddNewFeed.js:61 ~ launchGallery ~ result:',
        result,
      );

      if (result.didCancel) {
        setUploadingVideo(false);
      } else {
        setUploadingVideo(false);
        setVideoUri(result?.assets[0].uri);
        setVideoResult(result?.assets[0]);
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: AddNewFeed.js:100 ~ launchGallery ~ error:',
        error,
      );
    }
  };

  const removeVideo = () => {
    setVideoUri(null);
    setVideoResult(null);
  };
  const playVideo = () => {
    setIsPlaying(!isPlaying);
  };
  const onEnd = () => {
    setIsPlaying(false);
  };

  const handleSend = async () => {
    if (videoUri) {
      setUploadingVideo(true);
      const user = await get_data('@userData');
      const video = await compressFileVideo(videoResult);
      const body = new FormData();
      body.append('id', user?.id);
      body.append('descp', descp);
      body.append('video', {
        uri: video.path,
        type: video.mime,
        name: video.fileName,
      });
      let resp = await createNewFeedApi(body, navigation);
      console.log(
        '🚀 ~ file: AddNewFeed.js:113 ~ handleSend ~ resp:',
        resp?.data,
      );
      if (resp?.data?.error === false) {
        Toast.show('Uploading Successfully', Toast.SHORT);
        setUploadingVideo(false);
        navigation.goBack();
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
    } else {
      Toast.show('Select Video to Upload', Toast.SHORT);
    }
  };

  const getMediaFileName = path => {
    return path.substring(path.lastIndexOf('/') + 1);
  };
  const getMediaExtension = filename => {
    return filename.split('.')[1];
  };

  const compressFileVideo = async file => {
    console.log(
      '🚀 ~ file: AddNewFeed.js:133 ~ compressFileVideo ~ file:',
      file,
    );
    try {
      let _result;
      let uri = file?.uri ? file.uri : file;
      let fileName = file?.fileName ? file?.fileName : getMediaFileName(uri);
      let mimeType = file?.type
        ? file.type
        : `video/${getMediaExtension(fileName)}`;
      _result = await CompressVideo.compress(uri, {
        compressionMethod: 'auto',
      });
      console.log('compressed file!', _result);
      return {
        path: _result.replace('file://data', 'file:///data'),
        mime: mimeType,
        fileName: fileName,
      };
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  const handleAddVideoModal = () => {
    setModalVisible(true);
  };
  const handleOnModalClose = val => {
    setModalVisible(val);
  };
  const handleOnOptionsClick = type => {
    setModalVisible(false);
    if (type === 1) {
      setTimeout(() => {
        launchGallery();
      }, 500);
    } else {
      navigation.navigate('CameraScreen');
    }
  };
  useEffect(() => {
    if (cameraVideo) {
      setVideoUri(cameraVideo);
      setVideoResult(cameraVideo);
    }
  }, [cameraVideo]);

  return (
    <SafeAreaView style={Theme.container}>
      <StatusBarDTWC />
      <Loader animating={uploadingVideo} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={120}>
        <ScrollView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <View style={{flex: 1, height: 250}}>
              <CharityIcon />
            </View>
            {videoUri ? (
              <View style={{alignItems: 'center', flex: 1}}>
                <View style={styles.videoPlayButton}>
                  <RNVICustom
                    onPress={playVideo}
                    style={{}}
                    Lib={'AntDesign'}
                    Cname={isPlaying ? 'pausecircleo' : 'playcircleo'}
                    Csize={60}
                    Ccolor={Color.ThemeColor}
                  />
                </View>
                <View style={styles.videoView}>
                  <Video
                    ref={videoRef}
                    source={{
                      uri: videoUri,
                    }}
                    paused={!isPlaying}
                    repeat={true}
                    resizeMode="cover"
                    style={styles.backgroundVideo}
                    onEnd={onEnd}
                  />
                </View>
                <Btn
                  onPress={removeVideo}
                  text="Remove"
                  containerStyle={[styles.btnMainStyle]}
                  textStyle={styles.btnTxtStyle}
                />
              </View>
            ) : (
              <View style={{alignItems: 'center', flex: 1}}>
                <AddVideoButton onPress={handleAddVideoModal} />
                <Text style={styles.emptyTextStyle}>Add Your Video</Text>
              </View>
            )}
            <View style={{flex: 1}}>
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
              <View style={styles.btnViewStyle}>
                <Btn
                  onPress={() => handleSend()}
                  text="Upload Feed"
                  containerStyle={[styles.btnMainStyle]}
                  textStyle={styles.btnTxtStyle}
                />
              </View>
            </View>
            <BottomSheet
              width={'100%'}
              height={'18%'}
              modalVisible={modalVisible}
              setModalVisibility={handleOnModalClose}>
              <View style={styles.btnViewStyle}>
                <Btn
                  onPress={() => handleOnOptionsClick(1)}
                  text="From Gallery"
                  containerStyle={[styles.btnMainStyle]}
                  textStyle={styles.btnTxtStyle}
                />
                <Btn
                  onPress={() => handleOnOptionsClick(2)}
                  text="Upload Camera"
                  containerStyle={[styles.btnMainStyle]}
                  textStyle={styles.btnTxtStyle}
                />
              </View>
            </BottomSheet>
          </View>
        </ScrollView>
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
  btnMainStyle: {
    ...Theme.btnStyle,
    marginTop: '2%',
    marginBottom: '4%',
    minWidth: '40%',
  },
  btnTxtStyle: {
    ...Theme.btnTextstyle,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  plusView: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    height: WP(20),
    width: WP(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnPlus: {
    alignSelf: 'center',
    backgroundColor: 'gray',
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    margin: 5,
  },
  videoView: {
    width: WP(50),
    height: WP(50),
  },
  videoPlayButton: {
    position: 'absolute',
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  btnViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddNewFeed;
