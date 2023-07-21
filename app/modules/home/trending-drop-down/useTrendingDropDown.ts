import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Url} from '../../../constants';
import {trendingDataActions} from '../../../redux';
import {getData} from '../../../services';
import {TrendingDataStateType} from '../../../type';

export interface DropDownHookReturnType {
  handleTrendingDropDown: () => void;
  loadTodayData: () => Promise<void>;
  loadWeekData: () => Promise<void>;
  trendingDropDownVisible: boolean;
  today: boolean;
  week: boolean;
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

  const loadTodayData = async (): Promise<void> => {
    dispatch(trendingDataActions.changeShimmer());
    list = {
      today: true,
      week: false,
    };
    setTimeout(async () => {
      try {
        const data = await getData(Url.trendingToday + 1);
        dispatch(trendingDataActions.addData({data}));
        dispatch(trendingDataActions.changeList({list}));
      } catch (error) {
        dispatch(trendingDataActions.changeShimmer());
      }
    }, 2000);
  };

  const loadWeekData = async (): Promise<void> => {
    dispatch(trendingDataActions.changeShimmer());
    list = {
      today: false,
      week: true,
    };
    setTimeout(async () => {
      try {
        const data = await getData(Url.trendingWeek + 1);
        dispatch(trendingDataActions.addData({data}));
        dispatch(trendingDataActions.changeList({list}));
      } catch (error) {
        dispatch(trendingDataActions.changeShimmer());
      }
    }, 2000);
  };

  return {
    today,
    week,
    trendingDropDownVisible,
    handleTrendingDropDown,
    loadTodayData,
    loadWeekData,
  };
};

export default useTrendingDropDown;
