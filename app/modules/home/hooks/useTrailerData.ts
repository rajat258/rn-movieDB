import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Strings, Url} from '../../../constants';
import {trailerDataActions} from '../../../redux';
import {getData} from '../../../services';
import type {
  ApiDataType,
  AppDispatch,
  MovieType,
  TrailerDataStateType,
} from '../../../type';

export interface TrailerHookReturnType {
  trailerData: Array<Partial<MovieType>>;
  trailerShimmer: boolean;
  trailerPage: number;
  trailerTotal_pages: number;
  loadMoreTrailerData: () => Promise<void>;
}

const useTrailerData = (): TrailerHookReturnType => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    shimmer: trailerShimmer,
    list: {streaming: trailerStreaming},
    data: {
      page: trailerPage,
      results: trailerData,
      total_pages: trailerTotal_pages,
    },
  } = useSelector((state: TrailerDataStateType) => state.trailerData);

  /**
   * Function to load More Trending Data at the end of FlatList.
   * @returns {Promise<void>}
   **/
  const loadMoreTrailerData = async (): Promise<void> => {
    if (trailerPage <= trailerTotal_pages && trailerData.length !== 0) {
      const url = trailerStreaming ? Url.popularStreaming : Url.movieTopRated;
      try {
        dispatch(trailerDataActions.changeLoad());
        const data: ApiDataType = await getData(url + (trailerPage + 1));
        dispatch(trailerDataActions.appendData({data: data?.results}));
      } catch (error) {
        Alert.alert(Strings.error, Strings.couldNotLoad);
        dispatch(trailerDataActions.changeLoad());
      }
    }
  };

  return {
    trailerData,
    trailerShimmer,
    trailerPage,
    trailerTotal_pages,
    loadMoreTrailerData,
  };
};

export default useTrailerData;
