import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {rootReducer} from '../reducer';

const middlewares = getDefaultMiddleware({serializableCheck: false});

const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
});

export {store};
