import {StyleSheet} from 'react-native';
import {
  Colors,
  globalMetrics,
  height,
  horizontalScale,
  moderateScale,
  verticalScale,
  width,
} from '../../../theme';

const Styles = StyleSheet.create({
  container: {
    // need exactly half size of device
    height: height / 2,
    marginBottom: verticalScale(50),
    zIndex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    height: height / 2,
    width: width,
  },
  headerContentContainer: {
    marginTop: verticalScale(30),
  },
  headerText: {
    color: Colors.white,
    fontSize: moderateScale(24),
    fontWeight: '600',
    marginRight: horizontalScale(20),
    marginLeft: horizontalScale(20),
  },
  flatList: {
    zIndex: globalMetrics.isIos ? -1 : 0,
  },
});

export default Styles;
