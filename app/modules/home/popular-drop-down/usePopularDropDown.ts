import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Url} from '../../../constants';
import {popularDataActions} from '../../../redux';
import {getData} from '../../../services';
import {AppDispatch, PopularDataStateType} from '../../../type';

export interface PopularHookReturnType {
  handlePopularDropDown: () => void;
  loadPopularTvData: () => Promise<void>;
  loadPopularRentData: () => Promise<void>;
  loadPopularStreamData: () => Promise<void>;
  popularDropDown: boolean;
  rent: boolean;
  streaming: boolean;
  tv: boolean;
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

  const loadPopularTvData = async (): Promise<void> => {
    dispatch(popularDataActions.changeShimmer());
    list = {
      streaming: false,
      tv: true,
      rent: false,
    };
    setTimeout(async () => {
      try {
        const data = await getData(Url.popularTv + 1);
        dispatch(popularDataActions.addData({data}));
        dispatch(popularDataActions.changeList({list}));
      } catch (error) {
        dispatch(popularDataActions.changeShimmer());
      }
    }, 2000);
  };

  const loadPopularStreamData = async (): Promise<void> => {
    dispatch(popularDataActions.changeShimmer());
    list = {
      streaming: true,
      tv: false,
      rent: false,
    };
    setTimeout(async () => {
      try {
        const data = await getData(Url.popularStreaming + 1);
        dispatch(popularDataActions.addData({data}));
        dispatch(popularDataActions.changeList({list}));
      } catch (error) {
        dispatch(popularDataActions.changeShimmer());
      }
    }, 2000);
  };

  const loadPopularRentData = async (): Promise<void> => {
    dispatch(popularDataActions.changeShimmer());
    list = {
      streaming: false,
      tv: false,
      rent: true,
    };
    setTimeout(async () => {
      try {
        const data = await getData(Url.popularRent + 1);
        dispatch(popularDataActions.addData({data}));
        dispatch(popularDataActions.changeList({list}));
      } catch (error) {
        dispatch(popularDataActions.changeShimmer());
      }
    }, 2000);
  };

  return {
    rent,
    streaming,
    tv,
    popularDropDown,
    handlePopularDropDown,
    loadPopularTvData,
    loadPopularStreamData,
    loadPopularRentData,
  };
};

export default usePopularDropDown;
