import Toast from 'react-native-simple-toast';
import {
  setHomeProducts,
  setCartList,
  updateHomeProducts,
  updateCartList,
  setHomeLoader,
  setProductCategories,
  likeProductList,
  setLikeProductList,
  unLikeProductList,
  addProductCommentList,
  setProductCommentList,
  setChatLoader,
  createChatRoomsListData,
  setChatRoomList,
  setChatMessageList,
  setHomeCards,
  updateHomeCards,
  setFeedsList,
} from '../../redux/MainSlice';
import {get_data} from '../AsyncStorage/AsyncStorage';
import {
  getAdminProductsApi,
  getUserCart,
  addToCartApi,
  updateCartQty,
  deleteUserCartAPi,
  getAdminCategoriesApi,
  FCMSaveApi,
  likeProductApi,
  getLikeProductsApi,
  unLikeProductApi,
  createProductCommentApi,
  getProductsCommentsApi,
  getChatRoomsApi,
  createNewChatRoomApi,
  createNewMessageApi,
  getMessagesList,
  getMessagesListApi,
  getAdminCardApi,
  addCardToCartApi,
} from './apiController';

export const saveFCMtoken = async (navigation, FCM) => {
  try {
    let userID = await get_data('@userData');

    let user = {
      user: userID.id,
      FCM: FCM,
    };

    let response = await FCMSaveApi(user, navigation);

    if (response?.data?.error === false) {
      console.log(response?.data);
      // Toast.show(response?.data?.message, Toast.SHORT)
      return true;
    } else {
      console.log(
        response?.response?.data?.message
          ? response?.response?.data?.message
          : response.message
          ? response.message
          : 'Something Went Wrong!',
      );
      return false;
    }
  } catch (error) {
    console.log(error, 'Error');
  }
};

export const deleteUserCart = async navigation => {
  try {
    let userID = await get_data('@userData');

    let response = await deleteUserCartAPi({user: userID.id}, navigation);

    if (response?.data?.error === false) {
      Toast.show(response?.data?.message, Toast.SHORT);
      return true;
    } else {
      Toast.show(
        response?.response?.data?.message
          ? response?.response?.data?.message
          : response.message
          ? response.message
          : 'Something Went Wrong!',
        Toast.SHORT,
      );
      return false;
    }
  } catch (error) {
    console.log(error, 'Error');
  }
};

export const getProductsUser = async (navigation, page, search, dispatch) => {
  try {
    let response = await getAdminProductsApi(
      navigation,
      page ? page : 1,
      search ? search : '',
    );

    if (response?.data?.error === false) {
      dispatch(setHomeProducts(response?.data?.data));
    } else {
      Toast.show(
        resp?.response?.data?.message
          ? resp?.response?.data?.message
          : resp.message
          ? resp.message
          : 'Something Went Wrong!',
        Toast.SHORT,
      );
    }
  } catch (error) {
    console.log(error, 'Error');
  }

  return true;
};

export const getCardsUser = async (navigation, page, search, dispatch) => {
  try {
    let response = await getAdminCardApi(
      navigation,
      page ? page : 1,
      search ? search : '',
    );

    if (response?.data?.error === false) {
      dispatch(setHomeCards(response?.data?.data));
    } else {
      Toast.show(
        resp?.response?.data?.message
          ? resp?.response?.data?.message
          : resp.message
          ? resp.message
          : 'Something Went Wrong!',
        Toast.SHORT,
      );
    }
  } catch (error) {
    console.log(error, 'Error');
  }

  return true;
};

export const getProductsCategories = async (
  navigation,
  page,
  limit,
  dispatch,
) => {
  try {
    let response = await getAdminCategoriesApi(navigation, page, '', limit);

    if (response?.data?.error === false) {
      dispatch(setProductCategories(response?.data?.data));
    } else {
      Toast.show(
        resp?.response?.data?.message
          ? resp?.response?.data?.message
          : resp.message
          ? resp.message
          : 'Something Went Wrong!',
        Toast.SHORT,
      );
    }
  } catch (error) {
    console.log(error, 'Error');
  }
};

export const getProductsCart = async (navigation, id, dispatch) => {
  try {
    let response = await getUserCart(navigation, id);

    if (response?.data?.error === false) {
      dispatch(setCartList(response?.data?.data?.cart));
      return true;
    } else {
      Toast.show(
        resp?.response?.data?.message
          ? resp?.response?.data?.message
          : resp.message
          ? resp.message
          : 'Something Went Wrong!',
        Toast.SHORT,
      );
    }
  } catch (error) {
    console.log(error, 'Error');
  }
};

export const addToCartHome = async (
  ProID,
  data,
  navigation,
  dispatch,
  index,
) => {
  dispatch(setHomeLoader(true));

  let userID = await get_data('@userData');

  let body = {
    user: userID.id,
    productID: ProID,
  };

  let UProduct = Object.assign({}, data);

  UProduct.cartQty = 1;

  let resp = await addToCartApi(body, navigation);
  if (resp?.data?.error === false) {
    index !== undefined && dispatch(updateHomeProducts({UProduct, index}));
    getProductsCart(navigation, userID.id, dispatch);
    dispatch(setHomeLoader(false));
  } else {
    if (resp?.data?.message === 'Product Already Exists!') {
      return resp?.data?.message;
    }

    Toast.show(
      resp?.data?.message
        ? resp?.data?.message
        : resp.message
        ? resp.message
        : 'Something Went Wrong!',
      Toast.SHORT,
    );
    dispatch(setHomeLoader(false));
  }
};
export const addCardToCartHome = async (
  ProID,
  data,
  navigation,
  dispatch,
  index,
) => {
  dispatch(setHomeLoader(true));

  let userID = await get_data('@userData');

  let body = {
    user: userID.id,
    productID: ProID,
    cardItem: {
      productID: data.productIDList,
      title: data?.title,
      descp: data.descp,
      sendTo: data.sendToUserId,
    },
  };

  let UProduct = Object.assign({}, data);

  UProduct.cartQty = 1;

  let resp = await addCardToCartApi(body, navigation);
  console.log('🚀 ~ file: apiCalls.js:268 ~ resp:', resp);
  if (resp?.data?.error === false) {
    index !== undefined && dispatch(updateHomeCards({UProduct, index}));
    getProductsCart(navigation, userID.id, dispatch);
    dispatch(setHomeLoader(false));
  } else {
    if (resp?.data?.message === 'Product Already Exists!') {
      return resp?.data?.message;
    }

    Toast.show(
      resp?.data?.message
        ? resp?.data?.message
        : resp.message
        ? resp.message
        : 'Something Went Wrong!',
      Toast.SHORT,
    );
    dispatch(setHomeLoader(false));
  }
};
export const getFeeds = async (navigation, page, limit, dispatch) => {
  try {
    let response = await getFeedsListApi(navigation, page, '', limit);

    if (response?.data?.error === false) {
      dispatch(setFeedsList(response?.data?.data));
    } else {
      Toast.show(
        resp?.response?.data?.message
          ? resp?.response?.data?.message
          : resp.message
          ? resp.message
          : 'Something Went Wrong!',
        Toast.SHORT,
      );
    }
  } catch (error) {
    console.log(error, 'Error');
  }
};

export const updateQty = async (
  ProID,
  qty,
  data,
  navigation,
  dispatch,
  index,
  setLoading,
) => {
  // dispatch(setHomeLoader(true))
  setLoading && setLoading(true);

  let userID = await get_data('@userData');

  let body = {
    user: userID.id,
    productID: ProID,
    qty: qty,
  };

  let resp = await updateCartQty(body, navigation);
  if (resp?.data?.error === false) {
    let UProduct = Object.assign({}, data);

    UProduct.cartQty = qty;

    index !== undefined && dispatch(updateHomeProducts({UProduct, index}));
    dispatch(updateCartList({p_id: UProduct._id, q_ty: qty}));
    setLoading && setLoading(false);
    return true;
  } else {
    Toast.show(
      resp?.data?.message
        ? resp?.data?.message
        : resp.message
        ? resp.message
        : 'Something Went Wrong!',
      Toast.SHORT,
    );
    setLoading && setLoading(false);
    return false;
  }
};

export const likeProducts = async (ProID, navigation, dispatch, index) => {
  dispatch(setHomeLoader(true));

  let userID = await get_data('@userData');

  let body = {
    user: userID.id,
    productID: ProID,
  };

  let resp = await likeProductApi(body, navigation);
  if (resp?.data?.error === false) {
    index !== undefined && dispatch(likeProductList({body, index}));
    getLikeProducts(navigation, userID.id, dispatch);
    dispatch(setHomeLoader(false));
  } else {
    if (resp?.data?.message === 'Product Already Exists!') {
      return resp?.data?.message;
    }
    Toast.show(
      resp?.data?.message
        ? resp?.data?.message
        : resp.message
        ? resp.message
        : 'Something Went Wrong!',
      Toast.SHORT,
    );
    dispatch(setHomeLoader(false));
  }
};
export const unLikeProducts = async (ProID, navigation, dispatch, index) => {
  dispatch(setHomeLoader(true));

  let userID = await get_data('@userData');

  let body = {
    user: userID.id,
    productID: ProID,
  };

  let resp = await unLikeProductApi(body, navigation);
  if (resp?.data?.error === false) {
    index !== undefined && dispatch(unLikeProductList({body, index}));
    getLikeProducts(navigation, userID.id, dispatch);
    dispatch(setHomeLoader(false));
  } else {
    if (resp?.data?.message === 'Product Already Exists!') {
      return resp?.data?.message;
    }
    Toast.show(
      resp?.data?.message
        ? resp?.data?.message
        : resp.message
        ? resp.message
        : 'Something Went Wrong!',
      Toast.SHORT,
    );
    dispatch(setHomeLoader(false));
  }
};

export const getLikeProducts = async (navigation, id, dispatch) => {
  try {
    let userID = await get_data('@userData');
    let searchId = id ? id : userID.id;
    let response = await getLikeProductsApi(navigation, searchId);

    if (response?.data?.error === false) {
      console.log('getLikeProductsApi response', JSON.stringify(response.data));
      dispatch(setLikeProductList(response?.data?.data));
      return true;
    } else {
      Toast.show(
        response?.data?.message
          ? response?.data?.message
          : 'Something Went Wrong!',
        Toast.SHORT,
      );
    }
  } catch (error) {
    console.log(error, 'Error');
  }
};
export const addProductComment = async (data, navigation, dispatch) => {
  dispatch(setHomeLoader(true));

  let userID = await get_data('@userData');
  let body = {
    userID: userID?.id,
    userEmail: userID?.email,
    productID: data.ProID,
    descp: data.Descp,
    replayTo: data.replayTo,
  };
  console.log('addProductComment', body);

  let resp = await createProductCommentApi(body, navigation);
  if (resp?.data?.error === false) {
    getProductComments(navigation, data.ProID, dispatch);
    dispatch(setHomeLoader(false));
  } else {
    if (resp?.data?.message === 'Product Already Exists!') {
      return resp?.data?.message;
    }
    Toast.show(
      resp?.data?.message
        ? resp?.data?.message
        : resp.message
        ? resp.message
        : 'Something Went Wrong!',
      Toast.SHORT,
    );
    dispatch(setHomeLoader(false));
  }
};

export const getProductComments = async (navigation, id, dispatch) => {
  try {
    let response = await getProductsCommentsApi(navigation, id);

    if (response?.data?.error === false) {
      console.log('getProductComments response', JSON.stringify(response.data));
      dispatch(setProductCommentList(response?.data?.data));
      return true;
    } else {
      Toast.show(
        response?.data?.message
          ? response?.data?.message
          : 'Something Went Wrong!',
        Toast.SHORT,
      );
    }
  } catch (error) {
    console.log(error, 'Error');
  }
};

export const createNewChatRoom = async (
  receiverID,
  navigation,
  dispatch,
  index,
) => {
  dispatch(setChatLoader(true));

  let userID = await get_data('@userData');

  let body = {
    senderID: userID.id,
    receiverID: receiverID,
  };

  let resp = await createNewChatRoomApi(body, navigation);
  if (resp?.data?.error === false) {
    // index !== undefined && dispatch(createChatRoomsListData({body, index}));
    getChatRoomList(navigation, '', dispatch);
    dispatch(setChatLoader(false));
    navigation.goBack();
  } else {
    if (resp?.data?.message === 'Product Already Exists!') {
      return resp?.data?.message;
    }
    Toast.show(
      resp?.data?.message
        ? resp?.data?.message
        : resp.message
        ? resp.message
        : 'Something Went Wrong!',
      Toast.SHORT,
    );
    dispatch(setHomeLoader(false));
  }
};

export const getChatRoomList = async (navigation, id, dispatch) => {
  try {
    dispatch(setChatLoader(true));
    let userID = await get_data('@userData');
    console.log(
      '🚀 ~ file: apiCalls.js:431 ~ getChatRoomList ~ userID:',
      userID,
    );
    let response = await getChatRoomsApi(navigation, userID?.id);

    console.log('getChatRoomList response', JSON.stringify(response.data));
    if (response?.data?.error === false) {
      console.log('getChatRoomList response', JSON.stringify(response.data));
      dispatch(setChatRoomList(response?.data?.data));
      dispatch(setChatLoader(false));
      return true;
    } else {
      Toast.show(
        response?.data?.message
          ? response?.data?.message
          : 'Something Went Wrong!',
        Toast.SHORT,
      );
      dispatch(setChatLoader(false));
    }
  } catch (error) {
    console.log(error, 'Error');
  }
};

export const createNewMessage = async (data, navigation, dispatch) => {
  console.log('createNewMessage', data);

  let resp = await createNewMessageApi(data, navigation);
  if (resp?.data?.error === false) {
    getChatMessages(navigation, data?.chatRoomID, dispatch);
  } else {
    if (resp?.data?.message === 'Message Error!') {
      return resp?.data?.message;
    }
    Toast.show(
      resp?.data?.message
        ? resp?.data?.message
        : resp.message
        ? resp.message
        : 'Something Went Wrong!',
      Toast.SHORT,
    );
  }
};

export const getChatMessages = async (navigation, id, dispatch) => {
  try {
    let response = await getMessagesListApi({navigation, id});
    if (response?.data?.error === false) {
      dispatch(setChatMessageList(response?.data?.data));
      return true;
    } else {
      Toast.show(
        response?.data?.message
          ? response?.data?.message
          : 'Something Went Wrong!',
        Toast.SHORT,
      );
    }
  } catch (error) {
    console.log(error, 'Error');
  }
};
