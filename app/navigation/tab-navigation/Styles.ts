import {StyleSheet} from 'react-native';
import {Colors, moderateScale} from '../../theme';
import {opaqueColor} from '../../utils';

const Styles = StyleSheet.create({
  tabContainer: {
    paddingTop: moderateScale(5),
    backgroundColor: Colors.primary,
    height: moderateScale(55),
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    height: moderateScale(24),
    width: moderateScale(24),
    tintColor: opaqueColor(Colors.white, 0.7),
  },
  iconFocused: {
    tintColor: Colors.accent200,
  },
  text: {
    color: opaqueColor(Colors.white, 0.7),
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  textFocused: {
    color: Colors.accent200,
    fontSize: moderateScale(16),
    fontWeight: '800',
  },
  tabBarStyle: {
    backgroundColor: Colors.primary,
  },
});

export default Styles;
