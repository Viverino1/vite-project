import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/auth'
import teamSlice from './reducers/team';
import publicSlice from './reducers/public';
import appSlice from './reducers/app';
import cardsSlice from './reducers/cards';

const store = configureStore({
  reducer: {
    [authSlice.name] : authSlice.reducer,
    [teamSlice.name] : teamSlice.reducer,
    [publicSlice.name] : publicSlice.reducer,
    [appSlice.name] : appSlice.reducer,
    [cardsSlice.name] : cardsSlice.reducer,
  },
})

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch