import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Composer, ComposerProps, IMessage} from 'react-native-gifted-chat';
import {Images} from '../../assets';
import {
  checkCameraPermission,
  checkGalleryPermission,
  checkLocationPermission,
  getCurrentLocation,
  openCamera,
  openImageLibrary,
} from '../../utils';
import styles from './Styles';

interface InputBarProps {
  props: ComposerProps;
  text: string;
  userId: string;
  onSend: (msg: IMessage[]) => Promise<void>;
  startLoading: () => void;
  stopLoading: () => void;
}

const InputBar = ({
  props,
  text,
  onSend,
  userId,
  startLoading,
  stopLoading,
}: InputBarProps): JSX.Element => {
  const accessLocation = (): void => {
    startLoading();
    getCurrentLocation(userId, onSend, stopLoading);
  };

  const accessCamera = async (): Promise<void> => {
    startLoading();
    await openCamera(userId, onSend, stopLoading);
  };

  const accessGallery = async (): Promise<void> => {
    startLoading();
    await openImageLibrary(userId, onSend, stopLoading);
  };

  return (
    <View style={styles.inputBarContainer}>
      {text.length === 0 && (
        <TouchableOpacity
          onPress={() => checkLocationPermission(accessLocation)}>
          <Image source={Images.location} style={styles.locationIcon} />
        </TouchableOpacity>
      )}
      <Composer textInputStyle={styles.composerTextInput} {...props} />
      {text.length === 0 && (
        <>
          <TouchableOpacity
            onPress={() => checkGalleryPermission(accessGallery)}>
            <Image source={Images.gallery} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => checkCameraPermission(accessCamera)}
            style={styles.photoButton}>
            <Image source={Images.camera} style={styles.icon} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default InputBar;
