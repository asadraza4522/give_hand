import React, {useCallback, useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Dimensions,
  Pressable,
} from 'react-native';
import Theme from '../../theme/theme';
import StatusBarDTWC from '../../components/StatusBarDTWC';
import {useSelector, useDispatch} from 'react-redux';
import {getChatRoomList, getFeeds} from '../../utilies/api/apiCalls';
import Loader from '../../components/Loader';
import Color from '../../theme/color';
import RNVICustom from '../../utilies/RNVICustom';
import {useFocusEffect} from '@react-navigation/native';

const Feeds = ({navigation}) => {
  const {height, width} = Dimensions.get('window');
  const feedsList = useSelector(state => state.main.feedsList);
  const [videoLoader, setVideoLoader] = useState(null);

  const dispatch = useDispatch();

  const renderFeedVideoItem = ({index, item}) => <View />;
  useFocusEffect(
    useCallback(() => {
      getFeeds(navigation, 1, 10, dispatch);
    }, []),
  );

  const LoadMore = () => {
    if (feedsList.page <= feedsList.totalPages) {
      getFeeds(navigation, feedsList.page + 1, '', dispatch);
    }
  };

  return (
    <SafeAreaView style={Theme.container}>
      <StatusBarDTWC />
      <Loader animating={videoLoader} />
      <FlatList
        extraData={feedsList}
        style={{flex: 1, margin: '2%'}}
        data={feedsList}
        ListEmptyComponent={
          <View style={{justifyContent: 'center', height: height / 2}}>
            <Text style={styles.emptyTextStyle}>
              There is Nothing To Show :(
            </Text>
          </View>
        }
        renderItem={renderFeedVideoItem}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.4}
        onEndReached={LoadMore}
        keyExtractor={item => item?._id}
      />
      <Pressable
        style={styles.newChat}
        onPress={() => navigation.navigate('AddNewFeed')}>
        <RNVICustom
          Ccolor={'white'}
          Lib={'AntDesign'}
          Cname={'plus'}
          Csize={25}
        />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topMargin: {marginTop: '8%'},
  newChat: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Color.ThemeColor,
    padding: 10,
    borderRadius: 10,
  },
  emptyTextStyle: {
    fontSize: 12,
    color: Color.neutralGray,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default Feeds;
