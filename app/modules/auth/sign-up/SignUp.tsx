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
import useSignUp, {SignUpHookReturnType} from './useSignUp';

const SignUp = (): JSX.Element => {
  const {
    isLoading,
    emailRef,
    phoneRef,
    passwordRef,
    confirmPasswordRef,
    jumpToLogin,
    checkCredential,
    handleChange,
    errors,
    setFieldTouched,
    touched,
    values,
  }: SignUpHookReturnType = useSignUp();

  const containerStyle = StyleSheet.flatten([
    AppStyle.fullHeightWidth,
    AppStyle.backgroundColor,
  ]);
  const signUpButtonStyle = StyleSheet.flatten([
    styles.button,
    isLoading && styles.opacity,
  ]);
  const loginButtonStyle = StyleSheet.flatten([
    styles.jumpButton,
    isLoading && styles.opacity,
  ]);

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      extraScrollHeight={globalMetrics.isAndroid ? -100 : 0}
      contentContainerStyle={styles.signUpContainer}
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
          placeholder={Strings.enterName}
          onSubmitEditing={() => focusNextRef(emailRef)}
          onChangeText={handleChange('name')}
          onBlur={() => setFieldTouched('name')}
          value={values.name}
          touched={touched.name}
          errors={errors.name ?? ''}
        />
      </Animatable.View>
      <Animatable.View
        duration={1500}
        animation="bounceIn"
        style={styles.animatableView}>
        <CustomTextInput
          ref={emailRef}
          keyboardType="email-address"
          returnKeyType="next"
          style={styles.textInput}
          placeholder={Strings.enterEmail}
          onSubmitEditing={() => focusNextRef(phoneRef)}
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
          ref={phoneRef}
          keyboardType="phone-pad"
          returnKeyType="next"
          style={styles.textInput}
          placeholder={Strings.enterMobileNo}
          onSubmitEditing={() => focusNextRef(passwordRef)}
          onChangeText={handleChange('phone')}
          onBlur={() => setFieldTouched('phone')}
          value={values.phone}
          touched={touched.phone}
          errors={errors.phone ?? ''}
        />
      </Animatable.View>
      <Animatable.View
        duration={1500}
        animation="bounceIn"
        style={styles.animatableView}>
        <CustomTextInput
          secureTextEntry
          ref={passwordRef}
          returnKeyType="next"
          style={styles.textInput}
          placeholder={Strings.enterPassword}
          onSubmitEditing={() => focusNextRef(confirmPasswordRef)}
          onChangeText={handleChange('password')}
          onBlur={() => setFieldTouched('password')}
          value={values.password}
          touched={touched.password}
          errors={errors.password ?? ''}
        />
      </Animatable.View>
      <Animatable.View
        duration={1500}
        animation="bounceIn"
        style={styles.animatableView}>
        <CustomTextInput
          secureTextEntry
          ref={confirmPasswordRef}
          returnKeyType="done"
          style={styles.textInput}
          placeholder={Strings.enterConfirmPassword}
          onSubmitEditing={checkCredential}
          onChangeText={handleChange('confirmPassword')}
          onBlur={() => setFieldTouched('confirmPassword')}
          value={values.confirmPassword}
          touched={touched.confirmPassword}
          errors={errors.confirmPassword ?? ''}
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
          style={signUpButtonStyle}>
          {isLoading ? (
            <ActivityIndicator color={Colors.accent200} animating={isLoading} />
          ) : (
            <GradientText
              text={Strings.signUp}
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
          {Strings.accExist}
        </Text>
        <TouchableOpacity
          disabled={isLoading}
          activeOpacity={0.7}
          onPress={jumpToLogin}
          style={loginButtonStyle}>
          <GradientText
            text={Strings.login}
            colors={[Colors.primary, Colors.accent200]}
            style={styles.jumpText}
          />
        </TouchableOpacity>
      </Animatable.View>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;
