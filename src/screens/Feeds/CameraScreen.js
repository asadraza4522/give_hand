import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';
import CameraService from '../../utilies/camera/CameraService';
import useCamera from '../../hooks/useCamera';
import useCallbackRef from '../../hooks/useCallbackRef';
import RNVICustom from '../../utilies/RNVICustom';
import Color from '../../theme/color';

const {height, width} = Dimensions.get('window');

const cameraService = new CameraService();

const CameraScreen = () => {
  const navigation = useNavigation();
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
  const {ref, callbackRef} = useCallbackRef();
  const {seconds, recording, startRecordingVideo, stopRecordingVideo} =
    useCamera(ref);

  const changeCameraType = () => {
    setCameraType(cameraService.getNewCameraType(cameraType));
  };
  return (
    <SafeAreaView style={styles.container}>
      <RNCamera
        ratio={'16:9'}
        ref={callbackRef}
        style={styles.camera}
        type={cameraType}
        flashMode={RNCamera.Constants.FlashMode.off}
        captureAudio={true}>
        <View style={styles.header}>
          {recording && (
            <View style={styles.timer}>
              <Text style={styles.timerText}>Time remaining</Text>
              <View style={styles.timeContainer}>
                <View style={styles.dot} />
                <Text style={styles.timerText}>00:{seconds}</Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.captureContainer}>
          <TouchableOpacity
            onPress={recording ? stopRecordingVideo : startRecordingVideo}
            style={[styles.captureButton]}>
            <RNVICustom
              onPress={recording ? stopRecordingVideo : startRecordingVideo}
              Lib={'Ionicons'}
              Cname={'radio-button-on'}
              Csize={60}
              Ccolor={recording ? 'red' : Color.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={changeCameraType}
            disabled={recording}
            style={styles.switchCamera}>
            <RNVICustom
              onPress={changeCameraType}
              Lib={'Ionicons'}
              Cname={'repeat'}
              Csize={23}
              Ccolor={Color.ThemeColor}
            />
          </TouchableOpacity>
        </View>
      </RNCamera>
    </SafeAreaView>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  camera: {
    // flex: 1,
    height: height,
    width: width,
  },
  captureContainer: {
    height: 100,
    width: '100%',
    position: 'absolute',
    bottom: 30,
  },
  captureButton: {
    alignSelf: 'center',
    position: 'absolute',
  },
  switchCamera: {
    height: 40,
    width: 40,
    right: 10,
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: Color.grey,
    alignSelf: 'flex-end',
    margin: 10,
    position: 'absolute',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: 'red',
    height: 10,
    width: 10,
    borderRadius: 10,
    marginEnd: 10,
  },
});
