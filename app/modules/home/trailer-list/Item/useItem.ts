import {useState} from 'react';
import {playTrailer} from '../../../../utils';
import {Url} from '../../../../constants';
import {ItemProps} from './Item';

interface ItemHookReturnType {
  isLoaded: boolean;
  handleImageLoad: () => void;
  handleItem: () => void;
  handleItemSettings: () => void;
}

const useItem = ({item}: ItemProps): ItemHookReturnType => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleItem = async (): Promise<void> =>
    await playTrailer(Url.movie + '/' + item?.id + Url.videos);

  const handleImageLoad = (): void => setIsLoaded(true);

  const handleItemSettings = (): void => {};

  return {
    isLoaded,
    handleImageLoad,
    handleItem,
    handleItemSettings,
  };
};

export default useItem;
