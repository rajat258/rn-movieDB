import {useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Strings, Url} from '../../../constants';
import {popularDataActions} from '../../../redux';
import {getData} from '../../../services';
import {AppDispatch, PopularDataStateType} from '../../../type';

export interface PopularHookReturnType {
  handlePopularDropDown: () => void;
  loadPopularData: ({streaming, tv, rent}: PopularDataProps) => Promise<void>;
  popularDropDown: boolean;
  rent: boolean;
  streaming: boolean;
  tv: boolean;
}

interface PopularDataProps {
  streaming?: boolean;
  tv?: boolean;
  rent?: boolean;
}

const usePopularDropDown = (): PopularHookReturnType => {
  const dispatch = useDispatch<AppDispatch>();
  let list = {
    streaming: true,
    tv: false,
    rent: false,
  };
  const {
    list: {rent, streaming, tv},
  } = useSelector((state: PopularDataStateType) => state.popularData);
  const [popularDropDown, setPopularDropDown] = useState<boolean>(false);

  const handlePopularDropDown = (): void =>
    setPopularDropDown(!popularDropDown);

  const loadPopularData = async ({
    streaming: s = false,
    tv: t = false,
    rent: r = false,
  }: PopularDataProps): Promise<void> => {
    dispatch(popularDataActions.changeShimmer());
    list = {
      streaming: s,
      tv: t,
      rent: r,
    };
    let url: string;
    if (s) {
      url = Url.popularStreaming;
    } else if (t) {
      url = Url.popularTv;
    } else {
      url = Url.popularRent;
    }
    setTimeout(async () => {
      try {
        const data = await getData(url + 1);
        dispatch(popularDataActions.addData({data}));
        dispatch(popularDataActions.changeList({list}));
      } catch (error) {
        Alert.alert(Strings.error, Strings.couldNotLoad);
        dispatch(popularDataActions.resetShimmer());
      }
    }, 2000);
  };

  return {
    rent,
    streaming,
    tv,
    popularDropDown,
    handlePopularDropDown,
    loadPopularData,
  };
};

export default usePopularDropDown;
