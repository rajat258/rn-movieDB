import {useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Url} from '../../constants';
import {
  movieDataActions,
  popularDataActions,
  searchDataActions,
  trailerDataActions,
  trendingDataActions,
} from '../../redux';
import {
  AppDispatch,
  MovieDataStateType,
  MovieType,
  PopularDataStateType,
  TrailerDataStateType,
  TrendingDataStateType,
} from '../../type';
import {getData} from '../../services';

export interface HomeHookReturnType {
  popularData: Array<Partial<MovieType>>;
  isLoad: boolean;
  popularShimmer: boolean;
  popularPage: number;
  popularTotal_pages: number;
  popularLoad: boolean;
  loadMorePopularData: () => Promise<void>;
  movieData: Array<Partial<MovieType>>;
  movieShimmer: boolean;
  moviePage: number;
  movieTotal_pages: number;
  movieLoad: boolean;
  loadMoreMovieData: () => Promise<void>;
  trendingData: Array<Partial<MovieType>>;
  trendingShimmer: boolean;
  trendingPage: number;
  trendingTotal_pages: number;
  trendingLoad: boolean;
  loadMoreTrendingData: () => Promise<void>;
  trailerData: Array<Partial<MovieType>>;
  trailerShimmer: boolean;
  trailerPage: number;
  trailerTotal_pages: number;
  trailerLoad: boolean;
  loadMoreTrailerData: () => Promise<void>;
  _onRefresh: () => Promise<void>;
}

const useHome = (): HomeHookReturnType => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const {
    list: {rent: popularRent, streaming: popularStreaming},
    data: {
      page: popularPage,
      results: popularData,
      total_pages: popularTotal_pages,
    },
    shimmer: popularShimmer,
    load: popularLoad,
  } = useSelector((state: PopularDataStateType) => state.popularData);
  const {
    shimmer: movieShimmer,
    load: movieLoad,
    list: {nowPlaying, topRated},
    data: {page: moviePage, results: movieData, total_pages: movieTotal_pages},
  } = useSelector((state: MovieDataStateType) => state.movieData);
  const {
    shimmer: trendingShimmer,
    load: trendingLoad,
    list: {today},
    data: {
      page: trendingPage,
      results: trendingData,
      total_pages: trendingTotal_pages,
    },
  } = useSelector((state: TrendingDataStateType) => state.trendingData);
  const {
    shimmer: trailerShimmer,
    load: trailerLoad,
    list: {streaming: trailerStreaming},
    data: {
      page: trailerPage,
      results: trailerData,
      total_pages: trailerTotal_pages,
    },
  } = useSelector((state: TrailerDataStateType) => state.trailerData);

  /**
   * Initial Function used for initializing data.
   * @returns {Promise<void>}
   **/
  const initData = async (): Promise<void> => {
    dispatch(popularDataActions.resetData());
    dispatch(popularDataActions.changeShimmer());
    dispatch(movieDataActions.resetData());
    dispatch(movieDataActions.changeShimmer());
    dispatch(trendingDataActions.resetData());
    dispatch(trendingDataActions.changeShimmer());
    dispatch(trailerDataActions.resetData());
    dispatch(trailerDataActions.changeShimmer());
    setTimeout(async () => {
      try {
        const popularTempData = await getData(Url.popularStreaming + 1);
        dispatch(popularDataActions.addData({data: popularTempData}));
        const movieTempData = await getData(Url.movieNowPlaying + 1);
        dispatch(movieDataActions.addData({data: movieTempData}));
        const trendingTempData = await getData(Url.trendingToday + 1);
        dispatch(trendingDataActions.addData({data: trendingTempData}));
        const trailerTempData = await getData(Url.popularStreaming + 1);
        dispatch(trailerDataActions.addData({data: trailerTempData}));
      } catch (error) {
        setIsLoad(false);
        dispatch(popularDataActions.changeShimmer());
        dispatch(movieDataActions.changeShimmer());
        dispatch(trendingDataActions.changeShimmer());
      }
    }, 2000);
  };

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
          const data = await getData(url + (popularPage + 1));
          dispatch(popularDataActions.appendData({data: data?.results}));
        } catch (error) {
          dispatch(popularDataActions.changeLoad());
        }
      }, 2000);
    }
  };

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
          const data = await getData(url + (moviePage + 1));
          dispatch(movieDataActions.appendData({data: data?.results}));
        } catch (error) {
          dispatch(movieDataActions.changeLoad());
        }
      }, 2000);
    }
  };

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
          const data = await getData(url + (trendingPage + 1));
          dispatch(trendingDataActions.appendData({data: data?.results}));
        } catch (error) {
          dispatch(trendingDataActions.changeLoad());
        }
      }, 2000);
    }
  };

  /**
   * Function to load More Trending Data at the end of FlatList.
   * @returns {Promise<void>}
   **/
  const loadMoreTrailerData = async (): Promise<void> => {
    if (trailerPage <= trailerTotal_pages && trailerData.length !== 0) {
      const url = trailerStreaming ? Url.popularStreaming : Url.movieTopRated;
      try {
        dispatch(trailerDataActions.changeLoad());
        const data = await getData(url + (trailerPage + 1));
        dispatch(trailerDataActions.appendData({data: data?.results}));
      } catch (error) {
        dispatch(trailerDataActions.changeLoad());
      }
    }
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
    trailerData,
    trailerShimmer,
    trailerPage,
    trailerTotal_pages,
    trailerLoad,
    loadMoreTrailerData,
    trendingData,
    trendingShimmer,
    trendingPage,
    trendingTotal_pages,
    trendingLoad,
    loadMoreTrendingData,
    popularShimmer,
    popularPage,
    popularTotal_pages,
    popularLoad,
    isLoad,
    popularData,
    loadMorePopularData,
    _onRefresh,
    movieData,
    movieShimmer,
    moviePage,
    movieTotal_pages,
    movieLoad,
    loadMoreMovieData,
  };
};

export default useHome;
