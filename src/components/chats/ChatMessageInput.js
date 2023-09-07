import {ActivityIndicator, StyleSheet, TextInput, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Color from '../../theme/color';
import RNVICustom from '../../utilies/RNVICustom';
import {addProductComment, createNewMessage} from '../../utilies/api/apiCalls';
import {useDispatch} from 'react-redux';
import {createNewMessageApi} from '../../utilies/api/apiController';

const ChatMessageInput = ({chatRoomID, navigation, senderID, receiverID}) => {
  console.log(
    '🚀 ~ file: ChatMessageInput.js:10 ~ ChatMessageInput ~ {chatRoomID, navigation, senderID, receiverID}:',
    {chatRoomID, senderID, receiverID},
  );
  const [sendingMessage, setSendingMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [response_to_id, setResponse_to_id] = useState(null);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const onHandleSend = async () => {
    try {
      if (message.length > 1) {
        setSendingMessage(true);
        let data = {
          chatRoomID: chatRoomID,
          content: message,
          replayTo: response_to_id,
          senderID: senderID,
          receiverID: receiverID,
        };
        console.log('', data);
        const results = await createNewMessage(data, navigation, dispatch);
        setSendingMessage(false);
        setMessage('');
      }
    } catch (error) {
      console.log('Error ::', error.message);
    }
  };
  return (
    <View style={styles.messageInputContainer}>
      <TextInput
        placeholder={'Write Message'}
        placeholderTextColor={Color.black}
        style={styles.messageInput}
        showDone={false}
        value={message}
        ref={inputRef}
        onChangeText={text => setMessage(text)}
        multiline
        maxLength={500}
      />
      {sendingMessage ? (
        <ActivityIndicator />
      ) : (
        <View>
          <RNVICustom
            onPress={onHandleSend}
            Lib={'Feather'}
            style={{}}
            Cname={'send'}
            Csize={30}
            Ccolor={Color.ThemeColor}
          />
        </View>
      )}
    </View>
  );
};

export default ChatMessageInput;

const styles = StyleSheet.create({
  messageInputContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    padding: 5,
    justifyContent: 'space-between',
  },
  messageInput: {
    width: '90%',
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    maxHeight: 80,
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
  },
});
