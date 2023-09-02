import {StyleSheet} from 'react-native';
import {
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const Styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    height: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(20),
  },
  textInput: {
    width: '80%',
    height: '100%',
    borderColor: Colors.accent200,
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    justifyContent: 'center',
    paddingLeft: horizontalScale(10),
    fontSize: moderateScale(16),
    color: Colors.black,
  },
  crossButton: {
    position: 'absolute',
    right: horizontalScale(70),
  },
  enterButton: {
    marginLeft: horizontalScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: Colors.accent200,
    padding: moderateScale(11),
  },
  image: {
    tintColor: Colors.accent200,
    height: moderateScale(24),
    width: moderateScale(24),
  },
  flatList: {
    marginTop: verticalScale(10),
    paddingLeft: horizontalScale(20),
  },
  noSearchFound: {
    position: 'absolute',
    top: '20%',
    height: moderateScale(300),
    width: moderateScale(300),
  },
  loadMoreData: {
    width: horizontalScale(140),
    height: verticalScale(250),
    position: 'absolute',
    right: horizontalScale(20),
    bottom: verticalScale(150),
  },
  marginTop: {
    marginTop: verticalScale(10),
  },
});

export default Styles;
