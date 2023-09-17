import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import TimerService from '../utilies/camera/TimerService';

const timerService = new TimerService();

const useCamera = (ref: RNCamera | null) => {
  const navigation = useNavigation();
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(45);

  const cameraActionProxy = (cb: (camera: RNCamera) => void) => {
    if (!ref) {
      return () => void 0;
    }
    return () => cb(ref);
  };

  const startRecordingVideo = async (camera: RNCamera) => {
    try {
      timerService.startTimer(countdown);
      setRecording(true);
      const {uri} = await camera.recordAsync();
      // do anything you want with the uri of the video
      // for example, take to the preview screen
      navigation.navigate('AddNewFeed', {video: uri});
      // Alert.alert('Video', uri);
    } catch (e) {
      console.log('Failed to start recording: ', e);
    }
  };

  const stopRecordingVideo = async (camera: RNCamera) => {
    if (!recording) {
      return;
    }
    try {
      timerService.stopTimer();
      setSeconds(45);
      setRecording(false);
      await camera.stopRecording();
    } catch (e) {
      console.log('Failed to stop recording: ', e);
    }
  };

  const countdown = () => {
    setSeconds(prevSeconds => {
      const newSeconds = prevSeconds - 1;
      if (newSeconds === 0) {
        timerService.stopTimer();
        cameraActionProxy(stopRecordingVideo)();
      }
      return newSeconds;
    });
  };

  return {
    seconds,
    recording,
    startRecordingVideo: cameraActionProxy(startRecordingVideo),
    stopRecordingVideo: cameraActionProxy(stopRecordingVideo),
  };
};

export default useCamera;
