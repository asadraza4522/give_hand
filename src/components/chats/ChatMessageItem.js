import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Theme from '../../theme/theme';
import {baseURL} from '../../utilies/api/instance';

const ChatMessageItem = ({data, userId, navigation}) => {
  const {receiverID, senderID, updatedAt, content} = data;
  const isMyChatRoom = receiverID?._id != userId;
  const onPress = () => {
    console.log('ChatMessageItem ::', data, userId, senderID, isMyChatRoom);
  };
  return (
    <Pressable
      style={[
        Theme.ChatMessageItemContainer,
        {alignSelf: isMyChatRoom ? 'flex-end' : 'flex-start'},
      ]}
      onPress={onPress}>
      <View style={{flex: 1}}>
        <Text style={Theme.chatTitleName}>{content}</Text>
        <Text style={[Theme.chatContent, {alignSelf: 'flex-end'}]}>
          {new Date(updatedAt).toDateString()}
        </Text>
      </View>
    </Pressable>
  );
};

export default ChatMessageItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});
