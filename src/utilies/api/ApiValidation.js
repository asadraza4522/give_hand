import Toast from 'react-native-simple-toast';
import {Logout} from '../AsyncStorage/AsyncStorage';
import {get_data} from '../AsyncStorage/AsyncStorage';
import {checkToken} from '../../utilies/api/apiController';

const ApiStatus = async navigation => {
  let result = true;

  await checkToken(navigation)
    .then(res => {
      result = res?.data?.error;
      // 403 error jb token expire ho tb aye ga idhr refresh token sy access token get krlyn
    })
    .catch(err => {
      Logout(navigation);
    });
  return result;
};

export {ApiStatus};
