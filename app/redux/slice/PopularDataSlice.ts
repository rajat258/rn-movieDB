import {createSlice} from '@reduxjs/toolkit';
import {MovieType} from '../../type';

interface InitialStateType {
  load: boolean;
  list: {
    streaming: boolean;
    tv: boolean;
    rent: boolean;
  };
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
  list: {
    streaming: true,
    tv: false,
    rent: false,
  },
  shimmer: false,
  data: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
};

const popularDataSlice = createSlice({
  name: 'popularData',
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
    changeList: (state, action) => {
      state.list = action.payload.list;
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

export const popularDataReducer = popularDataSlice.reducer;
export const popularDataActions = popularDataSlice.actions;
