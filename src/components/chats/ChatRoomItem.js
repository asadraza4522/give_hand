import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Theme from '../../theme/theme';
import {baseURL} from '../../utilies/api/instance';

const ChatProfile = ({userData}) => {
  return (
    <View style={Theme.chatProfileView}>
      {userData?.avatar ? (
        <Image
          style={Theme.ProfileImg}
          resizeMode="contain"
          source={{
            uri:
              userData?.avatar?.split('/')[0] == 'uploads'
                ? baseURL + '/' + userData?.avatar
                : userData?.avatar,
          }}
        />
      ) : (
        <Text style={Theme.chatTitleName}>{`${userData?.name[0]}`}</Text>
      )}
    </View>
  );
};

const ChatRoomItem = ({data, userId, navigation}) => {
  const {_id, receiverID, senderID, updatedAt, content} = data;
  const isMyChatRoom = receiverID._id === userId;
  const onPress = () => {
    console.log('ChatRoomItem ::', data, userId);
    navigation.navigate('ChatMessages', {
      receiver: isMyChatRoom ? senderID : receiverID,
      userId: userId,
      chatRoomId: _id,
    });
  };
  return (
    <Pressable style={Theme.ChatItemContainer} onPress={onPress}>
      <ChatProfile userData={isMyChatRoom ? senderID : receiverID} />
      <View style={{flex: 1}}>
        <Text style={Theme.chatTitleName}>
          {isMyChatRoom ? senderID?.name : receiverID?.name}
        </Text>
        <Text style={Theme.chatContent}>
          {content ? content?.content : 'New Chat Room'}
        </Text>
      </View>
      <Text style={[Theme.chatContent, {alignSelf: 'flex-end'}]}>
        {new Date(updatedAt).toDateString()}
      </Text>
    </Pressable>
  );
};

export default ChatRoomItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});
