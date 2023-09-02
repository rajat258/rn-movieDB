import {useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Strings, Url} from '../../../constants';
import {trailerDataActions} from '../../../redux';
import {getData} from '../../../services';
import {AppDispatch, TrailerDataStateType} from '../../../type';
import {TrailerProps} from './TrailerDropDown';

export interface TrailerHookReturnType {
  handleTrailerDropDown: () => void;
  loadTrailerData: ({streaming, topRated}: TrailerDataProps) => Promise<void>;
  trailerDropDown: boolean;
  streaming: boolean;
  topRated: boolean;
}

interface TrailerDataProps {
  streaming?: boolean;
  topRated?: boolean;
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

  const loadTrailerData = async ({
    streaming: s = false,
    topRated: t = false,
  }: TrailerDataProps): Promise<void> => {
    handleBackgroundImage('');
    dispatch(trailerDataActions.changeShimmer());
    list = {
      streaming: s,
      topRated: t,
    };
    let url: string;
    if (s) {
      url = Url.popularStreaming;
    } else {
      url = Url.movieTopRated;
    }
    setTimeout(async () => {
      try {
        const data = await getData(url + 1);
        dispatch(trailerDataActions.addData({data}));
        dispatch(trailerDataActions.changeList({list}));
      } catch (error) {
        Alert.alert(Strings.error, Strings.couldNotLoad);
        dispatch(trailerDataActions.resetShimmer());
      }
    }, 2000);
  };

  return {
    streaming,
    topRated,
    trailerDropDown,
    handleTrailerDropDown,
    loadTrailerData,
  };
};

export default useTrailerDropDown;
