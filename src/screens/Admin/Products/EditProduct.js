import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Theme from '../../../theme/theme';
import {FormInput} from '../../../components/FormInput';
import Color from '../../../theme/color';
import {Btn} from '../../../components/btn';
import {
  editAdminProductApi,
  getProductDetail,
} from '../../../utilies/api/apiController';
import Toast from 'react-native-simple-toast';
import Loader from '../../../components/Loader';
import ViewCat from '../Categories/ViewCat';
import ViewBrand from '../Brands/ViewBrand';
import BottomSheet from '../../../components/BottomSheet';
import {createPostValidation} from '../../../utilies/adminValidations';
import {launchImageLibrary} from 'react-native-image-picker';
import Badge from '../../../components/Badge';
import ImgSmView from '../../../components/ImgSmView';

const EditProduct = ({navigation, route}) => {
  let {productID} = route.params;

  const [productName, setproductName] = useState('');
  const [brandName, setbrandName] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoriesNames, setcategoriesNames] = useState([]);
  const [price, setPrice] = useState('');
  const [discountPrice, setdiscountPrice] = useState('');
  const [searchTags, setSearchTags] = useState('');
  const [searchTagList, setSearchTagList] = useState([]);
  const [errortext, setErrortext] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchModalVisible, setsearchModalVisible] = useState(false);
  const [image, setImage] = useState('');
  const [prevImage, setPrevImage] = useState('');
  const [working, selectWorking] = useState('');

  const launchGallery = async () => {
    let option = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };

    const result = await launchImageLibrary(option);

    if (result.didCancel) {
      setImage('');
    } else {
      setImage(result);
    }
  };

  const getData = async () => {
    setLoading(true);
    let resp = await getProductDetail(navigation, productID);
    if (resp?.data?.error === false) {
      setproductName(resp?.data?.data?.name);
      // setbrandName(resp?.data?.data?.brand)
      setCategories(resp?.data?.data?.categories);
      setcategoriesNames(resp?.data?.data?.categories?.map(i => i.name));
      resp?.data?.data?.tags &&
        setSearchTagList(resp?.data?.data?.tags.split(','));
      setPrice(resp?.data?.data?.price.toString());
      setdiscountPrice(resp?.data?.data?.discountPrice.toString());
      let img = (resp?.data?.data?.image && resp?.data?.data?.image) || '';
      setImage(img);
      setPrevImage(img);
      setLoading(false);
    } else {
      Toast.show(
        resp?.response?.data?.message
          ? resp?.response?.data?.message
          : resp.message
          ? resp.message
          : 'Something Went Wrong!',
        Toast.SHORT,
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const submit = async () => {
    let validate = createPostValidation({
      productName,
      categories,
      price,
      discountPrice,
    });
    if (validate.valid == false) {
      setErrortext(validate.errors);
    } else {
      setErrortext('');
      setLoading(true);

      let choosedCategories = categories.map(i => i._id);
      const newProduct = new FormData();

      if (prevImage != '') {
        if (image != prevImage) {
          if (image == '') {
            newProduct.append('image', '');
          } else {
            newProduct.append('image', {
              uri: image?.assets[0].uri,
              type: image?.assets[0].type,
              name: image?.assets[0].fileName,
            });
          }
          newProduct.append('prevImage', prevImage);
        }
      } else {
        if (image != '') {
          newProduct.append('image', {
            uri: image?.assets[0].uri,
            type: image?.assets[0].type,
            name: image?.assets[0].fileName,
          });
        }
      }

      newProduct.append('_id', productID);
      newProduct.append('name', productName.trim());
      newProduct.append('brand', brandName._id);
      newProduct.append('categories', JSON.stringify(choosedCategories));
      newProduct.append('tags', searchTagList.toString());
      newProduct.append('price', price);
      newProduct.append('discountPrice', discountPrice);

      let resp = await editAdminProductApi(newProduct, navigation);
      if (resp?.data?.error === false) {
        Toast.show(`${productName} updated successfully`, Toast.SHORT);
        setLoading(false);
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
        setLoading(false);
      }
    }
  };

  const selectTheBrand = (index, item) => {
    setbrandName(item);
    setsearchModalVisible(false);
  };

  const selectTheCategorie = (index, item) => {
    let categoriesTemp = [...categories];

    let result = categoriesTemp.findIndex(category => category._id == item._id);

    if (result == -1) {
      setCategories([...categories, item]);
      setcategoriesNames([...categoriesNames, item.name]);
    } else {
      Toast.show(`Category ${item.name} Already selected`, Toast.SHORT);
    }

    setsearchModalVisible(false);
  };

  const addSearchTag = () => {
    if (searchTags != '') {
      setSearchTagList([...searchTagList, searchTags]);
      setSearchTags('');
    }
  };

  const RemoveTag = index => {
    let array = [...searchTagList];

    array.splice(index, 1);

    setSearchTagList(array);
  };

  const RemoveCategory = index => {
    let array = [...categories];
    let arrayNames = [...categoriesNames];

    arrayNames = arrayNames.filter(e => e != array[index].name);
    array.splice(index, 1);
    setCategories(array);
    setcategoriesNames(arrayNames);
  };

  return (
    <SafeAreaView style={Theme.TabViewCreateInsideContainer}>
      <Loader animating={loading} />
      <Text style={Theme.CreateViewHeading}>Edit Product Details</Text>
      <ScrollView
        style={Theme.ScrollViewMargins}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <FormInput
          Title={'Product Name'}
          placeholder="Product Title"
          onChangeText={data => {
            setproductName(data);
            setErrortext('');
          }}
          textInputContainerStyle={Theme.InputView}
          style={Theme.TextInputStyle}
          containerStyle={Theme.TextInputContainer}
          placeholderTextColor={Color.AuthInputsPlaceholder}
          leftIcon={{
            family: 'FontAwesome',
            name: 'product-hunt',
            color: Color.neutralGray,
            size: 18,
          }}
          value={productName}
          error={
            errortext === 'Please Enter Product Name'
              ? 'Please Enter Product Name'
              : null
          }
        />

        <FormInput
          Component={Text}
          onPress={() => {
            setsearchModalVisible(true);
            setErrortext('');
            working !== 'category' && selectWorking('category');
          }}
          Title={'Categories'}
          placeholder="Select Categories"
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
          value={categoriesNames}
          error={
            errortext === 'Please Choose atleast one category!'
              ? 'Please Choose atleast one category!'
              : null
          }
        />

        <FlatList
          style={{marginHorizontal: '3%', marginBottom: -5}}
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({index, item}) => (
            <Badge RemoveTag={RemoveCategory} item={item.name} index={index} />
          )}
        />

        <FormInput
          Title={'Search Tags'}
          placeholder="Specify Tag"
          onChangeText={data => {
            setSearchTags(data);
          }}
          textInputContainerStyle={[Theme.InputView]}
          style={Theme.TextInputStyle}
          containerStyle={Theme.TextInputContainer}
          placeholderTextColor={Color.AuthInputsPlaceholder}
          leftIcon={{
            family: 'Ionicons',
            name: 'pricetags-outline',
            color: Color.neutralGray,
            size: 18,
          }}
          rightIcon={
            searchTags.length > 0 && {
              family: 'AntDesign',
              name: 'checkcircleo',
              color: 'green',
              size: 18,
              onPress: addSearchTag,
            }
          }
          value={searchTags}
        />

        <FlatList
          keyboardShouldPersistTaps="handled"
          style={{marginHorizontal: '3%'}}
          data={searchTagList}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({index, item}) => (
            <Badge item={item} index={index} RemoveTag={RemoveTag} />
          )}
        />

        <FormInput
          placeholder="Price"
          onChangeText={data => {
            setPrice(data);
            setErrortext('');
          }}
          textInputContainerStyle={Theme.InputView}
          style={Theme.TextInputStyle}
          containerStyle={Theme.TextInputContainer}
          placeholderTextColor={Color.AuthInputsPlaceholder}
          leftIcon={{
            family: 'FontAwesome',
            name: 'money',
            color: Color.neutralGray,
            size: 18,
          }}
          keyboardType="number-pad"
          value={price}
          error={
            errortext === 'Please Choose Valid Price'
              ? 'Please Choose Valid Price'
              : errortext === 'Please Enter Price'
              ? 'Please Enter Price'
              : null
          }
        />

        <FormInput
          placeholder="Discounted Price"
          onChangeText={data => {
            setdiscountPrice(data);
            setErrortext('');
          }}
          textInputContainerStyle={Theme.InputView}
          style={Theme.TextInputStyle}
          containerStyle={Theme.TextInputContainer}
          placeholderTextColor={Color.AuthInputsPlaceholder}
          leftIcon={{
            family: 'Fontisto',
            name: 'shopping-sale',
            color: Color.neutralGray,
            size: 18,
          }}
          keyboardType="number-pad"
          value={discountPrice}
          error={
            errortext === 'Please Enter Valid Discount Price'
              ? 'Please Enter Valid Discount Price'
              : null
          }
        />

        <FormInput
          Component={Text}
          placeholder="Upload Image"
          onPress={launchGallery}
          textInputContainerStyle={[Theme.InputView]}
          style={Theme.TextInputStyle}
          containerStyle={Theme.TextInputContainer}
          placeholderTextColor={Color.AuthInputsPlaceholder}
          leftIcon={{
            family: 'Octicons',
            name: 'image',
            color: Color.neutralGray,
            size: 18,
          }}
          value={image != '' ? 'Selected' : ''}
          error={errortext === 'empty' ? 'Please Enter Category Name' : null}
        />

        <ImgSmView set={setImage} image={image} />
      </ScrollView>
      <Btn
        onPress={submit}
        text="Update"
        containerStyle={styles.button}
        textStyle={Theme.btnTextstyle}
      />

      <BottomSheet
        width={'90%'}
        height={'80%'}
        middle
        modalVisible={searchModalVisible}
        setModalVisibility={setsearchModalVisible}>
        {working != '' ? (
          working == 'brand' ? null : (
            <ViewCat getData={selectTheCategorie} HideBackground={false} />
          )
        ) : null}
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    ...Theme.btnStyle,
    marginBottom: '4%',
    elevation: 5,
  },
});

export default EditProduct;
