import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {Routes} from '../../../constants';
import {Colors} from '../../../theme';
import {MovieType, PopularDataStateType} from '../../../type';

interface ItemHookReturnType {
  isLoaded: boolean;
  tv: boolean;
  handleItem: () => void;
  handleItemSettings: () => void;
  handleImageLoad: () => void;
  percentageColor: () => string;
}

const useItem = ({item}: {item: MovieType}): ItemHookReturnType => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const {
    list: {tv},
  } = useSelector((state: PopularDataStateType) => state.popularData);
  const handleItem = () =>
    navigation.navigate(Routes.detailScreen, {
      id: item?.id,
      tv: item?.name ? true : false,
    });

  const handleImageLoad = () => setIsLoaded(true);

  const handleItemSettings = () => {};

  /**
   * Returns a Color on based of percentage.
   * @returns {string}
   **/
  const percentageColor = (): string => {
    if (item.vote_average <= 3.3) {
      return Colors.red;
    } else if (item?.vote_average <= 6.6) {
      return Colors.yellow;
    } else {
      return Colors.green;
    }
  };

  return {
    tv,
    isLoaded,
    handleImageLoad,
    percentageColor,
    handleItem,
    handleItemSettings,
  };
};

export default useItem;
