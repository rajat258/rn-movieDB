import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Strings, Url} from '../../../constants';
import {movieDataActions} from '../../../redux';
import {getData} from '../../../services';
import type {
  ApiDataType,
  AppDispatch,
  MovieDataStateType,
  MovieType,
} from '../../../type';

export interface MovieHookReturnType {
  movieData: Array<Partial<MovieType>>;
  movieShimmer: boolean;
  moviePage: number;
  movieTotal_pages: number;
  loadMoreMovieData: () => Promise<void>;
}

const useMovieData = (): MovieHookReturnType => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    shimmer: movieShimmer,
    list: {nowPlaying, topRated},
    data: {page: moviePage, results: movieData, total_pages: movieTotal_pages},
  } = useSelector((state: MovieDataStateType) => state.movieData);

  /**
   * Function to load More New Movie Data at the end of FlatList.
   * @returns {Promise<void>}
   **/
  const loadMoreMovieData = async (): Promise<void> => {
    if (moviePage <= movieTotal_pages && movieData.length !== 0) {
      setTimeout(async () => {
        let url;
        try {
          if (nowPlaying) {
            url = Url.movieNowPlaying;
          } else if (topRated) {
            url = Url.movieTopRated;
          } else {
            url = Url.movieUpcoming;
          }
          dispatch(movieDataActions.changeLoad());
          const data: ApiDataType = await getData(url + (moviePage + 1));
          dispatch(movieDataActions.appendData({data: data?.results}));
        } catch (error) {
          dispatch(movieDataActions.changeLoad());
          Alert.alert(Strings.error, Strings.couldNotLoad);
        }
      }, 2000);
    }
  };
  return {
    movieData,
    movieShimmer,
    moviePage,
    movieTotal_pages,
    loadMoreMovieData,
  };
};

export default useMovieData;
