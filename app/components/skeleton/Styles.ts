import {StyleSheet} from 'react-native';
import {horizontalScale, moderateScale, verticalScale} from '../../theme';

const Styles = StyleSheet.create({
  chatContainer: {
    flexDirection: 'row',
    height: 'auto',
    marginHorizontal: horizontalScale(10),
    marginVertical: verticalScale(20),
  },
  profilePicture: {
    height: moderateScale(60),
    width: moderateScale(60),
    borderRadius: moderateScale(30),
  },
  chatLongText: {
    marginLeft: horizontalScale(10),
    width: horizontalScale(140),
    height: verticalScale(15),
  },
  chatSmallText: {
    marginTop: verticalScale(5),
    marginLeft: horizontalScale(10),
    width: horizontalScale(50),
    height: verticalScale(15),
  },
  text: {
    marginTop: verticalScale(20),
    marginLeft: horizontalScale(25),
    width: horizontalScale(140),
    height: verticalScale(15),
  },
});

export default Styles;
