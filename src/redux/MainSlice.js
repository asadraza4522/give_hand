import {createSlice} from '@reduxjs/toolkit';

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    value: 0,
    screens: 's',
    homeProducts: '',
    homeCard: '',
    likeProducts: [],
    productComments: [],
    chatRoomsList: [],
    chatMessagesList: [],
    productCategories: '',
    cartList: '',
    homeLoader: false,
    chatLoader: false,
    feedsList: [],
  },
  reducers: {
    setProductCategories: (state, action) => {
      let prevData = state.productCategories;
      let newData = action.payload;

      let merge =
        prevData?.docs?.length > 0
          ? prevData?.docs?.concat(newData?.docs)
          : newData?.docs;

      newData.docs = merge;

      state.productCategories = newData;
    },
    setHomeLoader: (state, action) => {
      state.homeLoader = action.payload;
    },
    changeScreens: (state, action) => {
      state.screens = action.payload;
    },
    clearHomeProduct: (state, action) => {
      state.homeProducts = [];
    },
    cleanHomeProductQty: (state, action) => {
      let allProducts = state.homeProducts;

      for (let index = 0; index < allProducts.docs.length; index++) {
        allProducts.docs[index].cartQty = 0;
      }

      state.homeProducts = allProducts;
    },
    setHomeProducts: (state, action) => {
      let prevData = state.homeProducts;
      let newData = action.payload;

      for (let index = 0; index < newData.docs.length; index++) {
        for (
          let indexj = 0;
          indexj < state?.cartList?.products?.length;
          indexj++
        ) {
          if (
            state.cartList.products[indexj].productID._id ==
            newData.docs[index]._id
          ) {
            newData.docs[index].cartQty =
              state.cartList.products[indexj].cartQty;
            break;
          }
        }
      }

      let merge =
        prevData?.docs?.length > 0
          ? prevData?.docs?.concat(newData?.docs)
          : newData?.docs;

      newData.docs = merge;

      state.homeProducts = newData;
    },

    updateHomeProducts: (state, action) => {
      let {UProduct, index} = action.payload;

      let products = state.homeProducts;

      products?.docs?.splice(index, 1, UProduct);

      state.homeProducts = products;
    },

    updateProductAllOver: (state, action) => {
      let {p_id, q_ty} = action.payload;

      if (q_ty === undefined) {
        for (let index = 0; index < state.cartList.products.length; index++) {
          if (state.cartList.products[index].productID._id == p_id) {
            q_ty = state.cartList.products[index].cartQty;
            break;
          }
        }
      }

      let products = state.homeProducts;

      for (let index = 0; index < products.docs.length; index++) {
        if (products.docs[index]._id == p_id) {
          products.docs[index].cartQty = q_ty;

          break;
        }
      }
    },

    setCartList: (state, action) => {
      state.cartList = action.payload;
    },

    updateCartList: (state, action) => {
      let {p_id, q_ty} = action.payload;

      let tempCart = state.cartList;
      let t_amount = tempCart.amount;

      for (let index = 0; index < tempCart.products.length; index++) {
        if (tempCart.products[index].productID._id == p_id) {
          let pricing = tempCart.products[index].productID.discountPrice
            ? tempCart.products[index].productID.discountPrice
            : tempCart.products[index].productID.price;

          let prevAMT = tempCart.products[index].cartQty * pricing;
          t_amount = t_amount - prevAMT;

          if (q_ty == 0) {
            tempCart.amount = t_amount;
            tempCart.products.splice(index, 1);
          } else {
            prevAMT = q_ty * pricing;
            t_amount = t_amount + prevAMT;

            tempCart.amount = t_amount;

            tempCart.products[index].cartQty = q_ty;
          }

          break;
        }
      }
      state.cartList = tempCart;
    },
    updateCartByDonation: (state, action) => {
      let {donation} = action.payload;

      let tempCart = state.cartList;
      if (donation != 0) {
        tempCart.amount = tempCart.amount + donation;
        tempCart.donationAmount = donation;
      } else {
        tempCart.amount = tempCart.amount - tempCart.donationAmount;
        tempCart.donationAmount = null;
      }
      console.log('🚀 ~ file: MainSlice.js:160 ~ tempCart:', tempCart);
      state.cartList = tempCart;
    },
    likeProductList: (state, action) => {
      let {body} = action.payload;

      let prevData = state.likeProducts;
      let merge =
        prevData?.docs?.length > 0
          ? prevData?.docs?.concat(body?.docs)
          : body?.docs;

      body.docs = merge;

      state.likeProducts = body;
    },
    setLikeProductList: (state, action) => {
      state.likeProducts = action.payload;
    },
    unLikeProductList: (state, action) => {
      let {body} = action.payload;

      let prevData = state.likeProducts;
      let merge = prevData?.filter(p => p.productID !== body.productID);
      console.log('unLikeProductList', merge);

      body = merge;

      state.likeProducts = body;
    },
    addProductCommentList: (state, action) => {
      let {body} = action.payload;

      let prevData = state.productComments;
      let merge =
        prevData?.docs?.length > 0
          ? prevData?.docs?.concat(body?.docs)
          : body?.docs;

      body.docs = merge;

      state.productComments = body;
    },
    setProductCommentList: (state, action) => {
      state.productComments = action.payload;
    },
    createChatRoomsListData: (state, action) => {
      let {body} = action.payload;

      let prevData = state.chatRoomsList;
      let merge =
        prevData?.docs?.length > 0
          ? prevData?.docs?.concat(body?.docs)
          : body?.docs;

      body.docs = merge;

      state.chatRoomsList = body;
    },
    setChatRoomList: (state, action) => {
      state.chatRoomsList = action.payload;
    },
    setChatLoader: (state, action) => {
      state.chatLoader = action.payload;
    },
    setChatMessageList: (state, action) => {
      state.chatMessagesList = action.payload;
    },
    clearHomeCard: (state, action) => {
      state.homeCard = [];
    },
    cleanHomeCardQty: (state, action) => {
      let allProducts = state.homeCard;

      for (let index = 0; index < allProducts.docs.length; index++) {
        allProducts.docs[index].cartQty = 0;
      }

      state.homeCard = allProducts;
    },
    setHomeCards: (state, action) => {
      let prevData = state.homeCard;
      let newData = action.payload;

      for (let index = 0; index < newData.docs.length; index++) {
        for (
          let indexj = 0;
          indexj < state?.cartList?.products?.length;
          indexj++
        ) {
          if (
            state.cartList.products[indexj].productID._id ==
            newData.docs[index]._id
          ) {
            newData.docs[index].cartQty =
              state.cartList.products[indexj].cartQty;
            break;
          }
        }
      }

      let merge =
        prevData?.docs?.length > 0
          ? prevData?.docs?.concat(newData?.docs)
          : newData?.docs;

      newData.docs = merge;

      state.homeCard = newData;
    },

    updateHomeCards: (state, action) => {
      let {UProduct, index} = action.payload;

      let cards = state.homeCard;

      cards?.docs?.splice(index, 1, UProduct);

      state.homeCard = cards;
    },

    updateCardsAllOver: (state, action) => {
      let {p_id, q_ty} = action.payload;

      if (q_ty === undefined) {
        for (let index = 0; index < state.cartList.products.length; index++) {
          if (state.cartList.products[index].productID._id == p_id) {
            q_ty = state.cartList.products[index].cartQty;
            break;
          }
        }
      }

      let products = state.homeCard;

      for (let index = 0; index < products.docs.length; index++) {
        if (products.docs[index]._id == p_id) {
          products.docs[index].cartQty = q_ty;

          break;
        }
      }
    },
    setFeedsList: (state, action) => {
      let prevData = state.feedsList;
      let newData = action.payload;

      let merge =
        prevData?.docs?.length > 0
          ? prevData?.docs?.concat(newData?.docs)
          : newData?.docs;

      newData.docs = merge;

      state.feedsList = newData;
    },
  },
});

export const {
  setProductCategories,
  setHomeLoader,
  cleanHomeProductQty,
  updateProductAllOver,
  clearHomeProduct,
  changeScreens,
  setHomeProducts,
  updateHomeProducts,
  setCartList,
  updateCartList,
  likeProductList,
  setLikeProductList,
  unLikeProductList,
  addProductCommentList,
  setProductCommentList,
  setChatRoomList,
  setChatLoader,
  createChatRoomsListData,
  setChatMessageList,
  clearHomeCard,
  cleanHomeCardQty,
  setHomeCards,
  updateHomeCards,
  updateCardsAllOver,
  setFeedsList,
  updateCartByDonation,
} = mainSlice.actions;

export default mainSlice.reducer;
