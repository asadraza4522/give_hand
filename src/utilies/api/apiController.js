import {post_request, get_request} from './requests';

// Users API Here //

export const getUsersApi = async (navigation, page, searchData) => {
  const data = await get_request({
    target: `/api/viewUsers?page=${page}&search=${searchData}`,
    navigation: navigation,
  });
  return data;
};

export const addToCartApi = async (user, navigation) => {
  const data = await post_request({
    target: '/api/cart/addProduct',
    body: user,
    navigation: navigation,
  });
  return data;
};
export const addCardToCartApi = async (user, navigation) => {
  const data = await post_request({
    target: '/api/cart/addProduct',
    body: user,
    navigation: navigation,
  });
  return data;
};

export const getUserCart = async (navigation, id) => {
  const data = await get_request({
    target: `/api/cart/${id}`,
    navigation: navigation,
  });
  return data;
};

export const updateCartQty = async (user, navigation) => {
  const data = await post_request({
    target: '/api/cart/updateQty',
    body: user,
    navigation: navigation,
  });
  return data;
};

export const creteOrderApi = async (user, navigation) => {
  const data = await post_request({
    target: '/api/order/addOrder',
    body: user,
    navigation: navigation,
  });
  return data;
};

export const sellerPayment = async (body, navigation) => {
  const data = await post_request({target: '/api/pay', body, navigation});
  return data;
};

export const createStripeAccount = async navigation => {
  const data = await get_request({
    target: '/payment/create-stripe-account',
    navigation,
  });
  return data;
};
export const getOrdersList = async ({
  navigation,
  id,
  page,
  limit,
  type,
  userType,
}) => {
  const data = await get_request({
    target: `/api/order/${id}?page=${page}&limit=${
      limit || 10
    }&status=${type}&userType=${userType}`,
    navigation,
  });
  return data;
};

export const getUserInfo = async (navigation, id) => {
  const data = await get_request({
    target: `/api/users/${id}`,
    navigation: navigation,
  });
  return data;
};

export const EditUserApi = async (user, navigation) => {
  const data = await post_request({
    target: '/api/users/update',
    body: user,
    navigation: navigation,
  });
  return data;
};

export const LiveProductSearch = async (navigation, search) => {
  const data = await get_request({
    target: `/api/product/search/${search}`,
    navigation: navigation,
  });
  return data;
};

export const deleteUserCartAPi = async (user, navigation) => {
  const data = await post_request({
    target: '/api/cart/delete',
    body: user,
    navigation: navigation,
  });
  return data;
};

export const updateOrderStatusApi = async (user, navigation) => {
  const data = await post_request({
    target: '/api/order/update',
    body: user,
    navigation: navigation,
  });
  return data;
};

export const FCMSaveApi = async (user, navigation) => {
  const data = await post_request({
    target: '/api/users/save_fcm',
    body: user,
    navigation: navigation,
  });
  return data;
};
export const UpdateUserImageApi = async (user, navigation) => {
  const data = await post_request({
    target: '/api/users/UploadImage',
    body: user,
    navigation: navigation,
    formData: true,
  });
  return data;
};

// Users API Here //

export const likeProductApi = async (productData, navigation) => {
  const data = await post_request({
    target: '/api/likeProduct/likeProduct',
    body: productData,
    navigation: navigation,
  });
  return data;
};

export const unLikeProductApi = async (productData, navigation) => {
  const data = await post_request({
    target: '/api/likeProduct/unLikeProduct',
    body: productData,
    navigation: navigation,
  });
  return data;
};

export const getLikeProductsApi = async (navigation, id) => {
  const data = await get_request({
    target: `/api/likeProduct/${id}`,
    navigation: navigation,
  });
  return data;
};

export const createProductCommentApi = async (productData, navigation) => {
  const data = await post_request({
    target: '/api/productComment/createProductComment',
    body: productData,
    navigation: navigation,
  });
  return data;
};

export const getProductsCommentsApi = async (navigation, id) => {
  const data = await get_request({
    target: `/api/productComment/${id}`,
    navigation: navigation,
  });
  return data;
};

export const createNewChatRoomApi = async (chatRoomData, navigation) => {
  const data = await post_request({
    target: '/api/chatRoom/createChatRoom',
    body: chatRoomData,
    navigation: navigation,
  });
  return data;
};

export const getChatRoomsApi = async (navigation, id) => {
  const data = await get_request({
    target: `/api/chatRoom/${id}`,
    navigation: navigation,
  });
  return data;
};

export const createNewMessageApi = async (newMessage, navigation) => {
  const data = await post_request({
    target: '/api/message/createMessge',
    body: newMessage,
    navigation: navigation,
  });
  return data;
};

export const getMessagesListApi = async ({navigation, id}) => {
  const data = await get_request({
    target: `/api/message/getMessages/${id}`,
    navigation,
  });
  return data;
};

// ADMIN API//

export const getDashboardStat = async navigation => {
  const data = await get_request({
    target: '/api/dashboard/statistics',
    navigation: navigation,
  });
  return data;
};

export const LoginApi = async (user, navigation) => {
  const data = await post_request({
    target: '/api/login',
    body: user,
    navigation: navigation,
  });
  return data;
};

export const SignUpApi = async (user, navigation) => {
  const data = await post_request({
    target: '/api/register',
    body: user,
    navigation: navigation,
  });
  return data;
};

export const checkToken = async navigation => {
  const data = await get_request({
    target: '/api/checkToken',
    navigation: navigation,
  });
  return data;
};

export const addCategory = async (user, navigation) => {
  const data = await post_request({
    target: '/api/category/addCategory',
    body: user,
    navigation: navigation,
    formData: true,
  });
  return data;
};

export const getAdminCategoriesApi = async (
  navigation,
  page,
  searchData,
  limit,
) => {
  const data = await get_request({
    target: `/api/category/viewCategory?page=${page}&search=${searchData}&limit=${
      limit || 10
    }`,
    navigation: navigation,
  });
  return data;
};

export const delAdminCategoriesApi = async (user, navigation) => {
  const data = await post_request({
    target: '/api/category/delete',
    body: user,
    navigation: navigation,
  });
  return data;
};

export const editAdminCategoriesApi = async (user, navigation) => {
  const data = await post_request({
    target: '/api/category/edit',
    body: user,
    navigation: navigation,
  });
  return data;
};

export const getAdminBrandsApi = async (navigation, page, searchData) => {
  const data = await get_request({
    target: `/api/brand/viewBrand?page=${page}&search=${searchData}`,
    navigation: navigation,
  });
  return data;
};

export const delAdminBrandsApi = async (user, navigation) => {
  const data = await post_request({
    target: '/api/brand/delete',
    body: user,
    navigation: navigation,
  });
  return data;
};

export const addBrand = async (user, navigation) => {
  const data = await post_request({
    target: '/api/brand/addBrand',
    body: user,
    navigation: navigation,
  });
  return data;
};

export const editAdminBrandsApi = async (user, navigation) => {
  const data = await post_request({
    target: '/api/brand/edit',
    body: user,
    navigation: navigation,
  });
  return data;
};

export const createAdminProduct = async (user, navigation) => {
  const data = await post_request({
    target: '/api/product/createProduct',
    body: user,
    navigation: navigation,
    formData: true,
  });
  return data;
};

export const getAdminProductsApi = async (
  navigation,
  page,
  searchData,
  category,
) => {
  const data = await get_request({
    target: `/api/product/viewProducts?page=${page}&search=${searchData}&category=${
      category || ''
    }&productType=${'product'}`,
    navigation: navigation,
  });
  return data;
};
export const getAdminCardApi = async (navigation, page, searchData) => {
  const data = await get_request({
    target: `/api/product/viewProducts?page=${page}&search=${searchData}&productType=${'card'}`,
    navigation: navigation,
  });
  return data;
};

export const getProductDetail = async (navigation, id) => {
  const data = await get_request({
    target: `/api/product/${id}`,
    navigation: navigation,
  });
  return data;
};

export const editAdminProductApi = async (user, navigation) => {
  const data = await post_request({
    target: '/api/product/edit',
    body: user,
    navigation: navigation,
    formData: true,
  });
  return data;
};

export const delAdminProductsApi = async (user, navigation) => {
  const data = await post_request({
    target: '/api/product/delete',
    body: user,
    navigation: navigation,
  });
  return data;
};
