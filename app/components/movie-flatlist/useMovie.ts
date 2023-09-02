import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Url} from '../../constants';
import {popularDataActions} from '../../redux';
import {getData} from '../../services';
import {AppDispatch, MovieType, PopularDataStateType} from '../../type';

interface HomeHookReturnType {
  popularResults: Array<Partial<MovieType>>;
  isLoad: boolean;
  popularShimmer: boolean;
  popularPage: number;
  popularTotal_pages: number;
  popularLoad: boolean;
  loadMorePopularData: () => Promise<void>;
  _onRefresh: () => Promise<void>;
}

const useHome = (): HomeHookReturnType => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const {
    list: {rent: popularRent, streaming: popularStreaming},
    data: {
      page: popularPage,
      results: popularResults,
      total_pages: popularTotal_pages,
    },
    shimmer: popularShimmer,
    load: popularLoad,
  } = useSelector((state: PopularDataStateType) => state.popularData);

  /**
   * Initial Function used for initializing data.
   * @returns {Promise<void>}
   **/
  const initData = async (): Promise<void> => {
    dispatch(popularDataActions.resetData());
    dispatch(popularDataActions.changeShimmer());
    setTimeout(async () => {
      try {
        const data = await getData(Url.popularStreaming + 1);
        dispatch(popularDataActions.addData({data}));
      } catch (error) {
        setIsLoad(false);
        dispatch(popularDataActions.resetShimmer());
      }
    }, 2000);
  };
  /**
   * Function to load More Data at the end of FlatList.
   * @returns {Promise<void>}
   **/
  const loadMorePopularData = async (): Promise<void> => {
    if (popularPage <= popularTotal_pages && popularResults.length !== 0) {
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

  return {
    popularShimmer,
    popularPage,
    popularTotal_pages,
    popularLoad,
    isLoad,
    popularResults,
    loadMorePopularData,
    _onRefresh,
  };
};

export default useHome;
