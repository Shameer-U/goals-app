import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import singleGoalReducer from '../features/singleGoal/singleGoalSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     goals: goalReducer,
//     singleGoal: singleGoalReducer
//   },
// });

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const reducer = combineReducers({
  auth: authReducer,
  goals: goalReducer,
  singleGoal: singleGoalReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);
