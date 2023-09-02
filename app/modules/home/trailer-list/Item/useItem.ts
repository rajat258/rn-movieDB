import {useEffect, useState} from 'react';
import {Url} from '../../../../constants';
import {playTrailer} from '../../../../utils';
import {ItemProps} from './Item';

interface ItemHookReturnType {
  isLoaded: boolean;
  isTrailer: boolean;
  trailer: string;
  handleImageLoad: () => void;
  handleTrailer: () => Promise<void>;
}

const useItem = ({
  item,
  currentIndex,
  index,
}: ItemProps): ItemHookReturnType => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [trailer, setTrailer] = useState<string>('');
  const [isTrailer, setIsTrailer] = useState<boolean>(false);

  const handleTrailer = async (): Promise<void> => {
    if (isTrailer) {
      setIsTrailer(false);
      setTrailer('');
    } else {
      trailerFunction();
    }
  };

  const trailerFunction = async (): Promise<void> => {
    const key = await playTrailer(Url.movie + '/' + item?.id + Url.videos);
    setIsTrailer(key.length !== 0);
    setTrailer(key);
  };

  useEffect(() => {
    if (currentIndex?.current !== index) {
      setTrailer('');
      setIsTrailer(false);
    }
  }, [currentIndex?.current]);

  const handleImageLoad = (): void => setIsLoaded(true);

  return {
    isTrailer,
    trailer,
    handleTrailer,
    isLoaded,
    handleImageLoad,
  };
};

export default useItem;
