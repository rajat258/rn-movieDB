import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Strings, Url} from '../../../constants';
import {trendingDataActions} from '../../../redux';
import {getData} from '../../../services';
import type {
  ApiDataType,
  AppDispatch,
  MovieType,
  TrendingDataStateType,
} from '../../../type';

export interface TrendingHookReturnType {
  trendingData: Array<Partial<MovieType>>;
  trendingShimmer: boolean;
  trendingPage: number;
  trendingTotal_pages: number;
  loadMoreTrendingData: () => Promise<void>;
}

const useTrendingData = (): TrendingHookReturnType => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    shimmer: trendingShimmer,
    list: {today},
    data: {
      page: trendingPage,
      results: trendingData,
      total_pages: trendingTotal_pages,
    },
  } = useSelector((state: TrendingDataStateType) => state.trendingData);

  /**
   * Function to load More Trending Data at the end of FlatList.
   * @returns {Promise<void>}
   **/
  const loadMoreTrendingData = async (): Promise<void> => {
    if (trendingPage <= trendingTotal_pages && trendingData.length !== 0) {
      setTimeout(async () => {
        const url = today ? Url.trendingToday : Url.trendingWeek;
        try {
          dispatch(trendingDataActions.changeLoad());
          const data: ApiDataType = await getData(url + (trendingPage + 1));
          dispatch(trendingDataActions.appendData({data: data?.results}));
        } catch (error) {
          Alert.alert(Strings.error, Strings.couldNotLoad);
          dispatch(trendingDataActions.changeLoad());
        }
      }, 2000);
    }
  };

  return {
    trendingData,
    trendingShimmer,
    trendingPage,
    trendingTotal_pages,
    loadMoreTrendingData,
  };
};

export default useTrendingData;
