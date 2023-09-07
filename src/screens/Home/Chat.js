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
import {getChatRoomList} from '../../utilies/api/apiCalls';
import Loader from '../../components/Loader';
import Color from '../../theme/color';
import ChatRoomItem from '../../components/chats/ChatRoomItem';
import RNVICustom from '../../utilies/RNVICustom';
import {get_data} from '../../utilies/AsyncStorage/AsyncStorage';
import {useFocusEffect} from '@react-navigation/native';

const Chat = ({navigation}) => {
  const {height, width} = Dimensions.get('window');
  const chatRoomList = useSelector(state => state.main.chatRoomsList);
  console.log('🚀 ~ file: Chat.js:37 ~ Chat ~ chatRoomList:', chatRoomList);
  const chatLoader = useSelector(state => state.main.chatLoader);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const renderChatRoomList = ({index, item}) => (
    <ChatRoomItem
      index={index}
      key={item._id}
      data={item}
      navigation={navigation}
      userId={user?.id}
    />
  );
  const getUser = async () => {
    const userData = await get_data('@userData');
    console.log(userData);
    setUser(userData);
  };
  useFocusEffect(
    useCallback(() => {
      getChatRoomList(navigation, '', dispatch);
      getUser();
    }, []),
  );

  const LoadMoreChatRooms = () => {
    // if (homeProducts.page <= homeProducts.totalPages) {
    //   getProductsUser(navigation, homeProducts.page + 1, '', dispatch);
    //   getLikeProducts(navigation, '', dispatch);
    // }
  };

  return (
    <SafeAreaView style={Theme.container}>
      <StatusBarDTWC />
      <Loader animating={chatLoader} />
      <FlatList
        extraData={chatRoomList}
        style={{flex: 1, margin: '2%'}}
        data={chatRoomList}
        ListEmptyComponent={
          <View style={{justifyContent: 'center', height: height / 2}}>
            <Text style={styles.emptyTextStyle}>
              There is Nothing To Show :(
            </Text>
          </View>
        }
        renderItem={renderChatRoomList}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.4}
        onEndReached={LoadMoreChatRooms}
        keyExtractor={item => item?._id}
      />
      <Pressable
        style={styles.newChat}
        onPress={() => navigation.navigate('AddNewChatRoom', {user: user})}>
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

export default Chat;
