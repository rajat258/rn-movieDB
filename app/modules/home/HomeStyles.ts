import {StyleSheet} from 'react-native';
import {
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const HomeStyles = StyleSheet.create({
  container: {
    paddingTop: verticalScale(30),
  },
  headerContainer: {
    paddingLeft: horizontalScale(20),
    height: moderateScale(30),
    flexDirection: 'row',
    marginBottom: verticalScale(20),
  },
  headerText: {
    color: Colors.black,
    fontSize: moderateScale(24),
    fontWeight: '600',
    marginRight: horizontalScale(20),
  },
  wave: {
    position: 'absolute',
    height: verticalScale(300),
    width: '100%',
    left: 0,
    bottom: verticalScale(40),
    zIndex: -2,
  },
});

export default HomeStyles;
