import {useEffect, useRef, useState} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {useSelector} from 'react-redux';
import {Url} from '../../../constants';
import {width} from '../../../theme';
import type {TrailerDataStateType} from '../../../type';

export interface TrailerHookReturnType {
  backgroundImage: string;
  _onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  handleBackgroundImage: (image: string) => void;
  currentIndex: React.MutableRefObject<number>;
}

const useTrailer = (): TrailerHookReturnType => {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const currentIndex = useRef<number>(0);

  const {
    shimmer,
    data: {results: trailerData},
  } = useSelector((state: TrailerDataStateType) => state.trailerData);

  /**
   * Callback function onScrolling Flatlist to change backgroundImage
   * @param {NativeSyntheticEvent<NativeScrollEvent>} e
   * @returns {void}
   **/
  const _onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const eWidth = e.nativeEvent.contentOffset.x / width;
    // Math.round used as scroll more than 0.5 to change bgImage
    const index = Math.round(eWidth);
    currentIndex.current = index;
    handleBackgroundImage(
      Url.imageFetchUrl + trailerData[index]?.backdrop_path,
    );
  };

  const handleBackgroundImage = (image: string): void =>
    setBackgroundImage(image);

  useEffect(() => {
    handleBackgroundImage(Url.imageFetchUrl + trailerData[0]?.backdrop_path);
  }, [trailerData]);

  useEffect(() => {
    if (shimmer) {
      setBackgroundImage('');
    }
  }, [shimmer]);

  return {
    currentIndex,
    handleBackgroundImage,
    backgroundImage,
    _onScroll,
  };
};

export default useTrailer;
