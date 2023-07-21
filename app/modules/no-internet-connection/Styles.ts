import {StyleSheet} from 'react-native';
import {Colors, moderateScale, verticalScale, width} from '../../theme';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  text: {
    fontSize: moderateScale(32),
    color: Colors.black,
  },
  refreshContainer: {
    marginTop: verticalScale(30),
  },
  noInternetGif: {
    height: (width * 2) / 3,
    width: (width * 2) / 3,
  },
  refreshImage: {
    height: moderateScale(50),
    width: moderateScale(50),
  },
});

export default Styles;
