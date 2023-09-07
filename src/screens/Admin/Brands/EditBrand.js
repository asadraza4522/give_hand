import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import Theme from '../../../theme/theme';
import {FormInput} from '../../../components/FormInput';
import Color from '../../../theme/color';
import {Btn} from '../../../components/btn';
import {editAdminBrandsApi} from '../../../utilies/api/apiController';
import Toast from 'react-native-simple-toast';
import Loader from '../../../components/Loader';

const EditBrand = ({navigation, route}) => {
  let {brandData, index} = route.params;

  const [brandName, setbrandName] = useState('');
  const [errortext, seterrortext] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setbrandName(brandData.name);
  }, []);

  const submit = async () => {
    if (brandName != '') {
      setLoading(true);

      let resp = await editAdminBrandsApi(
        {name: brandName, _id: brandData._id},
        navigation,
      );
      if (resp?.data?.error === false) {
        Toast.show(resp?.data?.message, Toast.SHORT);
        let newItem = brandData;
        newItem.name = brandName;
        navigation.navigate('ABrands', {newItem});
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
    } else {
      seterrortext('empty');
    }
  };

  return (
    <SafeAreaView style={Theme.TabViewCreateInsideContainer}>
      <Loader animating={loading} />
      <Text style={Theme.CreateViewHeading}>Edit Brand Name</Text>
      <ScrollView
        style={Theme.ScrollViewMargins}
        showsVerticalScrollIndicator={false}>
        <FormInput
          Title={'Brand Name'}
          placeholder="Brand Title"
          onChangeText={data => {
            setbrandName(data);
            seterrortext('');
          }}
          textInputContainerStyle={[Theme.InputView]}
          style={[Theme.TextInputStyle]}
          containerStyle={Theme.TextInputContainer}
          placeholderTextColor={Color.AuthInputsPlaceholder}
          leftIcon={{
            family: 'MaterialIcons',
            name: 'texture',
            color: Color.neutralGray,
            size: 18,
          }}
          value={brandName}
          error={errortext === 'empty' ? 'Please Enter Category Name' : null}
        />
      </ScrollView>
      <Btn
        onPress={submit}
        text="Update"
        containerStyle={styles.button}
        textStyle={Theme.btnTextstyle}
      />
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

export default EditBrand;
