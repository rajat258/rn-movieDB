import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Url} from '../../constants';
import {searchDataActions} from '../../redux';
import {getData} from '../../services';
import type {
  AppDispatch,
  MovieType,
  SearchDataStateType,
  SearchType,
} from '../../type';

export interface SearchHookReturnType {
  search: string;
  handleSearch: (val: string) => void;
  handleQuery: () => void;
  shimmer: boolean;
  data: Array<Partial<MovieType>>;
  loadMoreData: () => Promise<void>;
  page: number;
  total_pages: number;
}

const useSearch = (): SearchHookReturnType => {
  const [search, setSearch] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const {
    shimmer,
    data: {results: data, page, total_pages},
  } = useSelector((state: SearchDataStateType) => state.searchData);

  const handleSearch = (val: string): void => setSearch(val.trim());

  const handleQuery = async (): Promise<void> => {
    dispatch(searchDataActions.resetData());
    dispatch(searchDataActions.changeShimmer());
    try {
      const tempData: SearchType = await getData(
        Url.search + search + Url.page + 1,
      );
      const filteredData = tempData.results.filter(
        e => e.media_type === Url.movieString || e.media_type === Url.tvString,
      );
      tempData.results = [...filteredData];
      dispatch(searchDataActions.addData({data: tempData}));
    } catch (error) {
      dispatch(searchDataActions.changeShimmer());
    }
  };

  const loadMoreData = async (): Promise<void> => {
    if (page < total_pages && data.length !== 0) {
      setTimeout(async () => {
        try {
          const tempData: SearchType = await getData(
            Url.search + search + Url.page + (page + 1),
          );
          const filteredData = tempData.results.filter(
            e =>
              e.media_type === Url.movieString || e.media_type === Url.tvString,
          );
          dispatch(searchDataActions.appendData({data: filteredData}));
        } catch (error) {
          dispatch(searchDataActions.resetData());
        }
      }, 2000);
    }
  };

  return {
    loadMoreData,
    page,
    total_pages,
    shimmer,
    data,
    search,
    handleSearch,
    handleQuery,
  };
};

export default useSearch;
