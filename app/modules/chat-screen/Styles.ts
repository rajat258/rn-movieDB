import {StyleSheet} from 'react-native';
import {
  Colors,
  globalMetrics,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const Styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(20),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    borderColor: Colors.grey,
    marginLeft: globalMetrics.isIos ? moderateScale(80) : 0,
    borderBottomWidth: globalMetrics.isIos
      ? moderateScale(0.5)
      : moderateScale(1),
  },
  itemDetailContainer: {
    flexDirection: 'column',
  },
  profilePicture: {
    height: moderateScale(60),
    width: moderateScale(60),
    borderRadius: moderateScale(30),
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
  messageContainer: {
    paddingLeft: horizontalScale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  readDoubleTick: {
    width: moderateScale(16),
    height: moderateScale(16),
    tintColor: Colors.skyBlue,
  },
  unreadDoubleTick: {
    width: moderateScale(16),
    height: moderateScale(16),
    tintColor: Colors.grey,
  },
  message: {
    width: '85%',
    paddingLeft: horizontalScale(5),
    color: Colors.grey,
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  camera: {
    tintColor: Colors.grey,
    marginLeft: horizontalScale(5),
    marginRight: -horizontalScale(3),
    height: moderateScale(14),
    width: moderateScale(14),
  },
  listFooterContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(30),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  lockImage: {
    width: moderateScale(16),
    height: moderateScale(16),
    tintColor: Colors.grey,
    marginRight: horizontalScale(5),
  },
  personalMessagesText: {
    textAlign: 'center',
    color: Colors.grey,
    fontSize: moderateScale(11),
    fontWeight: '500',
  },
  encryptedText: {
    color: Colors.blue,
    fontSize: moderateScale(11),
    fontWeight: '700',
  },
  hideUser: {
    display: 'none',
  },
  unreadContainer: {
    opacity: 0.8,
    height: moderateScale(18),
    width: moderateScale(18),
    borderRadius: moderateScale(9),
    position: 'absolute',
    right: horizontalScale(20),
  },
});

export default Styles;
