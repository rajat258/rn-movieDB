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
    backgroundColor: Colors.background,
  },
  imageContainer: {
    alignSelf: 'center',
    marginTop: verticalScale(20),
  },
  placeholderImage: {
    width: moderateScale(200),
    height: moderateScale(200),
    borderRadius: moderateScale(100),
    borderColor: Colors.accent200,
    borderWidth: globalMetrics.isIos ? moderateScale(0.5) : moderateScale(1),
  },
  detailContainer: {
    borderWidth: globalMetrics.isAndroid
      ? moderateScale(1)
      : moderateScale(0.5),
    borderColor: Colors.accent200,
    borderRadius: moderateScale(30),
    width: '70%',
    height: verticalScale(50),
    alignSelf: 'center',
    marginTop: verticalScale(50),
  },
  headerText: {
    backgroundColor: Colors.background,
    bottom: globalMetrics.isIos ? verticalScale(40) : verticalScale(38),
    left: horizontalScale(25),
    position: 'absolute',
    color: Colors.skyBlue,
    fontSize: moderateScale(15),
    fontWeight: '600',
  },
  containText: {
    top: verticalScale(15),
    left: horizontalScale(25),
    position: 'absolute',
    color: Colors.black,
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
});

export default Styles;
