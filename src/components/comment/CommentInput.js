import {ActivityIndicator, StyleSheet, TextInput, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Color from '../../theme/color';
import RNVICustom from '../../utilies/RNVICustom';
import {addProductComment} from '../../utilies/api/apiCalls';
import {useDispatch} from 'react-redux';

const CommentInput = ({productID, navigation}) => {
  let dispatch = useDispatch();
  const [sendingComment, setSendingComment] = useState(false);
  const [comment, setComment] = useState('');
  const [response_to_id, setResponseTo_id] = useState(null);
  const inputRef = useRef();
  const onHandleSend = async () => {
    try {
      if (comment.length > 1) {
        setSendingComment(true);
        let data = {
          ProID: productID,
          Descp: comment,
          replayTo: response_to_id,
        };
        console.log('', data);
        const results = await addProductComment(data, navigation, dispatch);
        setSendingComment(false);
        setComment('');
      }
    } catch (error) {
      console.log('Error ::', error.message);
    }
  };
  return (
    <View style={styles.commentInputContainer}>
      <TextInput
        placeholder={'write comment'}
        placeholderTextColor={Color.black}
        style={styles.commentInput}
        showDone={false}
        value={comment}
        ref={inputRef}
        onChangeText={text => setComment(text)}
        multiline
        maxLength={500}
      />
      {sendingComment ? (
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

export default CommentInput;

const styles = StyleSheet.create({
  commentInputContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignItems: 'center',
    padding: 5,
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
  },
  commentInput: {
    width: '90%',
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    minHeight: 40,
    textAlignVertical: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
