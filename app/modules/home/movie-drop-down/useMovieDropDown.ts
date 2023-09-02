import {useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Strings, Url} from '../../../constants';
import {movieDataActions} from '../../../redux';
import {getData} from '../../../services';
import {AppDispatch, MovieDataStateType} from '../../../type';

export interface DropDownHookReturnType {
  handleMovieDropDown: () => void;
  loadMovieData: ({
    nowPlaying,
    topRated,
    upcoming,
  }: MovieDataProps) => Promise<void>;
  movieDropDownVisible: boolean;
  nowPlaying: boolean;
  topRated: boolean;
  upcoming: boolean;
}

interface MovieDataProps {
  nowPlaying?: boolean;
  topRated?: boolean;
  upcoming?: boolean;
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

  const loadMovieData = async ({
    nowPlaying: n = false,
    topRated: t = false,
    upcoming: u = false,
  }: MovieDataProps): Promise<void> => {
    dispatch(movieDataActions.changeShimmer());
    list = {
      nowPlaying: n,
      topRated: t,
      upcoming: u,
    };
    let url: string;
    if (n) {
      url = Url.movieNowPlaying;
    } else if (t) {
      url = Url.movieTopRated;
    } else {
      url = Url.movieUpcoming;
    }
    setTimeout(async () => {
      try {
        const data = await getData(url + 1);
        dispatch(movieDataActions.addData({data}));
        dispatch(movieDataActions.changeList({list}));
      } catch (error) {
        Alert.alert(Strings.error, Strings.couldNotLoad);
        dispatch(movieDataActions.resetShimmer());
      }
    }, 2000);
  };

  return {
    loadMovieData,
    nowPlaying,
    topRated,
    upcoming,
    movieDropDownVisible,
    handleMovieDropDown,
  };
};

export default useMovieDropDown;
