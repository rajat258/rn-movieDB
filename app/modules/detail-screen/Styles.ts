import {StyleSheet} from 'react-native';
import {
  Colors,
  globalMetrics,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.detail,
  },
  backgroundImage: {
    width: '100%',
    height: moderateScale(200),
  },
  gradientLayer: {
    position: 'absolute',
    width: '100%',
    height: moderateScale(200),
  },
  posterImage: {
    height: moderateScale(160),
    width: moderateScale(100),
    position: 'absolute',
    top: moderateScale(20),
    left: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  title: {
    width: '90%',
    alignSelf: 'center',
    marginTop: verticalScale(30),
    fontSize: moderateScale(18),
    color: Colors.white,
    fontWeight: '600',
    textAlign: 'center',
  },
  releaseDate: {
    fontSize: moderateScale(14),
    color: Colors.white,
    fontWeight: '400',
  },
  scoreTrailerContainer: {
    marginTop: verticalScale(30),
    marginBottom: verticalScale(10),
    flexDirection: 'row',
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    alignSelf: 'center',
    height: '60%',
    width: globalMetrics.isAndroid ? moderateScale(1) : moderateScale(0.5),
    backgroundColor: Colors.white,
  },
  userText: {
    marginLeft: horizontalScale(10),
    fontSize: moderateScale(14),
    color: Colors.white,
    fontWeight: '600',
    textAlign: 'center',
  },
  playImage: {
    tintColor: Colors.white,
    height: moderateScale(18),
    width: moderateScale(18),
  },
  infoContainer: {
    marginTop: verticalScale(20),
    height: verticalScale(80),
    width: '100%',
    backgroundColor: Colors.darkDetail,
    borderTopWidth: moderateScale(1),
    borderBottomWidth: moderateScale(1),
    borderColor: Colors.black,
  },
  infoChildContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    marginLeft: horizontalScale(20),
    marginTop: verticalScale(20),
    fontSize: moderateScale(18),
    color: Colors.white,
    fontWeight: '800',
  },
  detailText: {
    textAlign: 'justify',
    marginRight: horizontalScale(10),
    marginLeft: horizontalScale(20),
    marginTop: verticalScale(5),
    fontSize: moderateScale(14),
    color: Colors.white,
    fontWeight: '400',
  },
  paddingBottom: {
    paddingBottom: verticalScale(20),
  },
});

export default Styles;
