import {StyleSheet} from 'react-native';
import {
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const Styles = StyleSheet.create({
  loginContainer: {
    marginTop: verticalScale(150),
    alignItems: 'center',
  },
  signUpContainer: {
    marginTop: verticalScale(50),
    alignItems: 'center',
  },
  logo: {
    height: moderateScale(150),
    width: moderateScale(150),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(50),
  },
  textInput: {
    marginVertical: verticalScale(10),
    paddingVertical: verticalScale(10),
    width: '80%',
    borderRadius: moderateScale(20),
    paddingHorizontal: horizontalScale(15),
    fontSize: moderateScale(18),
    color: Colors.black,
  },
  animatableView: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    marginTop: verticalScale(10),
    width: '80%',
    height: verticalScale(45),
    borderRadius: moderateScale(20),
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: moderateScale(22),
    fontWeight: '500',
  },
  accContainer: {
    marginTop: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  accText: {
    fontSize: moderateScale(18),
    fontWeight: '400',
    color: Colors.black,
  },
  jumpButton: {
    marginLeft: horizontalScale(5),
    justifyContent: 'center',
  },
  opacity: {
    opacity: 0.7,
  },
  jumpText: {
    fontSize: moderateScale(20),
    fontWeight: '800',
  },
});

export default Styles;
