import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../slices/postsSlice';
import thunk from 'redux-thunk'; 

const store = configureStore({
    reducer: {
        posts: postsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),

});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
