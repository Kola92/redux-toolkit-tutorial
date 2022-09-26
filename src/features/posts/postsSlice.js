import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
  postItems: [],
  status: 'idle',
  error: null,
}

export const getPosts = createAsyncThunk('posts/getPosts', async (thunkAPI) => {
  try {
    const res = await axios.get(url)
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue({ error: err.message })
  }
})

export const addPost = createAsyncThunk(
  'posts/addPost',
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
      state.error = action.error
    },
    [addPost.fulfilled]: (state, action) => {
      state.postItems.push(action.payload)
    },
  },
})

export const { removePost } = postsSlice.actions

export default postsSlice.reducer
