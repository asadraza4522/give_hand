import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native';
import Color from '../theme/color';
import RNVICustom from '../utilies/RNVICustom';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const BottomSheet = props => {
  return (
    <Modal
      transparent={true}
      visible={props.modalVisible}
      animationType={props.middle ? 'fade' : 'slide'}
      onRequestClose={() => {
        props.setModalVisibility(false);
      }}>
      <TouchableOpacity
        disabled
        onPress={() => {
          props.setModalVisibility(false);
        }}
        style={[styles.container, props.middle && {justifyContent: 'center'}]}>
        <View
          style={[
            styles.modal,
            {
              width: props.width ? props.width : WIDTH,
              height: props.height ? props.height : HEIGHT,
            },
            props.middle && styles.middleStyle,
          ]}>
          <RNVICustom
            onPress={() => {
              props.setModalVisibility(false);
            }}
            style={{position: 'absolute', top: 10, right: 20}}
            Lib={'MaterialIcons'}
            Cname={'cancel'}
            Csize={23}
            Ccolor={Color.ThemeColor}
          />
          {props.children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: '10%',
    paddingHorizontal: '4%',
    borderBottomColor: 'white',
  },
  option: {
    alignItems: 'flex-start',
  },
  middleStyle: {borderRadius: 30, alignSelf: 'center', elevation: 5},
});

export default BottomSheet;
