import {combineReducers} from 'redux';
import {
  movieDataReducer,
  popularDataReducer,
  searchDataReducer,
  trailerDataReducer,
  trendingDataReducer,
} from '../slice';

const rootReducer = combineReducers({
  popularData: popularDataReducer,
  movieData: movieDataReducer,
  trendingData: trendingDataReducer,
  trailerData: trailerDataReducer,
  searchData: searchDataReducer,
});

export {rootReducer};
