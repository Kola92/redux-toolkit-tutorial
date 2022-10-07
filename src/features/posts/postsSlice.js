import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
  postItems: [],
  status: 'idle',
  error: null,
}

// Get all the posts from the API
export const getPosts = createAsyncThunk('posts/getPosts', async (thunkAPI) => {
  try {
    const res = await axios.get(url)
    return res.data
  } catch (err) {
    // console.error(err.message)
    return thunkAPI.rejectWithValue({ error: err.message })
  }
})

// Handle POST request to create a new post
export const addPost = createAsyncThunk(
  // The name of the action
  'posts/addPost',
  // The payload creator
  async (initialPost, thunkAPI) => {
    try {
      const res = await axios.post(url, initialPost)
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

const postsSlice = createSlice({
  /* The name of the slice[this will also be used as the action type string 
    in combination with the extraReducer name i.e posts/getPosts or posts/addPost] 
  */
  name: 'posts',
  // initialState: initialState[ES6 destructuring syntax]
  initialState,
  // Add reducers for the synchronous actions on the UI
  reducers: {},
  // Add extra reducers for the asynchronous actions on the UI
  extraReducers: { 
    [getPosts.pending]: (state, action) => {
      // When data is being fetched
      state.status = 'loading'
    },
    [getPosts.fulfilled]: (state, action) => {
      // When data is fetched successfully
      state.status = 'successful'

      // Concat the new data to the existing data in the array
      state.postItems = state.postItems.concat(action.payload)
    },
    [getPosts.rejected]: (state, action) => {
      // When data is fetched unsuccessfully
      state.status = 'failed'

      // Update the error message for proper error handling
      state.error = action.error.message

      console.error(state.error)
    },
    [addPost.fulfilled]: (state, action) => {
      // Add the new post created on the UI to the existing posts
      state.postItems.push(action.payload)
    },
  },
})


// Export the reducer logic from the slice
export default postsSlice.reducer