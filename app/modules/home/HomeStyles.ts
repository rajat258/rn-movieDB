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
    alignItems: 'center',
    width: '90%',
    paddingLeft: horizontalScale(20),
    flexDirection: 'row',
    marginBottom: verticalScale(20),
  },
  headerText: {
    color: Colors.black,
    fontSize: moderateScale(24),
    fontWeight: '700',
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
