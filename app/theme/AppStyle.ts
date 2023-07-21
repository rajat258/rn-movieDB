import {StyleSheet} from 'react-native';
import Colors from './Colors';
import {horizontalScale, moderateScale, width} from './Metrics';

const AppStyle = StyleSheet.create({
  appContainer: {
    flex: 0,
    backgroundColor: Colors.primary,
  },
  container: {
    flex: 1,
  },
  backgroundColor: {
    backgroundColor: Colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidth: {
    width: width,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  loading: {
    opacity: 0.5,
  },
  activityIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: '50%',
    bottom: '50%',
    zIndex: 1,
  },
  whiteBlurLine: {
    zIndex: 2,
    right: 0,
    position: 'absolute',
    height: '100%',
    width: horizontalScale(40),
  },
  icon: {
    height: moderateScale(24),
    width: moderateScale(24),
  },
});
export default AppStyle;
