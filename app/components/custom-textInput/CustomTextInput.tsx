import React, {useState} from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';
import {Colors} from '../../theme';
import {InputTypes} from './InputTypes';
import {styles} from './styles';

const CustomTextInput: InputTypes = (
  {errors, touched, style, onBlur = () => {}, ...rest},
  ref,
): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);

  const textInputStyle = StyleSheet.flatten([
    isFocused ? styles.focusedTextInput : styles.textInput,
    style,
  ]);

  const onBlurFunction = (): void => {
    onBlur();
    setIsFocused(false);
  };

  return (
    <>
      <TextInput
        ref={ref as React.RefObject<TextInput>}
        autoComplete="off"
        style={textInputStyle}
        onBlur={onBlurFunction}
        onFocus={() => setIsFocused(true)}
        autoCapitalize="none"
        placeholderTextColor={Colors.grey}
        allowFontScaling={false}
        {...rest}
      />
      {errors && touched && (
        <Text style={styles.error} allowFontScaling={false}>
          {errors}
        </Text>
      )}
    </>
  );
};

export default React.forwardRef(CustomTextInput);
