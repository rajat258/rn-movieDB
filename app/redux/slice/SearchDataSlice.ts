import {createSlice} from '@reduxjs/toolkit';
import {MovieType} from '../../type';

interface InitialStateType {
  load: boolean;
  shimmer: boolean;
  data: {
    page: number;
    results: Array<Partial<MovieType>>;
    total_pages: number;
    total_results: number;
  };
}

const initialState: InitialStateType = {
  load: false,
  shimmer: false,
  data: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
};

const searchDataSlice = createSlice({
  name: 'searchData',
  initialState: initialState,
  reducers: {
    addData: (state, action) => {
      state.data = action.payload.data;
      state.load = false;
      state.shimmer = false;
    },
    resetData: state => {
      state = initialState;
      return {...state};
    },
    updatePage: state => {
      state.data.page += 1;
    },
    changeLoad: state => {
      state.load = !state.load;
    },
    changeShimmer: state => {
      state.shimmer = !state.shimmer;
    },
    resetShimmer: state => {
      state.shimmer = false;
    },
    appendData: (state, action) => {
      const appendedData = [...state.data.results, ...action.payload.data];
      state.data.results = appendedData;
      state.data.page += 1;
      state.load = false;
      state.shimmer = false;
    },
  },
});

export const searchDataReducer = searchDataSlice.reducer;
export const searchDataActions = searchDataSlice.actions;
