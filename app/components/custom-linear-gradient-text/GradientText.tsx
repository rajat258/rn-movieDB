import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import {StyleProp, StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Styles from './Styles';

interface GradientTextProp {
  text: string;
  colors: Array<string>;
  style: StyleProp<TextStyle>;
}

const MaskedText = ({
  style,
  text,
}: {
  style: StyleProp<TextProps>;
  text: string;
}) => <Text style={style}>{text}</Text>;

const GradientText = ({
  text,
  colors,
  style,
  ...rest
}: GradientTextProp): JSX.Element => {
  const textStyle = StyleSheet.flatten([style, Styles.text]);

  return (
    <MaskedView maskElement={<MaskedText {...{style, text}} />}>
      <LinearGradient {...rest} colors={colors}>
        <Text style={textStyle}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
