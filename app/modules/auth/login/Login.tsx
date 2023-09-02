import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Images} from '../../../assets';
import {CustomTextInput, GradientText} from '../../../components';
import {Strings} from '../../../constants';
import {AppStyle, Colors, globalMetrics} from '../../../theme';
import {focusNextRef} from '../../../utils';
import styles from '../Styles';
import useLogin, {LoginHookReturnType} from './useLogin';

const Login = (): JSX.Element => {
  const {
    isLoading,
    passwordRef,
    jumpToSignUp,
    checkCredential,
    handleChange,
    errors,
    setFieldTouched,
    touched,
    values,
  }: LoginHookReturnType = useLogin();

  const containerStyle = StyleSheet.flatten([
    AppStyle.fullHeightWidth,
    AppStyle.backgroundColor,
  ]);
  const loginButtonStyle = StyleSheet.flatten([
    styles.button,
    isLoading && styles.opacity,
  ]);
  const signUpButtonStyle = StyleSheet.flatten([
    styles.jumpButton,
    isLoading && styles.opacity,
  ]);

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      extraScrollHeight={globalMetrics.isAndroid ? -100 : 0}
      contentContainerStyle={styles.loginContainer}
      style={containerStyle}>
      <Animatable.Image
        animation="zoomIn"
        source={Images.logo}
        style={styles.logo}
      />
      <Animatable.View
        duration={1500}
        animation="bounceIn"
        style={styles.animatableView}>
        <CustomTextInput
          returnKeyType="next"
          style={styles.textInput}
          placeholder={Strings.enterEmail}
          onSubmitEditing={() => focusNextRef(passwordRef)}
          onChangeText={handleChange('email')}
          onBlur={() => setFieldTouched('email')}
          value={values.email}
          touched={touched.email}
          errors={errors.email ?? ''}
        />
      </Animatable.View>
      <Animatable.View
        duration={1500}
        animation="bounceIn"
        style={styles.animatableView}>
        <CustomTextInput
          secureTextEntry
          ref={passwordRef}
          returnKeyType="done"
          style={styles.textInput}
          placeholder={Strings.enterPassword}
          onSubmitEditing={checkCredential}
          onChangeText={handleChange('password')}
          onBlur={() => setFieldTouched('password')}
          value={values.password}
          touched={touched.password}
          errors={errors.password ?? ''}
        />
      </Animatable.View>
      <Animatable.View
        duration={1500}
        animation="flipInX"
        style={styles.animatableView}>
        <TouchableOpacity
          disabled={isLoading}
          activeOpacity={0.7}
          onPress={checkCredential}
          style={loginButtonStyle}>
          {isLoading ? (
            <ActivityIndicator color={Colors.accent200} animating={isLoading} />
          ) : (
            <GradientText
              text={Strings.login}
              colors={[Colors.indicatorGreen, Colors.accent200]}
              style={styles.buttonText}
            />
          )}
        </TouchableOpacity>
      </Animatable.View>
      <Animatable.View
        duration={1500}
        animation="bounceIn"
        style={styles.accContainer}>
        <Text style={styles.accText} allowFontScaling={false}>
          {Strings.accNotExist}
        </Text>
        <TouchableOpacity
          disabled={isLoading}
          activeOpacity={0.7}
          onPress={jumpToSignUp}
          style={signUpButtonStyle}>
          <GradientText
            text={Strings.signUp}
            colors={[Colors.primary, Colors.accent200]}
            style={styles.jumpText}
          />
        </TouchableOpacity>
      </Animatable.View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
