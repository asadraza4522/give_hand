import {baseURL} from './instance';
import axios from 'axios';
import {get_data} from '../AsyncStorage/AsyncStorage';
import {ApiStatus} from './ApiValidation';
const post_request = async ({target, body, formData}) => {
  try {
    let token = await get_data('@userData');

    let header =
      token !== null ? {Authorization: 'Bearer ' + token.ACCESS_TOKEN} : null;

    if (formData != undefined) {
      header['Content-type'] = 'multipart/form-data';
    }

    const instance = axios.create({
      baseURL: baseURL,
      // timeout: 1000,
      headers: header,
    });

    const response = await instance.post(target, body);
    // .catch((e) => {
    //     // ApiStatus(e, navigation)
    //     console.log(JSON.stringify(e));
    //     return e
    // }
    // )
    // console.log(response,"asdasda");
    return response;
  } catch (e) {
    // ApiStatus(e, navigation)
    return e;
  }
};

const get_request = async ({target, navigation}) => {
  try {
    let token = await get_data('@userData');

    let header =
      token !== null ? {Authorization: 'Bearer ' + token.ACCESS_TOKEN} : null;

    const instance = axios.create({
      baseURL: baseURL,
      // timeout: 1000,
      headers: header,
    });
    const response = await instance.get(target);
    // console.log(response)
    // .catch((e) => {
    //     ApiStatus(e, navigation)
    //     return 'Error'
    // }
    // )
    return response;
  } catch (error) {
    // ApiStatus(error, navigation)
    return error;
  }
};

export {post_request, get_request};
