import {useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import {
  globalMetrics,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

interface SizeType {
  height: number;
  width: number;
  isFullScreen?: boolean;
}

interface NaturalSizeType {
  height: number;
  width: number;
  orientation: 'landscape' | 'portrait';
}

export interface VideoHookReturnType {
  size: SizeType;
  isPlaying: boolean;
  videoRef: React.MutableRefObject<Video | undefined>;
  videoOnLoad: ({naturalSize}: {naturalSize: NaturalSizeType}) => void;
  videoPlayButton: () => void;
  fullScreenDismiss: () => void;
}

const useVideo = (): VideoHookReturnType => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [size, setSize] = useState<SizeType>({
    height: moderateScale(200),
    width: moderateScale(200),
    isFullScreen: false,
  });
  const videoRef = useRef<Video>();

  const videoOnLoad = ({naturalSize}: {naturalSize: NaturalSizeType}): void => {
    naturalSize.orientation === 'landscape'
      ? setSize({
          height: verticalScale(200),
          width: horizontalScale(250),
        })
      : setSize({
          height: verticalScale(250),
          width: horizontalScale(200),
        });
    globalMetrics.isIos ? videoRef.current?.seek(1) : videoRef.current?.seek(0);
  };

  const fullScreenDismiss = (): void => {
    if (globalMetrics.isIos) {
      if (!size.isFullScreen) {
        setIsPlaying(false);
      } else {
        videoRef.current?.seek(0);
        setSize({...size, isFullScreen: false});
      }
    } else {
      setIsPlaying(false);
    }
  };

  const videoPlayButton = (): void => {
    setSize({...size, isFullScreen: true});
    setIsPlaying(true);
    globalMetrics.isIos && videoRef.current?.presentFullscreenPlayer();
  };

  useEffect(() => {
    if (!isPlaying) {
      setSize({...size, isFullScreen: false});
      globalMetrics.isIos
        ? videoRef.current?.seek(1)
        : videoRef.current?.seek(0);
    }
  }, [isPlaying]);

  return {
    size,
    isPlaying,
    videoRef,
    videoOnLoad,
    videoPlayButton,
    fullScreenDismiss,
  };
};

export default useVideo;
