import React from 'react';
import {FlatList, RefreshControl, View, StyleSheet} from 'react-native';
import Color from '../theme/color';
import Theme from '../theme/theme';
import AUserCard from './AUserCard';
import {Btn} from './btn';
import {FormInput} from './FormInput';

const UserSearchAndList = ({
  data,
  loadMore,
  onRefresh,
  refreshData,
  navigation,
  handleFunction,
  search,
  searchData,
  setSearchData,
}) => {
  let SearchIcon = {
    family: 'Feather',
    name: 'search',
    color: Color.neutralGray,
    size: 18,
  };
  let RightIcon = search?.active
    ? {
        family: 'Entypo',
        name: 'cross',
        color: Color.neutralGray,
        size: 18,
        onPress: search.cancelFun,
      }
    : null;

  return (
    <>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <FormInput
          placeholder={search?.placeHolder}
          textInputContainerStyle={Theme.InputView}
          style={styles.FOrmStyle}
          containerStyle={styles.FOrmInputContainer}
          placeholderTextColor={Color.AuthInputsPlaceholder}
          leftIcon={SearchIcon}
          onChangeText={data => {
            setSearchData(data);
          }}
          value={searchData}
          rightIcon={RightIcon}
        />
        <Btn
          onPress={search?.onPress}
          text="Search"
          containerStyle={styles.btnContainer}
          textStyle={styles.btnText}
        />
      </View>

      <FlatList
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={onRefresh} onRefresh={refreshData} />
        }
        onEndReachedThreshold={0.1}
        onEndReached={loadMore}
        showsVerticalScrollIndicator={false}
        style={Theme.AddViewListMargin}
        data={data}
        renderItem={({index, item}) => (
          <AUserCard
            onPress={handleFunction && handleFunction.bind(this, index, item)}
            navigation={navigation}
            item={item}
            index={index}
          />
        )}
      />
    </>
  );
};

export default UserSearchAndList;

const styles = StyleSheet.create({
  btnContainer: [
    Theme.btnStyle,
    {
      paddingHorizontal: 5,
      marginHorizontal: 0,
      marginRight: '3%',
      marginTop: 10,
    },
  ],
  btnText: {...Theme.btnTextstyle, paddingVertical: 8},
  FOrmStyle: {...Theme.TextInputStyle, padding: '3%'},
  FOrmInputContainer: {...Theme.TextInputContainer, marginTop: '5%', flex: 1},
});
