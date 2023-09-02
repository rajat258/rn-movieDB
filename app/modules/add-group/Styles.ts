import {StyleSheet} from 'react-native';
import {
  Colors,
  globalMetrics,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalContainer: {
    alignSelf: 'center',
    position: 'absolute',
    top: '40%',
    bottom: '40%',
    height: verticalScale(100),
    width: '80%',
    borderRadius: moderateScale(10),
    backgroundColor: Colors.whiteGrey,
  },
  crossButton: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.skyBlue,
    height: moderateScale(24),
    width: moderateScale(24),
    marginLeft: horizontalScale(10),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    borderRadius: moderateScale(12),
  },
  tickButton: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.skyBlue,
    height: moderateScale(24),
    width: moderateScale(24),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: horizontalScale(10),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    borderRadius: moderateScale(12),
  },
  crossImage: {
    tintColor: Colors.white,
    height: moderateScale(24),
    width: moderateScale(24),
  },
  tickImage: {
    tintColor: Colors.white,
    height: moderateScale(18),
    width: moderateScale(18),
  },
  textInput: {
    fontSize: moderateScale(16),
    color: Colors.black,
    alignSelf: 'center',
    borderColor: Colors.grey,
    borderRadius: moderateScale(10),
    borderWidth: globalMetrics.isAndroid
      ? moderateScale(1)
      : moderateScale(0.5),
    paddingLeft: horizontalScale(10),
    backgroundColor: Colors.white,
    width: '80%',
    height: verticalScale(40),
  },
});

export default Styles;
