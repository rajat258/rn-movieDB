import {StyleSheet} from 'react-native';
import {
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../theme';
import {opaqueColor} from '../../../utils';

const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: verticalScale(75),
    width: '100%',
    paddingHorizontal: moderateScale(10),
    flexDirection: 'row',
    backgroundColor: Colors.primary,
  },
  detailContainer: {
    flex: 0.7,
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  userName: {
    color: Colors.accent200,
    fontSize: moderateScale(22),
    fontWeight: '600',
  },
  active: {
    color: Colors.accent100,
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  groupName: {
    width: '90%',
    color: opaqueColor(Colors.white, 0.7),
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  callContainer: {
    flex: 0.15,
  },
  backButton: {
    marginRight: horizontalScale(10),
  },
  profilePicture: {
    marginRight: horizontalScale(5),
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
  },
  icon: {
    width: moderateScale(26),
    height: moderateScale(26),
    tintColor: Colors.accent200,
  },
});

export default Styles;
