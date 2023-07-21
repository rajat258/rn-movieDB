import {StyleSheet} from 'react-native';
import {
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../theme';

const Styles = StyleSheet.create({
  container: {
    width: horizontalScale(140),
    height: verticalScale(400),
    marginRight: horizontalScale(20),
  },
  buttonContainer: {
    height: verticalScale(250),
  },
  threeDotsContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    top: verticalScale(10),
    right: horizontalScale(10),
    height: moderateScale(22),
    width: moderateScale(22),
    borderRadius: moderateScale(11),
    padding: moderateScale(4),
    backgroundColor: Colors.white + '80',
  },
  threeDotsImage: {
    height: '100%',
    width: '100%',
    tintColor: Colors.black + '50',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: moderateScale(10),
  },
  progressContainer: {
    position: 'relative',
    bottom: moderateScale(18),
    left: horizontalScale(10),
    height: moderateScale(30),
    width: moderateScale(30),
  },
  detailsContainer: {
    width: '90%',
    marginLeft: horizontalScale(10),
  },
  movieText: {
    marginTop: moderateScale(25),
    color: Colors.black,
    fontSize: moderateScale(14),
    fontWeight: '800',
  },
  dateText: {
    color: Colors.grey,
    marginVertical: verticalScale(5),
    fontSize: moderateScale(13),
    fontWeight: '500',
  },
  hideImage: {
    // used for shimmer effect for android
    display: 'none',
  },
});

export default Styles;
