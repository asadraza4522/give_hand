import React, {useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ChatMessageInput from '../../components/chats/ChatMessageInput';
import ChatMessageItem from '../../components/chats/ChatMessageItem';
import Loader from '../../components/Loader';
import StatusBarDTWC from '../../components/StatusBarDTWC';
import Color from '../../theme/color';
import {fonts} from '../../theme/fonts';
import Theme from '../../theme/theme';
import {getChatMessages} from '../../utilies/api/apiCalls';

const ChatMessages = ({navigation, route}) => {
  const {receiver, userId, chatRoomId} = route?.params;
  const messagesList = useSelector(state => state.main.chatMessagesList);
  const dispatch = useDispatch();

  useEffect(() => {
    getChatMessages(navigation, chatRoomId, dispatch);
  }, []);

  const renderMessages = ({item, index}) => {
    console.log(
      '🚀 ~ file: ChatMessages.js:63 ~ renderMessages ~ {item, index}:',
      {item, index},
    );
    return (
      <ChatMessageItem data={item} navigation={navigation} userId={userId} />
    );
  };

  return (
    <SafeAreaView style={Theme.container}>
      <StatusBarDTWC />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={120}>
        <View style={{height: '90%'}}>
          <FlatList
            extraData={messagesList}
            style={{marginVertical: '2%'}}
            data={messagesList}
            renderItem={renderMessages}
          />
        </View>
        <ChatMessageInput
          chatRoomID={chatRoomId}
          senderID={userId}
          receiverID={receiver?._id}
          navigation={navigation}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {fontFamily: fonts.bold, color: Color.headingColor},
  date: {
    fontFamily: fonts.light,
    color: Color.headingColor,
    fontSize: 12,
    opacity: 0.5,
    marginTop: 12,
  },
});

export default ChatMessages;
