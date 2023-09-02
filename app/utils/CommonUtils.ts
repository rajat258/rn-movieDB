// import storage from '@react-native-firebase/storage';
import {RefObject} from 'react';
import {Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {IMessage} from 'react-native-gifted-chat';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  PERMISSIONS,
  RESULTS,
  check,
  openSettings,
  request,
} from 'react-native-permissions';
import {CustomFocusMethod} from '../components';
import {Strings} from '../constants';
import {getData} from '../services';
import {Colors} from '../theme';
import type {VideoType} from '../type';

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

const playTrailer = async (url: string): Promise<string> => {
  try {
    const data: VideoType = await getData(url);
    const trailer = data?.videos?.results?.filter(
      e => e.type === Strings.videoTrailer,
    )[0];
    if (trailer?.key) {
      return trailer?.key;
    }
    Alert.alert(Strings.error, Strings.trailerNotAvailable);
    return '';
  } catch (error) {
    Alert.alert(Strings.error, Strings.trailerNotAvailable);
    return '';
  }
};

/**
 * Generate Random Id
 * @param {string} email
 * @returns {string}
 * Returns Generated id
 */
const generateId = (email: string): string => {
  return Math.random() + email;
};

/**
 * Focuses on Text-Input on a given ref
 * @param {RefObject<CustomFocusMethod>} ref
 * @returns {void}
 */
const focusNextRef = (ref: RefObject<CustomFocusMethod>): void => {
  ref.current?.focus();
};

const handleChatImage = async (
  result: ImagePickerResponse,
  id: string,
  onSend: (msg: IMessage[]) => Promise<void>,
  stopLoading: () => void,
): Promise<void> => {
  const image: IMessage = {
    text: '',
    _id: Math.round(Math.random() * 1000000),
    user: {
      _id: id,
    },
    createdAt: new Date(),
  };
  let fileName = result?.assets?.[0]?.uri?.substring(
    result?.assets?.[0]?.uri.lastIndexOf('/') + 1,
  ) as string;
  // Adding Time-stamp to filename
  const extension: string = fileName?.split('.').pop() as string;
  const name: string = fileName?.split('.').slice(0, -1).join('.') as string;
  fileName = name + Date.now() + extension;
  try {
    // Uploading Image to storage-firebase
    await storage()
      .ref(fileName)
      .putFile(result?.assets?.[0]?.uri as string);
    // Fetching url from storage-firebase
    const url: string = await storage().ref(fileName).getDownloadURL();
    if (result?.assets?.[0]?.type?.charAt(0) === 'i') {
      image.image = url;
    } else {
      image.video = url;
    }
    onSend([image]);
    stopLoading();
  } catch (error) {
    Alert.alert(Strings.error, Strings.retryAgain);
    stopLoading();
  }
};

const openImageLibrary = async (
  id: string,
  onSend: (msg: IMessage[]) => Promise<void>,
  stopLoading: () => void,
): Promise<void> => {
  const result: ImagePickerResponse = await launchImageLibrary({
    selectionLimit: 1,
    mediaType: 'mixed',
    includeBase64: true,
  });
  if (!result.didCancel) {
    handleChatImage(result, id, onSend, stopLoading);
  } else {
    stopLoading();
  }
};

const openCamera = async (
  id: string,
  onSend: (msg: IMessage[]) => Promise<void>,
  stopLoading: () => void,
): Promise<void> => {
  const result = await launchCamera({
    mediaType: 'mixed',
    includeBase64: true,
  });
  if (!result.didCancel) {
    handleChatImage(result, id, onSend, stopLoading);
  } else {
    stopLoading();
  }
};

const getCurrentLocation = (
  id: string,
  onSend: (msg: IMessage[]) => Promise<void>,
  stopLoading: () => void,
): void => {
  const coordinates = {
    latitude: 0,
    longitude: 0,
  };
  const message: IMessage = {
    text: '',
    _id: Math.round(Math.random() * 1000000),
    user: {
      _id: id,
    },
    createdAt: new Date(),
  };
  Geolocation.getCurrentPosition(
    position => {
      coordinates.latitude = position.coords.latitude;
      coordinates.longitude = position.coords.longitude;
      const url = `https://maps.google.com/?q=${coordinates.latitude},${coordinates.longitude}`;
      message.text = url;
      onSend([message]);
      stopLoading();
    },
    _ => {
      Alert.alert(Strings.error, Strings.retry);
      stopLoading();
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
};

const alertForPermission = (text: string): void => {
  Alert.alert(Strings.permissionDenied, text, [
    {text: Strings.ok, onPress: openSettings, isPreferred: true},
    {text: Strings.cancel},
  ]);
};

const requestLocationPermission = (accessLocation: () => void): void => {
  request(
    PERMISSIONS.IOS.LOCATION_WHEN_IN_USE ||
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  )
    .then(async result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          Alert.alert(Strings.error, Strings.retryAgain);
          break;
        case RESULTS.DENIED:
          alertForPermission(Strings.accessLocation);
          break;
        case RESULTS.LIMITED:
          accessLocation();
          break;
        case RESULTS.GRANTED:
          accessLocation();
          break;
        case RESULTS.BLOCKED:
          alertForPermission(Strings.accessLocation);
          break;
      }
    })
    .catch(error => {
      Alert.alert(Strings.error, error);
    });
};

const requestGalleryPermission = (accessGallery: () => Promise<void>): void => {
  request(
    PERMISSIONS.IOS.PHOTO_LIBRARY ||
      (PERMISSIONS.ANDROID.READ_MEDIA_VIDEO &&
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES),
  )
    .then(async result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          Alert.alert(Strings.error, Strings.retryAgain);
          break;
        case RESULTS.DENIED:
          alertForPermission(Strings.accessGallery);
          break;
        case RESULTS.LIMITED:
          accessGallery();
          break;
        case RESULTS.GRANTED:
          accessGallery();
          break;
        case RESULTS.BLOCKED:
          alertForPermission(Strings.accessGallery);
          break;
      }
    })
    .catch(error => {
      Alert.alert(Strings.error, error);
    });
};

const requestCameraPermission = (accessCamera: () => Promise<void>): void => {
  request(PERMISSIONS.IOS.CAMERA || PERMISSIONS.ANDROID.CAMERA)
    .then(async result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          Alert.alert(Strings.error, Strings.retryAgain);
          break;
        case RESULTS.DENIED:
          alertForPermission(Strings.accessCamera);
          break;
        case RESULTS.LIMITED:
          accessCamera();
          break;
        case RESULTS.GRANTED:
          accessCamera();
          break;
        case RESULTS.BLOCKED:
          alertForPermission(Strings.accessCamera);
          break;
      }
    })
    .catch(error => {
      Alert.alert(Strings.error, error);
    });
};

const checkLocationPermission = (accessLocation: () => void): void => {
  check(
    PERMISSIONS.IOS.LOCATION_WHEN_IN_USE ||
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  )
    .then(async status => {
      if (status === 'unavailable') {
        Alert.alert(Strings.error, Strings.retryAgain);
      } else if (status === 'denied') {
        requestLocationPermission(accessLocation);
      } else if (status === 'blocked') {
        alertForPermission(Strings.accessLocation);
      } else {
        accessLocation();
      }
    })
    .catch(() => {
      Alert.alert(Strings.error, Strings.retry);
    });
};

const checkCameraPermission = (accessCamera: () => Promise<void>): void => {
  check(PERMISSIONS.IOS.CAMERA || PERMISSIONS.ANDROID.CAMERA)
    .then(async status => {
      if (status === 'unavailable') {
        Alert.alert(Strings.error, Strings.retryAgain);
      } else if (status === 'denied') {
        requestCameraPermission(accessCamera);
      } else if (status === 'blocked') {
        alertForPermission(Strings.accessCamera);
      } else {
        accessCamera();
      }
    })
    .catch(() => {
      Alert.alert(Strings.error, Strings.retry);
    });
};

const checkGalleryPermission = (accessGallery: () => Promise<void>): void => {
  check(
    PERMISSIONS.IOS.PHOTO_LIBRARY ||
      (PERMISSIONS.ANDROID.READ_MEDIA_VIDEO &&
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES),
  )
    .then(async status => {
      if (status === 'unavailable') {
        Alert.alert(Strings.error, Strings.retryAgain);
      } else if (status === 'denied') {
        requestGalleryPermission(accessGallery);
      } else if (status === 'blocked') {
        alertForPermission(Strings.accessGallery);
      } else {
        accessGallery();
      }
    })
    .catch(() => {
      Alert.alert(Strings.error, Strings.retry);
    });
};

export {
  checkCameraPermission,
  checkGalleryPermission,
  checkLocationPermission,
  focusNextRef,
  generateId,
  getCurrentLocation,
  opaqueColor,
  openCamera,
  openImageLibrary,
  percentageColor,
  playTrailer,
};
