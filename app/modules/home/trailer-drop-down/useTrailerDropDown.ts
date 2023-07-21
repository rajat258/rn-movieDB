import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Url} from '../../../constants';
import {trailerDataActions} from '../../../redux';
import {getData} from '../../../services';
import {AppDispatch, TrailerDataStateType} from '../../../type';
import {TrailerProps} from './TrailerDropDown';

export interface TrailerHookReturnType {
  handleTrailerDropDown: () => void;
  loadStreamingData: () => Promise<void>;
  loadTopRatedData: () => Promise<void>;
  trailerDropDown: boolean;
  streaming: boolean;
  topRated: boolean;
}

const useTrailerDropDown = ({
  handleBackgroundImage,
}: TrailerProps): TrailerHookReturnType => {
  const dispatch = useDispatch<AppDispatch>();
  let list = {
    streaming: true,
    topRated: false,
  };
  const {
    list: {streaming, topRated},
  } = useSelector((state: TrailerDataStateType) => state.trailerData);
  const [trailerDropDown, setTrailerDropDown] = useState<boolean>(false);

  const handleTrailerDropDown = (): void =>
    setTrailerDropDown(!trailerDropDown);

  const loadStreamingData = async (): Promise<void> => {
    handleBackgroundImage('');
    dispatch(trailerDataActions.changeShimmer());
    list = {
      streaming: true,
      topRated: false,
    };
    setTimeout(async () => {
      try {
        const data = await getData(Url.popularStreaming + 1);
        dispatch(trailerDataActions.addData({data}));
        dispatch(trailerDataActions.changeList({list}));
      } catch (error) {
        dispatch(trailerDataActions.changeShimmer());
      }
    }, 2000);
  };

  const loadTopRatedData = async (): Promise<void> => {
    handleBackgroundImage('');
    dispatch(trailerDataActions.changeShimmer());
    list = {
      streaming: false,
      topRated: true,
    };
    setTimeout(async () => {
      try {
        const data = await getData(Url.movieTopRated + 1);
        dispatch(trailerDataActions.addData({data}));
        dispatch(trailerDataActions.changeList({list}));
      } catch (error) {
        dispatch(trailerDataActions.changeShimmer());
      }
    }, 2000);
  };

  return {
    streaming,
    topRated,
    trailerDropDown,
    handleTrailerDropDown,
    loadStreamingData,
    loadTopRatedData,
  };
};

export default useTrailerDropDown;
