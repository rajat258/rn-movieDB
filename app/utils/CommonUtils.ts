import {Alert, Linking} from 'react-native';
import {Strings, Url} from '../constants';
import {getData} from '../services';
import {Colors} from '../theme';
import {VideoType} from '../type';

const zeroPad = (val: string): string => val.padStart(2, '0');

/**
 * Takes color and opacity and returns
 * opaque color according to given opacity.
 * @param {string} color
 * @param {number} opacity from 0.0 to 1.0
 * @returns {string}
 */
const opaqueColor = (color: string, opacity: number): string => {
  const alpha = Math.round(opacity * 255);
  let hex = alpha.toString(16);
  hex = zeroPad(hex);
  return color + hex;
};

/**
 * Returns a Color on based of percentage.
 * @returns {string}
 **/
const percentageColor = (voteAverage: number): string => {
  if (voteAverage <= 3.3) {
    return Colors.red;
  } else if (voteAverage <= 6.6) {
    return Colors.yellow;
  } else {
    return Colors.green;
  }
};

const playTrailer = async (url: string): Promise<void> => {
  try {
    const data: VideoType = await getData(url);
    const trailer = data?.videos?.results?.filter(
      e => e.type === Strings.videoTrailer,
    )[0];
    if (
      (await Linking.canOpenURL(Url.youtube + trailer?.key)) &&
      trailer?.key
    ) {
      await Linking.openURL(Url.youtube + trailer?.key);
    } else {
      Alert.alert(Strings.error, Strings.tryAgain);
    }
  } catch (error) {
    Alert.alert(Strings.error);
  }
};

export {opaqueColor, percentageColor, playTrailer};
