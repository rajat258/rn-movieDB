import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Strings, Url} from '../../../constants';
import {popularDataActions} from '../../../redux';
import {getData} from '../../../services';
import type {
  ApiDataType,
  AppDispatch,
  MovieType,
  PopularDataStateType,
} from '../../../type';

export interface PopularHookReturnType {
  popularData: Array<Partial<MovieType>>;
  popularShimmer: boolean;
  popularPage: number;
  popularTotal_pages: number;
  loadMorePopularData: () => Promise<void>;
}

const usePopularData = (): PopularHookReturnType => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    list: {rent: popularRent, streaming: popularStreaming},
    data: {
      page: popularPage,
      results: popularData,
      total_pages: popularTotal_pages,
    },
    shimmer: popularShimmer,
  } = useSelector((state: PopularDataStateType) => state.popularData);

  /**
   * Function to load More Popular Data at the end of FlatList.
   * @returns {Promise<void>}
   **/
  const loadMorePopularData = async (): Promise<void> => {
    if (popularPage <= popularTotal_pages && popularData.length !== 0) {
      setTimeout(async () => {
        let url;
        try {
          if (popularStreaming) {
            url = Url.popularStreaming;
          } else if (popularRent) {
            url = Url.popularRent;
          } else {
            url = Url.popularTv;
          }
          dispatch(popularDataActions.changeLoad());
          const data: ApiDataType = await getData(url + (popularPage + 1));
          dispatch(popularDataActions.appendData({data: data?.results}));
        } catch (error) {
          Alert.alert(Strings.error, Strings.couldNotLoad);
          dispatch(popularDataActions.changeLoad());
        }
      }, 2000);
    }
  };

  return {
    popularData,
    popularShimmer,
    popularPage,
    popularTotal_pages,
    loadMorePopularData,
  };
};

export default usePopularData;
