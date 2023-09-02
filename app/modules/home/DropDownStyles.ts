import {StyleSheet} from 'react-native';
import {
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const DropDownStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    zIndex: 1,
  },
  button: {
    height: moderateScale(30),
    width: horizontalScale(124),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: moderateScale(20),
    zIndex: 1,
  },
  pressed: {
    backgroundColor: Colors.primary,
    zIndex: 1,
    opacity: 0.9,
  },
  buttonText: {
    color: Colors.primary,
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  downArrow: {
    tintColor: Colors.indicatorGreen,
    height: moderateScale(20),
    width: moderateScale(20),
  },
  listContainer: {
    position: 'absolute',
    paddingTop: moderateScale(35),
    paddingBottom: moderateScale(5),
    paddingHorizontal: horizontalScale(20),
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(1),
    borderColor: Colors.black,
    alignSelf: 'center',
    width: horizontalScale(127),
  },
  text: {
    paddingVertical: verticalScale(5),
    color: Colors.black,
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  tintColor: {
    tintColor: Colors.primary,
  },
});

export default DropDownStyles;
