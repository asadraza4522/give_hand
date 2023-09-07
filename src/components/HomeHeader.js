import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Theme from '../theme/theme';
import RNVICustom from '../utilies/RNVICustom';
import {FormInput} from './FormInput';
import Color from '../theme/color';

const HomeHeader = ({
  navigation,
  Component,
  BackButton,
  search,
  setSearch,
  setSearching,
  focus,
  onSubmitEditing,
}) => {
  const refSearch = useRef();
  const leftIconHai = {
    family: 'AntDesign',
    name: 'search1',
    color: Color.ThemeColor,
    size: 18,
  };

  useEffect(() => {
    if (refSearch.current !== undefined && focus) {
      refSearch.current.focus();
    }
  }, [refSearch]);

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        {BackButton && (
          <RNVICustom
            onPress={() => {
              navigation.goBack();
            }}
            style={{marginRight: '3%'}}
            Ccolor={Color.neutralGray}
            Lib={'Ionicons'}
            Cname={'arrow-back-sharp'}
            Csize={21}
          />
        )}

        <FormInput
          returnKeyType="search"
          onSubmitEditing={onSubmitEditing}
          Component={Component}
          placeholder="Search Product"
          textInputContainerStyle={[Theme.InputView]}
          style={Theme.TextInputStyle}
          containerStyle={[Theme.TextInputContainer, styles.containerForm]}
          placeholderTextColor={Color.AuthInputsPlaceholder}
          leftIcon={leftIconHai}
          onChangeText={data => {
            setSearch && setSearch(data);
            setSearching && setSearching(true);
          }}
          value={search}
          onPress={() => {
            navigation.navigate('HomeSearch');
          }}
          inputRef={refSearch}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    borderBottomColor: Color.borderColors,
    borderBottomWidth: 1,
    paddingVertical: '2%',
    paddingHorizontal: '4%',
    alignItems: 'center',
  },
  containerForm: {marginHorizontal: 0, flex: 1, marginVertical: 5},
  IconStyle: {marginLeft: '5%'},
});

export default HomeHeader;
