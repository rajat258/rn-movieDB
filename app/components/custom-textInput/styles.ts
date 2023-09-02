import {StyleSheet} from 'react-native';
import {Colors, globalMetrics, moderateScale} from '../../theme';

const os = globalMetrics.isIos ? moderateScale(0.5) : moderateScale(1);

export const styles = StyleSheet.create({
  textInput: {
    borderWidth: os,
    borderColor: Colors.black,
  },
  focusedTextInput: {
    borderWidth: moderateScale(2),
    borderColor: Colors.accent200,
  },
  error: {
    alignSelf: 'flex-start',
    // marginLeft given in '%' because TextInput width is given in '%'.
    marginLeft: '12%',
    color: Colors.red,
    fontWeight: '500',
    fontSize: moderateScale(14),
  },
});
