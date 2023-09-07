import { PermissionsAndroid, ToastAndroid, Linking, Alert, Platform } from 'react-native'
import Geolocation from 'react-native-geolocation-service';

const hasPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  if (status === 'denied') {
    Alert.alert('Location permission denied');
  }

  if (status === 'disabled') {
    Alert.alert(
      `Turn on Location Services to allow "${appConfig.displayName}" to deliver your order.`,
      '',
      [
        { text: 'Go to Settings', onPress: openSetting },
        { text: "Don't Use Location", onPress: () => { } },
      ],
    );
  }

  return false;
};

export const hasLocationPermission = async () => {

  if (Platform.OS === 'ios') {
    const hasPermission = await hasPermissionIOS();
    return hasPermission;
  }

  const chckLocationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);


  if (chckLocationPermission) {

    return true

  } else {

    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Shdab Store Requires Device Location',
          'message': 'We Requires Permission for our rider to deliever Order'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        return true

      } else {
        console.log("You don't have access for the location");
      }
    } catch (err) {
      console.log(err)
    }

  }

  return false;
};


