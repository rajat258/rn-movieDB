import {StyleSheet} from 'react-native';
import {
  height,
  horizontalScale,
  moderateScale,
  verticalScale,
  width,
} from '../../../theme';

const Styles = StyleSheet.create({
  container: {
    paddingLeft: horizontalScale(20),
    marginBottom: verticalScale(50),
  },
  textContainer: {
    flexDirection: 'row',
    marginBottom: verticalScale(20),
  },
  headerText: {
    width: horizontalScale(140),
    height: verticalScale(30),
  },
  button: {
    marginLeft: horizontalScale(30),
    width: horizontalScale(130),
    height: verticalScale(30),
    borderRadius: moderateScale(20),
  },
  itemContainer: {
    width: horizontalScale(140),
    height: verticalScale(250),
    borderRadius: moderateScale(10),
    marginRight: horizontalScale(20),
  },
  infoContainer: {
    marginTop: verticalScale(20),
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
    marginRight: horizontalScale(20),
  },
  textBig: {
    width: horizontalScale(140),
    height: verticalScale(10),
  },
  textSmall: {
    marginTop: verticalScale(10),
    width: horizontalScale(80),
    height: verticalScale(10),
  },
  marginTop: {
    marginTop: verticalScale(20),
  },
  trailerContainer: {
    height: height / 2,
    width: width - horizontalScale(40),
    alignSelf: 'center',
  },
  trailerImage: {
    width: '100%',
    height: verticalScale(180),
    borderRadius: moderateScale(10),
  },
  trailerText: {
    marginTop: verticalScale(10),
    alignSelf: 'center',
    height: verticalScale(15),
    width: width / 2,
    borderRadius: moderateScale(2),
  },
});

export default Styles;
