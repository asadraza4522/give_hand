import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import {useDispatch, useSelector} from 'react-redux';
import {getProductComments} from '../../utilies/api/apiCalls';

const CommentView = ({navigation, route}) => {
  const productID = route?.params?.productID;
  const productCommentsList = useSelector(state => state.main.productComments);
  let dispatch = useDispatch();
  useEffect(() => {
    getProductComments(navigation, productID, dispatch);
  }, []);
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={120}>
      <View
        stlye={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <View style={{height: '90%'}}>
          <FlatList
            data={productCommentsList.filter(
              item => item.productID === productID,
            )}
            key={item => item}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <CommentItem item={item} index={index} />
            )}
            ListFooterComponent={<View style={{height: 50}} />}
          />
        </View>
        <CommentInput productID={productID} navigation={navigation} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CommentView;

const styles = StyleSheet.create({});
