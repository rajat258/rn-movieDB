import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Url} from '../../../constants';
import {movieDataActions} from '../../../redux';
import {getData} from '../../../services';
import {AppDispatch, MovieDataStateType} from '../../../type';

export interface DropDownHookReturnType {
  handleMovieDropDown: () => void;
  loadNowPlayingData: () => Promise<void>;
  loadTopRatedData: () => Promise<void>;
  loadUpcomingData: () => Promise<void>;
  movieDropDownVisible: boolean;
  nowPlaying: boolean;
  topRated: boolean;
  upcoming: boolean;
}

const useMovieDropDown = (): DropDownHookReturnType => {
  const dispatch = useDispatch<AppDispatch>();
  let list = {
    nowPlaying: true,
    topRated: false,
    upcoming: false,
  };
  const {
    list: {nowPlaying, topRated, upcoming},
  } = useSelector((state: MovieDataStateType) => state.movieData);
  const [movieDropDownVisible, setMovieDropDownVisible] =
    useState<boolean>(false);

  const handleMovieDropDown = (): void =>
    setMovieDropDownVisible(!movieDropDownVisible);

  const loadNowPlayingData = async (): Promise<void> => {
    dispatch(movieDataActions.changeShimmer());
    list = {
      nowPlaying: true,
      topRated: false,
      upcoming: false,
    };
    setTimeout(async () => {
      try {
        const data = await getData(Url.movieNowPlaying + 1);
        dispatch(movieDataActions.addData({data}));
        dispatch(movieDataActions.changeList({list}));
      } catch (error) {
        dispatch(movieDataActions.changeShimmer());
      }
    }, 2000);
  };

  const loadTopRatedData = async (): Promise<void> => {
    dispatch(movieDataActions.changeShimmer());
    list = {
      nowPlaying: false,
      topRated: true,
      upcoming: false,
    };
    setTimeout(async () => {
      try {
        const data = await getData(Url.movieTopRated + 1);
        dispatch(movieDataActions.addData({data}));
        dispatch(movieDataActions.changeList({list}));
      } catch (error) {
        dispatch(movieDataActions.changeShimmer());
      }
    }, 2000);
  };

  const loadUpcomingData = async (): Promise<void> => {
    dispatch(movieDataActions.changeShimmer());
    list = {
      nowPlaying: false,
      topRated: false,
      upcoming: true,
    };
    setTimeout(async () => {
      try {
        const data = await getData(Url.movieUpcoming + 1);
        dispatch(movieDataActions.addData({data}));
        dispatch(movieDataActions.changeList({list}));
      } catch (error) {
        dispatch(movieDataActions.changeShimmer());
      }
    }, 2000);
  };

  return {
    nowPlaying,
    topRated,
    upcoming,
    movieDropDownVisible,
    handleMovieDropDown,
    loadNowPlayingData,
    loadTopRatedData,
    loadUpcomingData,
  };
};

export default useMovieDropDown;
