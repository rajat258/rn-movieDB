import {useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Strings, Url} from '../../../constants';
import {trendingDataActions} from '../../../redux';
import {getData} from '../../../services';
import {TrendingDataStateType} from '../../../type';

export interface DropDownHookReturnType {
  handleTrendingDropDown: () => void;
  loadTrendingData: ({today, week}: TrendingDataProps) => Promise<void>;
  trendingDropDownVisible: boolean;
  today: boolean;
  week: boolean;
}

interface TrendingDataProps {
  today?: boolean;
  week?: boolean;
}

const useTrendingDropDown = (): DropDownHookReturnType => {
  const dispatch = useDispatch();
  let list = {
    today: true,
    week: false,
  };
  const {
    list: {today, week},
  } = useSelector((state: TrendingDataStateType) => state.trendingData);
  const [trendingDropDownVisible, setTrendingDropDownVisible] =
    useState<boolean>(false);

  const handleTrendingDropDown = (): void =>
    setTrendingDropDownVisible(!trendingDropDownVisible);

  const loadTrendingData = async ({
    today: t = false,
    week: w = false,
  }: TrendingDataProps): Promise<void> => {
    dispatch(trendingDataActions.changeShimmer());
    list = {
      today: t,
      week: w,
    };
    const url: string = t ? Url.trendingToday : Url.trendingWeek;
    setTimeout(async () => {
      try {
        const data = await getData(url + 1);
        dispatch(trendingDataActions.addData({data}));
        dispatch(trendingDataActions.changeList({list}));
      } catch (error) {
        Alert.alert(Strings.error, Strings.couldNotLoad);
        dispatch(trendingDataActions.resetShimmer());
      }
    }, 2000);
  };

  return {
    today,
    week,
    trendingDropDownVisible,
    handleTrendingDropDown,
    loadTrendingData,
  };
};

export default useTrendingDropDown;
