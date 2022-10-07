// Pull in configureStore API
import { configureStore } from '@reduxjs/toolkit';

// Pull in the postsSlice reducer and rename it to postsReducer
import postsReducer from '../features/posts/postsSlice';


// Create the Redux store and pass in the postsReducer as the initial data
export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
})
