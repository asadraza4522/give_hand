import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import Color from '../theme/color';
import RNVICustom from '../utilies/RNVICustom';
import Theme from '../theme/theme';
import {fonts} from '../theme/fonts';

const FormInput = data => {
  let {
    Title,
    error,
    leftIcon,
    ListData,
    ListOnPress,
    containerStyle,
    errorStyle,
    forgetPassword,
    forget,
    textInputContainerStyle,
    Component,
    rightIcon,
  } = data;

  return (
    <View style={[containerStyle]}>
      {Title && <Text style={Theme.FormInputTitle}>{Title}</Text>}
      <View style={textInputContainerStyle}>
        {leftIcon && (
          <RNVICustom
            onPress={leftIcon?.onPress}
            Lib={leftIcon?.family}
            style={[Theme.FormInputLeftIcon, leftIcon?.style]}
            Cname={leftIcon?.name}
            Csize={leftIcon?.size}
            Ccolor={leftIcon?.color}
          />
        )}
        {Component ? (
          <Component
            {...data}
            style={[data.style, {paddingLeft: '1%', paddingVertical: 13.8}]}>
            {data?.value !== undefined && data?.value?.length != 0
              ? Array.isArray(data?.value)
                ? data?.value.toString()
                : data?.value
              : data?.placeholder}
          </Component>
        ) : (
          <TextInput {...data} autoCapitalize="none" ref={data?.inputRef} />
        )}

        {rightIcon && (
          <RNVICustom
            onPress={rightIcon?.onPress}
            Lib={rightIcon?.family}
            style={[
              Theme.FormInputLeftIcon,
              rightIcon?.style,
              {marginRight: 0},
            ]}
            Cname={rightIcon?.name}
            Csize={rightIcon?.size}
            Ccolor={rightIcon?.color}
          />
        )}
      </View>

      {ListData?.length != 0 && ListData && (
        <View style={Theme.FormInputListDesign}>
          {ListData.map(i => (
            <Text
              onPress={ListOnPress.bind(this, i)}
              style={{marginVertical: 8, fontFamily: fonts.medium}}
              key={i}>
              {i}
            </Text>
          ))}
        </View>
      )}

      {error && (
        <Text
          style={[
            {
              color: 'red',
              marginTop: 2,
              marginBottom: -8,
              marginLeft: 2,
              fontFamily: fonts.light,
              fontSize: 12,
            },
            errorStyle,
          ]}>
          {error}
        </Text>
      )}
      {forget && (
        <TouchableOpacity
          style={{marginTop: 5, marginRight: '4.5%'}}
          onPress={forgetPassword}>
          <Text
            style={{
              textAlign: 'right',
              marginTop: 5,
              fontWeight: '500',
              color: 'white',
              fontFamily: 'Lato-Black',
              fontSize: 15,
            }}>
            Forget password?
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export {FormInput};
