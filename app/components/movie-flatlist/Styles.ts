import {StyleSheet} from 'react-native';
import {
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const Styles = StyleSheet.create({
  container: {
    height: moderateScale(30),
    flexDirection: 'row',
    marginBottom: verticalScale(20),
  },
  headerText: {
    color: Colors.black,
    fontSize: moderateScale(24),
    fontWeight: '500',
    marginRight: horizontalScale(20),
  },
  flatList: {
    paddingLeft: horizontalScale(20),
    zIndex: -1,
  },
});

export default Styles;
