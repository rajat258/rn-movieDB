import {StyleSheet} from 'react-native';
import {Colors, moderateScale} from '../../theme';

const Styles = StyleSheet.create({
  headerContainer: {
    height: 'auto',
    width: '100%',
    paddingHorizontal: moderateScale(10),
    flexDirection: 'row',
    backgroundColor: Colors.primary,
  },
  iconContainer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 0.8,
    alignItems: 'center',
  },
  icon: {
    width: moderateScale(26),
    height: moderateScale(26),
    tintColor: Colors.accent200,
  },
  logo: {
    width: moderateScale(60),
    height: moderateScale(60),
  },
});

export default Styles;
