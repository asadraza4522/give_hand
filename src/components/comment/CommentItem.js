import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Color from '../../theme/color';

const CommentItem = ({item, index}) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.contentText}>{item.descp}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.user}>{'by : ' + item.userEmail}</Text>
        <Text style={styles.date}>
          {new Date(item.createdAt).toDateString()}
        </Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: Color.grey,
  },
  date: {
    fontSize: 12,
    textAlign: 'right',
  },
  contentText: {
    fontSize: 16,
    fontWeight: '600',
  },
  detailsContainer: {
    flexDirection: 'row',
    width: '100%',
    margin: 5,
    justifyContent: 'space-between',
  },
});
