import {StyleSheet} from 'react-native';
import {
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale,
  width,
} from '../../../../theme';
import {opaqueColor} from '../../../../utils';

const Styles = StyleSheet.create({
  container: {
    width: width,
    paddingHorizontal: horizontalScale(20),
    height: verticalScale(220),
  },
  trailerContainer: {
    backgroundColor: Colors.black,
    width: width,
    // to overwrite the padding of container
    paddingHorizontal: 0,
  },
  buttonContainer: {
    width: '100%',
    alignSelf: 'center',
    height: verticalScale(180),
  },
  threeDotsContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    top: verticalScale(10),
    right: horizontalScale(30),
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
  playImage: {
    position: 'absolute',
    left: '45%',
    right: '45%',
    top: '40%',
    tintColor: opaqueColor(Colors.white, 0.9),
    width: moderateScale(32),
    height: moderateScale(32),
  },
  movieText: {
    textAlign: 'center',
    marginTop: moderateScale(5),
    color: Colors.white,
    fontSize: moderateScale(18),
    fontWeight: '800',
  },
  hideImage: {
    display: 'none',
  },
  crossButton: {
    position: 'absolute',
    zIndex: 1,
    left: '45%',
    right: '45%',
    top: verticalScale(265),
    alignItems: 'center',
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(1),
    borderColor: Colors.white,
  },
  crossImage: {
    height: moderateScale(32),
    width: moderateScale(32),
    tintColor: Colors.white,
  },
});

export default Styles;
