import {useIsFocused} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {Strings, Url} from '../../constants';
import {
  movieDataActions,
  popularDataActions,
  searchDataActions,
  trailerDataActions,
  trendingDataActions,
} from '../../redux';
import {getData} from '../../services';
import {ApiDataType, AppDispatch} from '../../type';

export interface HomeHookReturnType {
  isLoad: boolean;
  _onRefresh: () => Promise<void>;
  scrollViewRef: React.MutableRefObject<null>;
}

interface PromiseProps {
  reason: Array<string>;
  status: string;
}

type PromiseType = Array<Partial<PromiseProps>>;

const useHome = (): HomeHookReturnType => {
  const scrollViewRef = useRef(null);
  const isFocused: boolean = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const initPopular = async (): Promise<void> => {
    const popularTempData: ApiDataType = await getData(
      Url.popularStreaming + 1,
    );
    dispatch(popularDataActions.addData({data: popularTempData}));
  };

  const initMovie = async (): Promise<void> => {
    const movieTempData: ApiDataType = await getData(Url.movieNowPlaying + 1);
    dispatch(movieDataActions.addData({data: movieTempData}));
  };

  const initTrending = async (): Promise<void> => {
    const trendingTempData: ApiDataType = await getData(Url.trendingToday + 1);
    dispatch(trendingDataActions.addData({data: trendingTempData}));
  };

  const initTrailer = async (): Promise<void> => {
    const trailerTempData: ApiDataType = await getData(
      Url.popularStreaming + 1,
    );
    dispatch(trailerDataActions.addData({data: trailerTempData}));
  };

  /**
   * Initial Function used for initializing data.
   * @returns {Promise<void>}
   **/
  const initData = async (): Promise<void> => {
    dispatch(popularDataActions.changeShimmer());
    dispatch(movieDataActions.changeShimmer());
    dispatch(trendingDataActions.changeShimmer());
    dispatch(trailerDataActions.changeShimmer());
    setTimeout(async () => {
      const promise: PromiseType = await Promise.allSettled([
        initPopular(),
        initMovie(),
        initTrending(),
        initTrailer(),
      ]);
      promise.every(element => {
        if (element.status === 'rejected') {
          setIsLoad(false);
          dispatch(popularDataActions.resetShimmer());
          dispatch(movieDataActions.resetShimmer());
          dispatch(trendingDataActions.resetShimmer());
          dispatch(trailerDataActions.resetShimmer());
          Alert.alert(Strings.error, Strings.couldNotLoad);
          return false;
        }
      });
    }, 2000);
  };

  /**
   * Function called onRefresh of ScrollView.
   * @returns {Promise<void>}
   **/
  const _onRefresh = async (): Promise<void> => {
    setIsLoad(true);
    await initData();
    setIsLoad(false);
  };

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    if (isFocused) {
      dispatch(searchDataActions.resetData());
    }
  }, [isFocused]);

  return {
    scrollViewRef,
    isLoad,
    _onRefresh,
  };
};

export default useHome;
