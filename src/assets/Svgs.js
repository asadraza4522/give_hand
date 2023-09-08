import Svg, {
  RadialGradient,
  ClipPath,
  SvgXml,
  Filter,
  Defs,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Circle,
} from 'react-native-svg';
import React from 'react';
import {Image} from 'react-native';

export const SplashIcon = props => (
  <Svg
    width="72"
    height="72"
    viewBox="0 0 72 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect width="72" height="72" rx="16" fill="white" />
  </Svg>
);
