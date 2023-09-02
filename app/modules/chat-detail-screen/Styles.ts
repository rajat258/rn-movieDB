import {StyleSheet} from 'react-native';
import {
  Colors,
  globalMetrics,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const Styles = StyleSheet.create({
  startChat: {
    position: 'absolute',
    height: '40%',
    width: '100%',
    top: '30%',
    bottom: '30%',
  },
  inputBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: horizontalScale(10),
    paddingBottom: globalMetrics.isIos ? verticalScale(4) : verticalScale(3),
    paddingTop: globalMetrics.isAndroid ? verticalScale(3) : 0,
  },
  composerTextInput: {
    fontSize: globalMetrics.isAndroid ? moderateScale(16) : moderateScale(16),
    backgroundColor: Colors.white,
    paddingTop: verticalScale(10),
    paddingLeft: horizontalScale(10),
    marginHorizontal: horizontalScale(20),
    borderWidth: globalMetrics.isAndroid
      ? moderateScale(1)
      : moderateScale(0.5),
    borderRadius: moderateScale(20),
    borderColor: Colors.grey,
    color: Colors.black,
  },
  sendButton: {
    justifyContent: 'center',
    marginBottom: globalMetrics.isAndroid ? verticalScale(5) : verticalScale(2),
    marginRight: horizontalScale(10),
  },
  sendText: {
    color: Colors.blue,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  photoButton: {
    marginLeft: horizontalScale(15),
    marginRight: horizontalScale(5),
  },
  locationIcon: {
    height: moderateScale(36),
    width: moderateScale(36),
    tintColor: Colors.accent200,
  },
  icon: {
    height: moderateScale(32),
    width: moderateScale(32),
    tintColor: Colors.accent200,
  },
  playPauseImage: {
    tintColor: Colors.whiteGrey,
    height: moderateScale(24),
    width: moderateScale(24),
  },
  videoContainer: {
    height: verticalScale(125),
    width: horizontalScale(125),
  },
  videoButton: {
    position: 'absolute',
    top: '45%',
    left: '45%',
    opacity: 0.5,
  },
  messageContainer: {
    paddingHorizontal: horizontalScale(10),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(20),
    borderRadius: moderateScale(5),
  },
  messageStyle: {
    color: Colors.black,
    fontSize: moderateScale(16),
  },
  messageLink: {
    borderEndWidth: moderateScale(1),
    borderColor: Colors.black,
  },
});

export default Styles;
