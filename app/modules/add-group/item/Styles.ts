import {StyleSheet} from 'react-native';
import {
  Colors,
  globalMetrics,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../theme';

const Styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(20),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    height: moderateScale(60),
    width: moderateScale(60),
    borderRadius: moderateScale(30),
  },
  itemDetailContainer: {
    flexDirection: 'column',
  },
  name: {
    paddingLeft: horizontalScale(10),
    color: Colors.black,
    fontSize: moderateScale(18),
    fontWeight: '800',
  },
  email: {
    paddingLeft: horizontalScale(12),
    color: Colors.black,
    fontSize: moderateScale(13),
    fontWeight: '400',
  },
  selectButton: {
    position: 'absolute',
    right: horizontalScale(20),
    borderWidth: globalMetrics.isIos ? moderateScale(0.5) : moderateScale(1),
    borderColor: Colors.grey,
    height: moderateScale(28),
    width: moderateScale(28),
    borderRadius: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    borderColor: Colors.skyBlue,
    backgroundColor: Colors.skyBlue,
  },
  selectImage: {
    height: moderateScale(16),
    width: moderateScale(16),
    tintColor: Colors.white,
  },
  line: {
    borderColor: Colors.grey,
    marginLeft: globalMetrics.isIos ? moderateScale(80) : 0,
    borderBottomWidth: globalMetrics.isIos
      ? moderateScale(0.5)
      : moderateScale(1),
  },
});

export default Styles;
